import LoginRequest from "../../application/controllers/requests/login-request";
import EventEmitter from "events";
import {UserRepositoryInterface} from "../../../persist/mongodb/user/user-repository-interface";
import AuthenticationService from "../../../common/middleware/auth/authentication-service";
import {Log} from "../../../common/logger/logger";
import {LoginEventsEnum} from "../events/login-events-enum";
import {LoginEventFailed} from "../events/login-event-failed";
import {LoginEventSuccess} from "../events/login-event-success";

class LoginCommand {

  private logger: Log;

  constructor(
      private readonly events: EventEmitter,
      private readonly userRepository: UserRepositoryInterface,
      private readonly authService: AuthenticationService) {
    this.logger = new Log();
  }


  public async execute(request: LoginRequest): Promise<boolean> {
    const password = request.password;

    const user = await this.userRepository.login(request.email);
    if (user === null) {
      return Promise.reject(this.events.emit(LoginEventsEnum.FAILED, new LoginEventFailed("Error occurred while logging user in.")));
    }
    const hashedPassword = user.password;
    if (this.authService.compare(password, hashedPassword)) {

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const accessToken = this.authService.createAccessToken(user.getId()!, user.getEmail());
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const refreshToken = this.authService.createRefreshToken(user.getId()!, user.getEmail());
      return Promise.resolve(this.events.emit(LoginEventsEnum.SUCCESS, new LoginEventSuccess(accessToken, refreshToken)));
    }
    return Promise.reject(this.events.emit(LoginEventsEnum.FAILED, new LoginEventFailed("Error occurred while logging user in.")));
  }
}

export default LoginCommand;