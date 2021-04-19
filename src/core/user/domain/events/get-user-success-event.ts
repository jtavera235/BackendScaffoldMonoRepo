import UserResponse from "../../application/controllers/responses/user-response";

export class GetUserSuccessEvent {

  private user: UserResponse;

  public constructor(user: UserResponse) {
    this.user = user;
  }

  public getUser(): UserResponse {
    return this.user;
  }

}