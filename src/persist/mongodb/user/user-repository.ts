import { Log } from "../../../common/logger/logger";
import User from "../../../dto/user/user";
import { UserInterface } from "../user-interface";
import { UserModel } from "./user-db";

class UserRepository {

  private logger: Log;

  public constructor() {
    this.logger = new Log();
  }

  public async save(user: User): Promise<void | UserInterface> {
    return await UserModel.create(user).then().catch(error => {
      this.logger.logDatabaseAction(error);
    });
  }

  public retrieve(): User {
    return new User("", "", "");
  }

  public delete(): void {

  }

  public update(): void {

  }

 }

export default UserRepository;