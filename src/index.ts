import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import Routes from './Routes';
import * as bodyParser from "body-parser";


class App {
   
  public express: express.Application;
  private PORT: number;

  constructor() {
    dotenv.config();
    this.express = express();
    this.middleware();
    this.verifyPorEnvExists();
    this.PORT = parseInt(process.env.PORT as string, 10);
    this.express.listen(this.PORT, () => {
      console.log(`[server]: Server is running at https://localhost:${this.PORT}`);
    });
    this.routes();
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
    this.express.get("/", (req, res, next) => {
      res.send("Successfuly health check");
    });

    // user route
    this.express.use("/api", Routes);

    // handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.send("Specified route is incorrect");
    });
  }
}

export default new App().express;