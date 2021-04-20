import AbstractController from "../../../../../common/abstract-controller";
import { GetUserResponseInterface } from "../responses/get-user-response-interface";
import { GetUserSuccessEvent } from "../../../domain/events/get-user-success-event";
import { GetUserEventEnums } from "../../../domain/events/get-user-event-enums";
import GetUserSuccessResponse from "../responses/get-user-success-response";
import { StatusCodeEnum } from "../../../../../common/enums/status-code-enums";
import { GetUserFailedEvent } from "../../../domain/events/get-user-failed-event";
import GetUserFailedResponse from "../responses/get-user-failed-response";
import GetUserCommand from "../../../domain/command/get-user-command";
import {Get, JsonController, Res, UseBefore} from "routing-controllers";
import Middleware from "../../../../../common/middleware/auth/middleware";
import {Inject, Service} from "typedi";
import { CustomEvent } from "../../../../../common/CustomEvent";

@JsonController()
@UseBefore(Middleware.verify)
@Service()
class GetUserController extends AbstractController {

  private response!: GetUserResponseInterface;

  public constructor(
      @Inject('get.users.command') private readonly command: GetUserCommand,
      @Inject('event.emitter') private readonly eventSubscriber: CustomEvent
  ) {
    super();
  }

  @Get("/")
  private async getUserById(@Res() res: any): Promise<void> {

    const id = res.locals.data.userId;

    this.eventSubscriber.on(GetUserEventEnums.SUCCESS, this.userRetrievedSuccessful.bind(this));
    this.eventSubscriber.on(GetUserEventEnums.FAILED, this.userRetrievedFailed.bind(this));

    await this.command.execute(id);

    return res
    .status(this.response.getStatus())
    .json(this.response);
  }

  private userRetrievedSuccessful(event: GetUserSuccessEvent): void {
    this.response = new GetUserSuccessResponse("Success", event.getUser(), StatusCodeEnum.OK);
  }

  private userRetrievedFailed(event: GetUserFailedEvent): void {
    this.response = new GetUserFailedResponse(event.getReason(), StatusCodeEnum.BAD_REQUEST);
  }

}

export default GetUserController;