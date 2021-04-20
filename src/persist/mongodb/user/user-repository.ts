import { Log } from "../../../common/logger/logger";
import User from "../../../dto/user/user";
import { UserModel } from "./user-db";
import { UserRepositoryInterface } from "./user-repository-interface";
import {Service} from "typedi";

@Service('user.repository')
class UserRepository implements UserRepositoryInterface {

  private logger: Log;

  public constructor() {
    this.logger = new Log();
  }

  public async save(user: User): Promise<User | null> {

    return await UserModel.create(user).then(result => {
      return new User(result.email, result.password, result.uuid)
    }).catch(error => {
      this.logger.logDatabaseAction(error);
      return null;
    });
  }

  public async retrieve(userId: string): Promise<User | null> {
    const user = await UserModel.findOne({ uuid: userId });

    if (user === null) {
      this.logger.logDatabaseAction("User Id does not exist");
      return null;
    }
    return new User(user.email, user.password, user.uuid);
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

  public async update(userId: string, user: User): Promise<User | null> {
    const idExists = await UserModel.findOne({ uuid: userId });

    if (idExists === null) {
      this.logger.logDatabaseAction("User Id does not exist");
      return null;
    }

    const updatedFields = {
      email: user.email
    }

    return await UserModel.updateOne({ uuid: userId }, updatedFields).then(() => {
      return user;
    }).catch(err => {
      this.logger.logDatabaseAction(err);
      return null;
    });
  }

  public async login(email: string): Promise<User | null> {

    const user = await UserModel.findOne({ email: email });

    if (user === null) {
      this.logger.logDatabaseAction("Invalid credentials.");
      return null;
    }
    return new User(user.email, user.password, user.uuid);
  }
 }


export default UserRepository;