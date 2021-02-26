import AbstractController from "../../../../common/abstract-controller";
import CreateUserRequest from '../requests/create-user-request';
import CreateUserCommand from '../../../domain/command/create-user-command';
import { UserCreatedSuccessEvent } from "../../../domain/events/user-created-success-event";
import { UserCreatedResponseInterface } from "../responses/user-created-response-interface";
import UserCreatedSuccessResponse from "../responses/user-created-success-response";
import UserCreatedFailedResponse from "../responses/user-created-failed-response";
import { UserCreatedFailedEvent } from "../../../domain/events/user-created-failed-event";
import { APIActionsEnum } from "../../../../common/enums/api-actions-enums";
import { StatusCodeEnum } from "../../../../common/enums/status-code-enums";
import { UserCreatedEventEnums } from "../../../domain/events/user-created-events-enums";

class CreateUserController extends AbstractController {

    private createUserCommand: CreateUserCommand;
    private response!: UserCreatedResponseInterface;

    constructor() {
      super();
      this.createUserCommand = new CreateUserCommand(this.eventSubscriber);
      this.routes();
    }

    private routes(): void {
      this.createNewUser();
    }

    private createNewUser(): void {
      const apiAction = APIActionsEnum.POST;
      const route = '/api/users/';

      this.express.post('/', async (req, res, _) => {
        const request = new CreateUserRequest(req.body.name, req.body.email, req.body.requestId, req.body.role);
        this.logger.logApiRequests(request, apiAction, route);

        this.eventSubscriber.on(UserCreatedEventEnums.SUCCESS, this.userCreatedSuccess.bind(this));
        this.eventSubscriber.on(UserCreatedEventEnums.FAILED, this.userCreatedFailed.bind(this));

        await this.createUserCommand.execute(request);

        this.logger.logApiResponses(this.response, apiAction, route);
        
        return res
        .status(this.response.getStatus())
        .json(this.response);
      });
    }

    private userCreatedSuccess(event: UserCreatedSuccessEvent): void {
      this.response = new UserCreatedSuccessResponse("Success", event.getUser(), StatusCodeEnum.OK);
    }

    private userCreatedFailed(event: UserCreatedFailedEvent): void {
      this.response = new UserCreatedFailedResponse(event.getReason(), StatusCodeEnum.BAD_REQUEST);
    }

}

export default new CreateUserController().express;