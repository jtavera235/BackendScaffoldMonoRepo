import CreateUserRequest from "../../application/controllers/requests/create-user-request";
import UserBuilder from '../user-builder';
import User from '../../../dto/user';
import EventEmitter from "events";
import { UserCreatedEvent } from "../events/user-created-event";

class CreateUserCommand {

    private events: EventEmitter;
    private user!: User;

    constructor(event: EventEmitter) {
      this.events = event;
    }

    public execute(request: CreateUserRequest): void {
      let builder = new UserBuilder();
      builder.withEmail(request.getEmail());
      builder.withName(request.getName());
      builder.withID('ABC');

      this.user = builder.build();

      this.events.emit('userCreated', new UserCreatedEvent(this.user));
    }
}

export default CreateUserCommand;