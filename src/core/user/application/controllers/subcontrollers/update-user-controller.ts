import AbstractController from "../../../../../common/abstract-controller";
import {StatusCodeEnum} from "../../../../../common/enums/status-code-enums";
import UpdateUserCommand from "../../../domain/command/update-user-command";
import {UpdateUserEventEnum} from "../../../domain/events/update-user-event-enum";
import {UpdateUserFailedEvent} from "../../../domain/events/update-user-failed-event";
import {UpdateUserSuccessEvent} from "../../../domain/events/update-user-success-event";
import UpdateUserRequest from "../requests/update-user-request";
import UpdateUserResponseFailed from "../responses/update-user-response-failed";
import {UpdateUserResponseInterface} from "../responses/update-user-response-interface";
import UpdateUserResponseSuccess from "../responses/update-user-response-success";
import {Body, JsonController, Put, Req, Res, UseBefore} from "routing-controllers";
import {Inject, Service} from "typedi";
import {CustomEvent} from "../../../../../common/CustomEvent";
import Middleware from "../../../../../common/middleware/middleware";

@JsonController()
@Service()
class UpdateUserController extends AbstractController {

  public response!: UpdateUserResponseInterface;

  constructor(
      @Inject('update.users.command') private readonly command: UpdateUserCommand,
      @Inject('event.emitter') private readonly eventSubscriber: CustomEvent) {
    super();
  }

  @UseBefore(Middleware)
  @Put("/")
  private async updateUser(@Body() request: UpdateUserRequest, @Req() req: any ,@Res() res: any): Promise<void> {

    request.userId = res.locals.data.userId;

    this.eventSubscriber.on(UpdateUserEventEnum.SUCCESS, this.updateUserSuccess.bind(this));
    this.eventSubscriber.on(UpdateUserEventEnum.FAILED, this.updateUserFailed.bind(this));

    await this.command.execute(request);

    return res
    .status(this.response.getStatus())
    .json(this.response);

  }

  private updateUserSuccess(event: UpdateUserSuccessEvent): void {
    this.response = new UpdateUserResponseSuccess("Success", event.getUser(), StatusCodeEnum.OK);
  }

  private updateUserFailed(event: UpdateUserFailedEvent): void {
    this.response = new UpdateUserResponseFailed(event.getReason(), StatusCodeEnum.BAD_REQUEST);
  }
}

export default UpdateUserController;