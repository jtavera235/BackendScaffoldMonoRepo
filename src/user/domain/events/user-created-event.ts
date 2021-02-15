import User from "../../../dto/user";

export class UserCreatedEvent {
  
  private user: User;
  
  constructor(user: User) {
    this.user = user;
  }

  public getUser(): User {
    return this.user;
  }
}