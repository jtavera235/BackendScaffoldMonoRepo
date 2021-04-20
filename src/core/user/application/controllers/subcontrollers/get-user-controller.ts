import AbstractController from "../../../../../common/abstract-controller";
import { GetUserResponseInterface } from "../responses/get-user-response-interface";
import { GetUserSuccessEvent } from "../../../domain/events/get-user-success-event";
import { GetUserEventEnums } from "../../../domain/events/get-user-event-enums";
import GetUserSuccessResponse from "../responses/get-user-success-response";
import { StatusCodeEnum } from "../../../../../common/enums/status-code-enums";
import { GetUserFailedEvent } from "../../../domain/events/get-user-failed-event";
import GetUserFailedResponse from "../responses/get-user-failed-response";
import GetUserCommand from "../../../domain/command/get-user-command";
import { CustomEvent } from "../../../../../common/CustomEvent";
import {JsonController, Get, Res, UseBefore} from "routing-controllers";
import {Inject, Service} from "typedi";
import {Middleware} from "../../../../../common/middleware/auth/middleware";


@JsonController()
@Service()
class GetUserController extends AbstractController {

  public response!: GetUserResponseInterface

  constructor(
      @Inject('event.emitter') private readonly eventSubscriber: CustomEvent,
      @Inject('get.users.command') private readonly command: GetUserCommand
  ) {
    super();
  }

  @UseBefore(Middleware)
  @Get("/")
  private async get(@Res() res: any): Promise<void> {


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