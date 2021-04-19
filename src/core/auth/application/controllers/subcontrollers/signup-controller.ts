import AbstractController from "../../../../../common/abstract-controller";
import {LoginResponseInterface} from "../responses/login-response-interface";
import EventEmitter from "events";
import LoginCommand from "../../../domain/command/login-command";
import {APIActionsEnum} from "../../../../../common/enums/api-actions-enums";
import {StatusCodeEnum} from "../../../../../common/enums/status-code-enums";
import SignupRequest from "../requests/signup-request";
import {SignupResponseInterface} from "../responses/signup-response-interface";
import SignupResponseSuccess from "../responses/signup-response-success";
import SignupResponseFailed from "../responses/signup-response-failed";
import {SignupEventsEnum} from "../../../domain/events/signup-event-enum";
import {SignupEventSuccess} from "../../../domain/events/signup-event-success";
import {SignupEventFailed} from "../../../domain/events/signup-event-failed";
import SignupCommand from "../../../domain/command/signup-command";

class SignupController extends AbstractController {

  public response!: SignupResponseInterface;

  constructor(private readonly eventSubscriber: EventEmitter,
              private readonly command: SignupCommand) {
    super();
    this.routes();
  }

  private routes(): void {
    this.login();
  }

  private login(): void {
    const apiAction = APIActionsEnum.POST;
    const route = '/api/auth/register';

    this.express.post('/register', async (req, res) => {

      const request = new SignupRequest(req.body.requestId, req.body.email, req.body.password);
      this.logger.logApiRequests(request, apiAction, route);

      this.eventSubscriber.on(SignupEventsEnum.SUCCESS, this.signupSuccess.bind(this));
      this.eventSubscriber.on(SignupEventsEnum.FAILED, this.signupFailed.bind(this));

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

  private signupSuccess(event: SignupEventSuccess): void {
    this.response = new SignupResponseSuccess(StatusCodeEnum.OK, event.user);

  }

  private signupFailed(event: SignupEventFailed): void {
    this.response = new SignupResponseFailed(StatusCodeEnum.BAD_REQUEST, event.getReason());
  }

}

export default SignupController;
