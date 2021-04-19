import UserResponse from "../../user/application/controllers/responses/user-response";

class User {
  public email: string;
  public password: string;
  public uuid?: string;

  constructor(email: string, password: string, uuid?: string) {
      this.email = email;
      this.password = password;
      this.uuid = uuid;
  }

  public getPassword(): string {
    return this.password;
  }

  public getEmail(): string {
    return this.email;
  }

  public getId(): string | undefined {
    return this.uuid;
  }

  public generateUserUniqueId():void {
   let result = 'CUSTOM_';
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   const charactersLength = characters.length;
   for ( let i = 0; i < 15; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   this.uuid = result;
  }

  public toDomain(): UserResponse {
    return new UserResponse(this.email, this.uuid);
  }
}

export default User;