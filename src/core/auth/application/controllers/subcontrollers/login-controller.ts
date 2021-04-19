import AbstractController from "../../../../common/abstract-controller";
import {LoginResponseInterface} from "../responses/login-response-interface";
import EventEmitter from "events";
import LoginCommand from "../../../domain/command/login-command";
import {APIActionsEnum} from "../../../../common/enums/api-actions-enums";
import LoginRequest from "../requests/login-request";
import {LoginEventsEnum} from "../../../domain/events/login-events-enum";
import LoginResponseSuccess from "../responses/login-response-success";
import {StatusCodeEnum} from "../../../../common/enums/status-code-enums";
import {LoginEventSuccess} from "../../../domain/events/login-event-success";
import {LoginEventFailed} from "../../../domain/events/login-event-failed";
import LoginResponseFailed from "../responses/login-response-failed";

class LoginController extends AbstractController {

  public response!: LoginResponseInterface;

  constructor(private readonly eventSubscriber: EventEmitter,
              private readonly command: LoginCommand) {
    super();
    this.routes();
  }

  private routes(): void {
    this.login();
  }

  private login(): void {
    const apiAction = APIActionsEnum.POST;
    const route = '/api/auth/login';

    this.express.post('/login', async (req, res) => {

      const request = new LoginRequest(req.body.requestId, req.body.email, req.body.password);
      this.logger.logApiRequests(request, apiAction, route);

      this.eventSubscriber.on(LoginEventsEnum.SUCCESS, this.loginSuccess.bind(this));
      this.eventSubscriber.on(LoginEventsEnum.FAILED, this.loginFailed.bind(this));

      try {
        await this.command.execute(request);
      }
      /* eslint-disable */
      catch(_) {}

      this.logger.logApiResponses(this.response, apiAction, route);
      return res
      .status(this.response.getStatus())
      .json(this.response);

    });
  }

  private loginSuccess(event: LoginEventSuccess): void {
    this.response = new LoginResponseSuccess(StatusCodeEnum.OK, event.access, event.refresh);

  }

  private loginFailed(event: LoginEventFailed): void {
    this.response = new LoginResponseFailed(StatusCodeEnum.BAD_REQUEST, event.getReason());
  }

}

export default LoginController;