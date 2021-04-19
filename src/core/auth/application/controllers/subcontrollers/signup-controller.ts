import AbstractController from "../../../../../common/abstract-controller";
import EventEmitter from "events";
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

    this.express.post('/register',  async (req, res) => {

      const request = new SignupRequest(req.body.requestId, req.body.email, req.body.password);

      this.eventSubscriber.on(SignupEventsEnum.SUCCESS, this.signupSuccess.bind(this));
      this.eventSubscriber.on(SignupEventsEnum.FAILED, this.signupFailed.bind(this));

      await this.command.execute(request);

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
