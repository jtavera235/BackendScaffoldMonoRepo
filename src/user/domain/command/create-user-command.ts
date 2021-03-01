import CreateUserRequest from "../../application/controllers/requests/create-user-request";
import UserBuilder from '../user-builder';
import User from '../../../dto/user/user';
import EventEmitter from "events";
import { UserCreatedSuccessEvent } from "../events/user-created-success-event";
import { UserCreatedFailedEvent } from "../events/user-created-failed-event";
import { UserCreatedEventEnums } from "../events/user-created-events-enums";
import { Log } from "../../../common/logger/logger";
import AuthenticationService from "../../../common/middleware/auth/authentication-service";
import { UserRepositoryInterface } from "../../../persist/mongodb/user/user-repository-interface";

class CreateUserCommand {

    private user!: User;
    private logger: Log;

    constructor(
      private readonly events: EventEmitter,
       private readonly userRepository: UserRepositoryInterface,
       private readonly authService: AuthenticationService) {
      this.logger = new Log();
    }

    public async execute(request: CreateUserRequest): Promise<boolean> {
      const builder = new UserBuilder();
      builder.withEmail(request.getEmail());
      const name = this.authService.hash(request.getName());
      builder.withName(name);

      this.user = builder.build();
      this.user.generateUserUniqueId();
      
      return await this.userRepository.save(this.user).then(() => {
        return Promise.resolve(this.events.emit(UserCreatedEventEnums.SUCCESS, new UserCreatedSuccessEvent(this.user)));
      }).catch(err => {
        this.logger.logErrorFailures(err);
        return Promise.reject(this.events.emit(UserCreatedEventEnums.FAILED, new UserCreatedFailedEvent("Error occurred while creating a new user.")));
      })
    }
}

export default CreateUserCommand;