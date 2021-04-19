import AbstractController from "../../../../../common/abstract-controller";
import { GetUserResponseInterface } from "../responses/get-user-response-interface";
import GetUserRequest from "../requests/get-user-request";
import { GetUserSuccessEvent } from "../../../domain/events/get-user-success-event";
import { GetUserEventEnums } from "../../../domain/events/get-user-event-enums";
import GetUserSuccessResponse from "../responses/get-user-success-response";
import { StatusCodeEnum } from "../../../../../common/enums/status-code-enums";
import { GetUserFailedEvent } from "../../../domain/events/get-user-failed-event";
import GetUserFailedResponse from "../responses/get-user-failed-response";
import GetUserCommand from "../../../domain/command/get-user-command";
import EventEmitter from "events";

class GetUserController extends AbstractController {

  private response!: GetUserResponseInterface;

  public constructor(private readonly command: GetUserCommand,
    private readonly eventSubscriber: EventEmitter) {
    super();
    this.routes();
  }

  private routes(): void {
    this.getUserById();
  }

  private getUserById(): void {
    this.express.get('/', async (req, res) => {
      const id = res.locals.data.userId;
      const request = new GetUserRequest(req.body.requestId, id);

      this.eventSubscriber.on(GetUserEventEnums.SUCCESS, this.userRetrievedSuccessful.bind(this));
      this.eventSubscriber.on(GetUserEventEnums.FAILED, this.userRetrievedFailed.bind(this));

      await this.command.execute(request);

      return res
      .status(this.response.getStatus())
      .json(this.response);
    });
  }

  private userRetrievedSuccessful(event: GetUserSuccessEvent): void {
    this.response = new GetUserSuccessResponse("Success", event.getUser(), StatusCodeEnum.OK);
  }

  private userRetrievedFailed(event: GetUserFailedEvent): void {
    this.response = new GetUserFailedResponse(event.getReason(), StatusCodeEnum.BAD_REQUEST);
  }

}

export default GetUserController;