import { StatusCodeEnum } from "../../../../common/enums/status-code-enums";
import { UserCreatedResponseInterface } from "./user-created-response-interface";

class UserCreatedFailedResponse implements UserCreatedResponseInterface  {
  private readonly message: string;

  public status: StatusCodeEnum;

  public constructor(message: string, status: StatusCodeEnum) {
    this.message = message;
    this.status = status;
  }

  public getStatus(): number {
    return this.status;
  }
}

export default UserCreatedFailedResponse;