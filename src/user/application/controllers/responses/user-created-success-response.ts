import User from "../../../../dto/user";
import { UserCreatedResponseInterface } from "./user-created-response-interface";


class UserCreatedSuccessResponse implements UserCreatedResponseInterface {
  private readonly message: string;
  private readonly body: User;

  public constructor(message: string, body: User) {
    this.message = message;
    this.body = body;
  }
}

export default UserCreatedSuccessResponse;