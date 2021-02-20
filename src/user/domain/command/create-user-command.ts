import CreateUserRequest from "../../application/controllers/requests/create-user-request";
import UserBuilder from '../user-builder';
import User from '../../../dto/user/user';
import EventEmitter from "events";
import { UserCreatedSuccessEvent } from "../events/user-created-success-event";
import { UserCreatedFailedEvent } from "../events/user-created-failed-event";
import { UserEventEnums } from "../events/user-events-enums";
import UserRepository from "../../../persist/mongodb/user/user-repository";

class CreateUserCommand {

    private events: EventEmitter;
    private user!: User;
    private userRepository: UserRepository;

    constructor(event: EventEmitter) {
      this.events = event;
      this.userRepository = new UserRepository();
    }

    public async execute(request: CreateUserRequest): Promise<boolean> {
      let builder = new UserBuilder();
      builder.withEmail(request.getEmail());
      builder.withName(request.getName());
      builder.withID('1');

      this.user = builder.build();

      let returnPromise: Promise<boolean>;

      await this.userRepository.save(this.user).then(() => {
      }).catch( _ => {
        returnPromise = Promise.resolve(this.events.emit(UserEventEnums.FAILED, new UserCreatedFailedEvent("Error occurred while creating a new user.")));
      })

      return Promise.resolve(this.events.emit(UserEventEnums.SUCCESS, new UserCreatedSuccessEvent(this.user)));
    }
}

export default CreateUserCommand;