import {RequestInterface} from "../../../../../common/request-interface";


class LoginRequest implements RequestInterface {

  public requestId: string;
  public email: string;
  public password: string;

  constructor(requestId: string, email: string, password:string) {
    this.requestId = requestId;
    this.email = email;
    this.password = password;
  }

}

export default LoginRequest;