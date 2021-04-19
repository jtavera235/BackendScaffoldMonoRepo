import {LoginResponseInterface} from "./login-response-interface";
import {StatusCodeEnum} from "../../../../../common/enums/status-code-enums";

class LoginResponseFailed implements LoginResponseInterface {
  public status: StatusCodeEnum;
  public message: string;

  constructor( status: StatusCodeEnum, message: string) {
    this.status = status;
    this.message = message;
  }


  public getStatus(): number {
    return this.status;
  }

  public getMessage(): string {
    return this.message;
  }

}

export default LoginResponseFailed;