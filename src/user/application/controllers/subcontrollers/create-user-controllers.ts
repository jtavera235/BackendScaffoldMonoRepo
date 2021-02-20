import AbstractController from "../../../../common/abstract-controller";
import CreateUserRequest from '../requests/create-user-request';
import CreateUserCommand from '../../../domain/command/create-user-command';
import EventEmitter from "events";
import { UserCreatedSuccessEvent } from "../../../domain/events/user-created-success-event";
import { UserCreatedResponseInterface } from "../responses/user-created-response-interface";
import UserCreatedSuccessResponse from "../responses/user-created-success-response";
import UserCreatedFailedResponse from "../responses/user-created-failed-response";
import { UserCreatedFailedEvent } from "../../../domain/events/user-created-failed-event";
import { APIActionsEnum } from "../../../../common/enums/api-actions-enums";
import { StatusCodeEnum } from "../../../../common/enums/status-code-enums";
import { UserEventEnums } from "../../../domain/events/user-events-enums";

class CreateUserController extends AbstractController {

    private createUserCommand: CreateUserCommand;
    private eventSubscriber: EventEmitter;
    private response!: UserCreatedResponseInterface;

    constructor() {
      super();
      this.eventSubscriber = new EventEmitter();
      this.createUserCommand = new CreateUserCommand(this.eventSubscriber);
      this.routes();
    }

    private routes(): void {
      this.createNewUser();
    }

    private createNewUser() {
      const apiAction = APIActionsEnum.POST;
      const route = '/api/users/create';

      this.express.post('/', async (req, res, _) => {
        const request = new CreateUserRequest(req.body.name, req.body.email, req.body.requestId);
        this.logger.logApiRequests(request, apiAction, route);

        this.eventSubscriber.on(UserEventEnums.SUCCESS, this.userCreatedSuccess.bind(this));
        this.eventSubscriber.on(UserEventEnums.FAILED, this.userCreatedFailed.bind(this));

        await this.createUserCommand.execute(request).then();

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