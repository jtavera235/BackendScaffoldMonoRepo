import { StatusCodeEnum } from "../../../../../common/enums/status-code-enums";
import { UpdateUserResponseInterface } from "./update-user-response-interface";

class UpdateUserResponseFailed implements UpdateUserResponseInterface {
  public status: StatusCodeEnum;
  private readonly message: string;

  public constructor(message: string, status: StatusCodeEnum) {
    this.message = message;
    this.status = status;
  }

  public getStatus(): StatusCodeEnum {
    return this.status;
  }
}

export default UpdateUserResponseFailed;