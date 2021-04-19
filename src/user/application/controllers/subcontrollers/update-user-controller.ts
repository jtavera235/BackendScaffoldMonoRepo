import EventEmitter from "events";
import AbstractController from "../../../../common/abstract-controller";
import { APIActionsEnum } from "../../../../common/enums/api-actions-enums";
import { StatusCodeEnum } from "../../../../common/enums/status-code-enums";
import UpdateUserCommand from "../../../domain/command/update-user-command";
import { UpdateUserEventEnum } from "../../../domain/events/update-user-event-enum";
import { UpdateUserFailedEvent } from "../../../domain/events/update-user-failed-event";
import { UpdateUserSuccessEvent } from "../../../domain/events/update-user-success-event";
import UpdateUserRequest from "../requests/update-user-request";
import UpdateUserResponseFailed from "../responses/update-user-response-failed";
import { UpdateUserResponseInterface } from "../responses/update-user-response-interface";
import UpdateUserResponseSuccess from "../responses/update-user-response-success";

class UpdateUserController extends AbstractController {

  private response!: UpdateUserResponseInterface;

  public constructor(private readonly command: UpdateUserCommand,
    private readonly eventSubscriber: EventEmitter) {
    super();
    this.routes();
  }

  private routes(): void {
    this.updateUser();
  }

  private updateUser(): void {
    const apiAction = APIActionsEnum.PUT;
    const route = '/api/users/:userId';

    this.express.put('/', async (req, res) => {
      const id = res.locals.data.userId;
      const request = new UpdateUserRequest(req.body.requestId, req.body.user, id);
      this.logger.logApiRequests(request, apiAction, route);

      this.eventSubscriber.on(UpdateUserEventEnum.SUCCESS, this.updateUserSuccess.bind(this));
      this.eventSubscriber.on(UpdateUserEventEnum.FAILED, this.updateUserFailed.bind(this));

      try {
        await this.command.execute(request);
      }
      /* eslint-disable */
      catch (_) {}

      this.logger.logApiResponses(this.response, apiAction, route);
        
      return res
      .status(this.response.getStatus())
      .json(this.response);
    });

  }

  private updateUserSuccess(event: UpdateUserSuccessEvent): void {
    this.response = new UpdateUserResponseSuccess("Success", event.getUser(), StatusCodeEnum.OK);
  }

  private updateUserFailed(event: UpdateUserFailedEvent): void {
    this.response = new UpdateUserResponseFailed(event.getReason(), StatusCodeEnum.BAD_REQUEST);
  }
}

export default UpdateUserController;