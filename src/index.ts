import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import Routes from './Routes';
import * as bodyParser from "body-parser";
import UserDB from "./persist/mongodb/user/user-db";
import { Log } from "./common/logger/logger";
import mongoSanitize from 'express-mongo-sanitize';
import Middleware from "./common/middleware/auth/middleware";

class App {
   
  public express: express.Application;
  private readonly PORT: number;
  private userDatabase: UserDB;
  private logger: Log;

  constructor() {
    dotenv.config();
    this.express = express();
    this.middleware();
    this.verifyPorEnvExists();
    this.logger = new Log();
    this.routes();
    this.userDatabase = new UserDB();
    this.PORT = parseInt(process.env.PORT as string, 10);
    this.establishConnections();
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(express.urlencoded({ extended: true, limit: "1kb" }));
    this.express.use(express.json({ limit: "1kb" }));
    this.express.use(bodyParser.json({limit: '1kb'}));
    this.express.use(Middleware.logResponse);
    this.express.use(Middleware.logRequest);
    this.express.use(mongoSanitize({
      replaceWith: '_'
    }));
  }

  private verifyPorEnvExists(): void {
    if (!process.env.PORT) {
      console.log('The specified port does not exist or cannot be used');
      process.exit(1);
    }
  }

  private routes(): void {
    this.express.get("/", (_, res) => {
      res.send("Successfully health check");
    });

    const apiVersion = process.env.API_VERSION as string;
    const route = '/api/v' + apiVersion;
    this.express.use(route, Routes);

    // eslint:disable-next-line
    this.express.use("*", (_, res) => {
      res.send("Specified route is incorrect");
    });
  }

  private async establishConnections(): Promise<void> {
    await this.userDatabase.connectToDB();
    this.express.listen(this.PORT, () => {
      this.logger.logMessage(`[server]: Server is running at https://localhost:${this.PORT}`);
      this.logger.logMessage('Waiting to receive incoming requests');
    });
  }
}

export default new App().express;