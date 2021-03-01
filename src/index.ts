import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import Routes from './Routes';
import * as bodyParser from "body-parser";
import UserDB from "./persist/mongodb/user/user-db";
import { Log } from "./common/logger/logger";


class App {
   
  public express: express.Application;
  private PORT: number;
  private database: UserDB;
  private logger: Log;

  constructor() {
    dotenv.config();
    this.express = express();
    this.middleware();
    this.verifyPorEnvExists();
    this.logger = new Log();
    this.routes();
    this.database = new UserDB();
    this.PORT = parseInt(process.env.PORT as string, 10);
    this.establishConnections();
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private verifyPorEnvExists(): void {
    if (!process.env.PORT) {
      console.log('The specified port does not exist or cannot be used');
      process.exit(1);
    }
  }

  private routes(): void {
    this.express.get("/", (_, res) => {
      res.send("Successfuly health check");
    });

    this.express.use("/api", Routes);

    // eslint:disable-next-line
    this.express.use("*", (_, res) => {
      res.send("Specified route is incorrect");
    });
  }

  private async establishConnections(): Promise<void> {
    this.database.connectToDB();
    this.express.listen(this.PORT, () => {
      this.logger.logMessage(`[server]: Server is running at https://localhost:${this.PORT}`);
      this.logger.logMessage('Waiting to receieve incoming requests');
    });
  }
}

export default new App().express;