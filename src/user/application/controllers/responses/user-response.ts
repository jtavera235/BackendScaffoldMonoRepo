class UserResponse {
  public email: string;
  public name: string;
  public uuid: string;

  constructor(email: string, name: string, uuid: string) {
      this.email = email;
      this.name = name;
      this.uuid = uuid;
  }
}

export default UserResponse;