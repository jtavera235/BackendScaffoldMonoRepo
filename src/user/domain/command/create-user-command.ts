import CreateUserRequest from "../../application/controllers/requests/create-user-request";
import UserBuilder from '../user-builder';
import User from '../../../dto/user/user';
import EventEmitter from "events";

import { UserCreatedSuccessEvent } from "../events/user-created-success-event";
import { UserCreatedFailedEvent } from "../events/user-created-failed-event";
import { UserCreatedEventEnums } from "../events/user-created-events-enums";
import UserRepository from "../../../persist/mongodb/user/user-repository";
import { Log } from "../../../common/logger/logger";
import { UserAuthRolesEnum } from "../../../common/enums/user-auth-roles-enum";
import AuthenticationService from "../../../common/middleware/auth/authentication-service";

class CreateUserCommand {

    private events: EventEmitter;
    private user!: User;
    private userRepository: UserRepository;
    private logger: Log;
    private authService: AuthenticationService;

    constructor(event: EventEmitter) {
      this.events = event;
      this.userRepository = new UserRepository();
      this.logger = new Log();
      this.authService = new AuthenticationService();
    }

    public async execute(request: CreateUserRequest): Promise<boolean> {
      let builder = new UserBuilder();
      builder.withEmail(request.getEmail());
      const name = this.authService.hash(request.getName());
      builder.withName(name);

      this.user = builder.build();
      
      let returnPromise: Promise<boolean>;

      await this.userRepository.save(this.user).then(() => {
        returnPromise = Promise.resolve(this.events.emit(UserCreatedEventEnums.SUCCESS, new UserCreatedSuccessEvent(this.user)));
      }).catch(err => {
        this.logger.logErrorFailures(err);
        returnPromise = Promise.resolve(this.events.emit(UserCreatedEventEnums.FAILED, new UserCreatedFailedEvent("Error occurred while creating a new user.")));
      })
      return returnPromise!
    }
}

export default CreateUserCommand;