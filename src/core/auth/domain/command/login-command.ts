import LoginRequest from "../../application/controllers/requests/login-request";
import {UserRepositoryInterface} from "../../../../persist/mongodb/user/user-repository-interface";
import AuthenticationService from "../../../../common/middleware/auth/authentication-service";
import {Log} from "../../../../common/logger/logger";
import {LoginEventsEnum} from "../events/login-events-enum";
import {LoginEventFailed} from "../events/login-event-failed";
import {LoginEventSuccess} from "../events/login-event-success";
import {Inject, Service} from "typedi";
import {CustomEvent} from "../../../../common/CustomEvent";

@Service('login.command')
class LoginCommand {

  private logger: Log;

  constructor(
      @Inject('event.emitter')private readonly events: CustomEvent,
      @Inject('user.repository')private readonly userRepository: UserRepositoryInterface,
      @Inject('auth.service')private readonly authService: AuthenticationService) {
    this.logger = new Log();
  }


  public async execute(request: LoginRequest): Promise<void> {
    const password = request.password;

    const user = await this.userRepository.login(request.email);
    if (user === null) {
      this.events.emit(LoginEventsEnum.FAILED, new LoginEventFailed("Error occurred while logging user in."));
      return;
    }

    const hashedPassword = user.password;
    if (this.authService.compare(password, hashedPassword)) {

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const accessToken = this.authService.createAccessToken(user.getId()!, user.getEmail());
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const refreshToken = this.authService.createRefreshToken(user.getId()!, user.getEmail());
      this.events.emit(LoginEventsEnum.SUCCESS, new LoginEventSuccess(accessToken, refreshToken));
    } else {
      this.events.emit(LoginEventsEnum.FAILED, new LoginEventFailed("Error occurred while logging user in."));
    }
  }
}

export default LoginCommand;