import AbstractResponse from "../../../../common/abstract-response";

class UserCreatedFailedResponse extends AbstractResponse {
  private readonly message: string;

  public constructor(message: string, status: number) {
    super(status);
    this.message = message;
  }
}

export default UserCreatedFailedResponse;