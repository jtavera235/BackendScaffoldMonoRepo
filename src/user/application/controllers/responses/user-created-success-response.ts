import { StatusCodeEnum } from "../../../../common/enums/status-code-enums";
import User from "../../../../dto/user/user";
import { UserCreatedResponseInterface } from "./user-created-response-interface";
import UserResponse from "./user-response";

class UserCreatedSuccessResponse implements UserCreatedResponseInterface {
  private readonly message: string;
  private readonly body: UserResponse;
  public status: StatusCodeEnum;

  public constructor(message: string, user: User, status: StatusCodeEnum) {
    this.message = message;
    this.body = user.toDomain();
    this.status = status;
  }

  public getStatus(): number {
    return this.status;
  }
}

export default UserCreatedSuccessResponse;