import AbstractController from "../../../../../common/abstract-controller";
import {LoginResponseInterface} from "../responses/login-response-interface";
import EventEmitter from "events";
import LoginCommand from "../../../domain/command/login-command";
import LoginRequest from "../requests/login-request";
import {LoginEventsEnum} from "../../../domain/events/login-events-enum";
import LoginResponseSuccess from "../responses/login-response-success";
import {StatusCodeEnum} from "../../../../../common/enums/status-code-enums";
import {LoginEventSuccess} from "../../../domain/events/login-event-success";
import {LoginEventFailed} from "../../../domain/events/login-event-failed";
import LoginResponseFailed from "../responses/login-response-failed";
import {Body, JsonController, Post, Res} from "routing-controllers";
import {Inject, Service} from "typedi";
import {CustomEvent} from "../../../../../common/CustomEvent";

@JsonController()
@Service()
class LoginController extends AbstractController {

  public response!: LoginResponseInterface;

  constructor(
      @Inject('event.emitter') private readonly eventSubscriber: CustomEvent,
      @Inject('login.command') private readonly command: LoginCommand
  ) {
    super();
  }


  @Post("/login")
  private async login(@Body() request: LoginRequest, @Res() res: any): Promise<void> {
    this.eventSubscriber.on(LoginEventsEnum.SUCCESS, this.loginSuccess.bind(this));
    this.eventSubscriber.on(LoginEventsEnum.FAILED, this.loginFailed.bind(this));

    await this.command.execute(request);

    return res
    .status(this.response.getStatus())
    .json(this.response);
  }

  private loginSuccess(event: LoginEventSuccess): void {
    this.response = new LoginResponseSuccess(StatusCodeEnum.OK, event.access, event.refresh);

  }

  private loginFailed(event: LoginEventFailed): void {
    this.response = new LoginResponseFailed(StatusCodeEnum.BAD_REQUEST, event.getReason());
  }

}

export default LoginController;