import AbstractController from "../../../../common/abstract-controller";
import CreateUserRequest from '../requests/create-user-request';
import CreateUserCommand from '../../../domain/command/create-user-command';
import EventEmitter from "events";
import { UserCreatedSuccessEvent } from "../../../domain/events/user-created-success-event";
import { UserCreatedResponseInterface } from "../responses/user-created-response-interface";
import UserCreatedSuccessResponse from "../responses/user-created-success-response";
import UserCreatedFailedResponse from "../responses/user-created-failed-response";
import { UserCreatedFailedEvent } from "../../../domain/events/user-created-failed-event";

class CreateUserController extends AbstractController {

    private createUserCommand: CreateUserCommand;
    private eventSubscriber: EventEmitter;
    private response!: UserCreatedResponseInterface;
    private status!: number;

    constructor() {
      super();
      this.eventSubscriber = new EventEmitter();
      this.createUserCommand = new CreateUserCommand(this.eventSubscriber);
      this.routes();
    }

    private routes(): void {
      this.createNewUser();
    }

    private createNewUser(): void {
      this.express.post('/', (req, res, _) => {
        this.logger.logApiRoute('/api/users/create', 'POST');
        const request = new CreateUserRequest(req.body.name, req.body.email);
        this.logger.logApiRequests(request);

        this.eventSubscriber.on('userCreatedSuccess', this.userCreatedSuccess.bind(this));
        this.eventSubscriber.on('userCreatedFailed', this.userCreatedFailed.bind(this));

        this.createUserCommand.execute(request);

        this.logger.logApiResponses(this.response);
        return res
        .status(this.status)
        .json(this.response);
      });
    }

    private userCreatedSuccess(event: UserCreatedSuccessEvent): void {
      this.response = new UserCreatedSuccessResponse("Success", event.getUser());
      this.status = 200;
    }

    private userCreatedFailed(event: UserCreatedFailedEvent): void {
      this.response = new UserCreatedFailedResponse(event.getReason());
      this.status = 400;
    }

}

export default new CreateUserController().express;