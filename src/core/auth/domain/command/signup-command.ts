import EventEmitter from "events";
import {UserRepositoryInterface} from "../../../../persist/mongodb/user/user-repository-interface";
import AuthenticationService from "../../../../common/middleware/auth/authentication-service";
import {Log} from "../../../../common/logger/logger";
import SignupRequest from "../../application/controllers/requests/signup-request";
import UserBuilder from "../../../user/domain/user-builder";
import User from "../../../../dto/user/user";
import {SignupEventFailed} from "../events/signup-event-failed";
import {SignupEventSuccess} from "../events/signup-event-success";
import {SignupEventsEnum} from "../events/signup-event-enum";

class SignupCommand {

  private logger: Log;
  private user!: User;

  constructor(
      private readonly events: EventEmitter,
      private readonly userRepository: UserRepositoryInterface,
      private readonly authService: AuthenticationService) {
    this.logger = new Log();
  }


  public async execute(request: SignupRequest): Promise<void> {
    const builder = new UserBuilder();
    builder.withEmail(request.email);
    const password = this.authService.hash(request.password);
    builder.withPassword(password);
    this.user = builder.build();
    this.user.generateUserUniqueId();

    const newUser = await this.userRepository.save(this.user);
    if (newUser === null) {
      this.events.emit(SignupEventsEnum.FAILED, new SignupEventFailed("Error occurred while creating a new user."));
    } else {
      this.events.emit(SignupEventsEnum.SUCCESS, new SignupEventSuccess(new User(newUser.email, newUser.password, newUser.uuid)));
    }
  }
}

export default SignupCommand;