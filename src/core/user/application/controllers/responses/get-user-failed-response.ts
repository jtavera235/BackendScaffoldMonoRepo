import { StatusCodeEnum } from "../../../../common/enums/status-code-enums";
import { GetUserResponseInterface } from "./get-user-response-interface";

class GetUserFailedResponse implements GetUserResponseInterface {

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

export default GetUserFailedResponse;