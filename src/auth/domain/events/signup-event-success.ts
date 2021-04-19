import UserResponse from "../../../user/application/controllers/responses/user-response";
import User from "../../../dto/user/user";

export class SignupEventSuccess {

  public readonly user: UserResponse;

  constructor(user: User) {
    this.user = user.toDomain();
  }

}