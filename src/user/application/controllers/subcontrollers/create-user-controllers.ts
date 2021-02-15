import AbstractController from "../../../../common/abstract-controller";
import CreateUserRequest from '../requests/create-user-request';
import CreateUserCommand from '../../../domain/command/create-user-command';
import EventEmitter from "events";
import User from "../../../../dto/user";
import { UserCreatedEvent } from "../../../domain/events/user-created-event";

class CreateUserController extends AbstractController {

    private createUserCommand: CreateUserCommand;
    private eventSubscriber: EventEmitter;
    private response!: User;

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
        const request = new CreateUserRequest(req.body.name, req.body.email);


        this.eventSubscriber.on('userCreated', this.userCreatedSuccess.bind(this));

        this.createUserCommand.execute(request);

        return res.json(this.response);
      });
    }

    private userCreatedSuccess(event: UserCreatedEvent): void {
      this.response = event.getUser();
    }
}

export default new CreateUserController().express;