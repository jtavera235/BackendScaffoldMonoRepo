
class User {
  private email: string;
  private name: string;
  private id: string;

  constructor(email: string, name: string, id: string) {
      this.email = email;
      this.name = name;
      this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
      return this.email;
  }
}

export default User;