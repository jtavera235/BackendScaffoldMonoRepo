class UserResponse {
  public email: string;
  public uuid?: string;

  constructor(email: string, uuid?: string) {
      this.email = email;
      this.uuid = uuid;
  }
}

export default UserResponse;