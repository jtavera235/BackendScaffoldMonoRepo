import mongoose, { Model, Schema } from "mongoose";
import GeneralError from "../../../common/general-error";
import { Log } from "../../../common/logger/logger";
import { UserInterface } from "./user-interface";

class UserDB {

  private uri = process.env.USER_DB_URI as string;
  private logger: Log;
  public schema!: Schema;

  constructor() {
    this.logger = new Log();
    this.defineSchema();
  }

  public async connectToDB(): Promise<void> {
    this.logger.logMessage("Attempting to connect to User Database");
    await mongoose.connect(this.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      this.logger.logMessage("Successfully connected to User Database");
    }).catch((error) => {
      this.logger.logErrorFailures(new GeneralError(`Unable to connect to the database. \n ${error}`));
    })
  }

  public defineSchema(): void {
    this.schema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
      },
      uuid: {
        type: String,
        required: true,
        unique: true
      }
    });
  }
}

const UserModel: Model<UserInterface> = mongoose.model('User', new UserDB().schema);

export default UserDB;
export { UserModel };