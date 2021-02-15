import CreateUserRequest from "../../application/controllers/requests/create-user-request";
import UserBuilder from '../user-builder';
import User from '../../../dto/user';
import EventEmitter from "events";
import { UserCreatedSuccessEvent } from "../events/user-created-success-event";
import { UserCreatedFailedEvent } from "../events/user-created-failed-event";

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

      if (this.user.getName() !== "hell0") {
        this.events.emit('userCreatedFailed', new UserCreatedFailedEvent("Names do not match"));
      } else {
        this.events.emit('userCreatedSuccess', new UserCreatedSuccessEvent(this.user));
      }
    }
}

export default CreateUserCommand;