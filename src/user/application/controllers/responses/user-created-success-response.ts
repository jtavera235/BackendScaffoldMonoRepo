import User from "../../../../dto/user/user";
import AbstractResponse from "../../../../common/abstract-response";

class UserCreatedSuccessResponse extends AbstractResponse {
  private readonly message: string;
  private readonly body: User;

  public constructor(message: string, body: User, status: number) {
    super(status);
    this.message = message;
    this.body = body;
  }

}

export default UserCreatedSuccessResponse;