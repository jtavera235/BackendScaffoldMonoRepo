import UserResponse from "../../user/application/controllers/responses/user-response";

class User {
  public email: string;
  public name: string;
  public uuid: string;

  constructor(email: string, name: string) {
      this.email = email;
      this.name = name;
      this.uuid = this.generateUserUniqueId();
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getId(): string {
    return this.uuid;
  }

  private generateUserUniqueId(): string {
   let result = 'CUSTOM_';
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   const charactersLength = characters.length;
   for ( let i = 0; i < 15; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
  }

  public toDomain(): UserResponse {
    return new UserResponse(this.email, this.name, this.uuid);
  }
}

export default User;