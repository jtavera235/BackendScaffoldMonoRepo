import { Log } from "../../../common/logger/logger";
import User from "../../../dto/user/user";
import { UserInterface } from "./user-interface";
import { UserModel } from "./user-db";

class UserRepository {

  private logger: Log;

  public constructor() {
    this.logger = new Log();
  }

  public async save(user: User): Promise<void | UserInterface> {
    await UserModel.create(user).then(() => {
      return Promise.resolve(user);
    }).catch(error => {
      this.logger.logDatabaseAction(error);
      return Promise.reject(`An error occurred while trying to save the user`);
    });
  }

  public async retrieve(userId: string): Promise<UserInterface | null> {
    const user = await UserModel.findOne({ uuid: userId });

    if (user === null) {
      this.logger.logDatabaseAction("User Id does not exist");
      return Promise.reject(`The User ID does not exist`);
    }

    return Promise.resolve(user);
  }

  public async delete(userId: string): Promise<void> {
    const idExists = await UserModel.findOne({ uuid: userId });

    if (idExists === null) {
      this.logger.logDatabaseAction("User Id does not exist");
      return Promise.reject(`The User ID does not exist`);
    }

    await UserModel.deleteOne({ uuid: userId }).then(() => {
      return Promise.resolve();
    }).catch(err => {
      this.logger.logDatabaseAction(err);
      return Promise.reject(`An error occurred while trying to delete the user`);
    });

    return Promise.resolve();
  }

  public async update(userId: string, user: User): Promise<void | UserInterface> {
    const idExists = await UserModel.findOne({ uuid: userId });

    if (idExists === null) {
      this.logger.logDatabaseAction("User Id does not exist");
      return Promise.reject(`The User ID does not exist`);
    }

    const updatedFields = {
      name: user.name,
      email: user.email
    }
    await UserModel.updateOne({ uuid: userId }, updatedFields).then(() => {
      return Promise.resolve(user);
    }).catch(err => {
      this.logger.logDatabaseAction(err);
      return Promise.reject(`An error occurred while trying to update the user`);
    });
  }
 }


export default UserRepository;