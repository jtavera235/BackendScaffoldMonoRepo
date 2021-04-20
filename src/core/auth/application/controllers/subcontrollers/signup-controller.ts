import AbstractController from "../../../../../common/abstract-controller";
import {StatusCodeEnum} from "../../../../../common/enums/status-code-enums";
import SignupRequest from "../requests/signup-request";
import {SignupResponseInterface} from "../responses/signup-response-interface";
import SignupResponseSuccess from "../responses/signup-response-success";
import SignupResponseFailed from "../responses/signup-response-failed";
import {SignupEventsEnum} from "../../../domain/events/signup-event-enum";
import {SignupEventSuccess} from "../../../domain/events/signup-event-success";
import {SignupEventFailed} from "../../../domain/events/signup-event-failed";
import SignupCommand from "../../../domain/command/signup-command";
import {Inject, Service} from "typedi";
import {CustomEvent} from "../../../../../common/CustomEvent";
import {Body, JsonController, Post, Res} from "routing-controllers";

@JsonController()
@Service()
class SignupController extends AbstractController {

  public response!: SignupResponseInterface;

  constructor(
      @Inject('event.emitter') private readonly eventSubscriber: CustomEvent,
      @Inject('signup.command') private readonly command: SignupCommand) {

    super();
  }



  @Post("/register")
  private async register(@Body() request: SignupRequest, @Res() res: any): Promise<void> {

    this.eventSubscriber.on(SignupEventsEnum.SUCCESS, this.signupSuccess.bind(this));
    this.eventSubscriber.on(SignupEventsEnum.FAILED, this.signupFailed.bind(this));

    await this.command.execute(request);

    return res
    .status(this.response.getStatus())
    .json(this.response);

  }

  private signupSuccess(event: SignupEventSuccess): void {
    this.response = new SignupResponseSuccess(StatusCodeEnum.OK, event.user);

  }

  private signupFailed(event: SignupEventFailed): void {
    this.response = new SignupResponseFailed(StatusCodeEnum.BAD_REQUEST, event.getReason());
  }

}

export default SignupController;
