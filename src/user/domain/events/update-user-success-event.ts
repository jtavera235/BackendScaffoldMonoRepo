import UserResponse from "../../application/controllers/responses/user-response";

export class UpdateUserSuccessEvent {
  private user: UserResponse;
  
  constructor(user: UserResponse) {
    this.user = user;
  }

  public getUser(): UserResponse {
    return this.user;
  }
}