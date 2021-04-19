import { UserCreatedResponseInterface } from "../../../src/core/user/application/controllers/responses/user-created-response-interface";
import { StatusCodeEnum } from "../../../src/common/enums/status-code-enums";

export class UserSuccessMockResponse implements UserCreatedResponseInterface  {
  public status: StatusCodeEnum
  public constructor() { this.status = StatusCodeEnum.OK }

  public getStatus(): StatusCodeEnum {
    return this.status;
  }
}