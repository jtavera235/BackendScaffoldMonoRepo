import 'reflect-metadata';
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
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { Container } from 'typedi';
import { container } from "tsyringe";
import GetUserController
  from "./core/user/application/controllers/subcontrollers/get-user-controller";
import UpdateUserController
  from "./core/user/application/controllers/subcontrollers/update-user-controller";
import UserRepository from "./persist/mongodb/user/user-repository";
import UserController from "./core/user/application/controllers/user-controller";
import {useContainer, useExpressServer} from "routing-controllers";
import EventEmitter from 'events';
import { CustomEvent } from "./common/CustomEvent";
import AuthenticationService from "./common/middleware/auth/authentication-service";

useContainer(Container);

Container.set('user.repository', new UserRepository());
Container.set('event.emitter', new CustomEvent());
Container.set('auth.service', new AuthenticationService());

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
    this.express.use("/api/v1", Routes);

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