import { StatusCodeEnum } from "../../../../common/enums/status-code-enums";
import { UpdateUserResponseInterface } from "./update-user-response-interface";
import UserResponse from "./user-response";

class UpdateUserResponseSuccess implements UpdateUserResponseInterface {

  public status: StatusCodeEnum;
  private readonly message: string;
  private readonly body: UserResponse;

  public constructor(message: string, body: UserResponse, status: StatusCodeEnum) {
    this.status = status;
    this.message = message;
    this.body = body;
  }

  public getStatus(): StatusCodeEnum {
    return this.status;
  }

}

export default UpdateUserResponseSuccess;     