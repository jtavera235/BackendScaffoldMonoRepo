import {StatusCodeEnum} from "../../../../common/enums/status-code-enums";
import {LoginResponseInterface} from "./login-response-interface";
import UserResponse from "../../../../user/application/controllers/responses/user-response";

class SignupResponseSuccess implements LoginResponseInterface {

  public status: StatusCodeEnum;
  public user: UserResponse;

  constructor(status: StatusCodeEnum, user: UserResponse) {
    this.status = status;
    this.user = user;
  }

  public getStatus(): number {
    return this.status;
  }
}

export default SignupResponseSuccess;