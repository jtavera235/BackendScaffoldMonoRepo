import User from "../../../dto/user/user";

export class UserCreatedSuccessEvent {
  
  private user: User;
  
  constructor(user: User) {
    this.user = user;
  }

  public getUser(): User {
    return this.user;
  }
}