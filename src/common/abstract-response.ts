import { ResponseInterface } from "./response-interface";
import { StatusCodeEnum } from "./enums/status-code-enums";

abstract class AbstractResponse implements ResponseInterface {
  private status: StatusCodeEnum;

  public constructor(status: StatusCodeEnum) {
    this.status = status;
  }

  public getStatus(): number {
    return this.status;
  }
}

export default AbstractResponse;