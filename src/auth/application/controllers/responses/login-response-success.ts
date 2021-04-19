import {StatusCodeEnum} from "../../../../common/enums/status-code-enums";
import {LoginResponseInterface} from "./login-response-interface";

class LoginResponseSuccess implements LoginResponseInterface {

  public status: StatusCodeEnum;
  public access: string;
  public refresh: string;

  constructor(status: StatusCodeEnum, access: string, refresh: string) {
    this.status = status;
    this.access = access;
    this.refresh = refresh;
  }

  public getStatus(): number {
    return this.status;
  }
}

export default LoginResponseSuccess;