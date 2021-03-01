import AbstractExpressClass from "./abstract-express-class";
import * as bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { Log } from "./logger/logger";
/* eslint-disable */
const rateLimit = require("express-rate-limit");

abstract class AbstractController extends AbstractExpressClass {

  public logger: Log;

  constructor() {
    super();
    this.middleware();
    this.logger = new Log();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(cors());
    this.express.use(helmet());

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 50 // limit each IP to 100 requests per windowMs
    });
    this.express.use(limiter);

  }
}

export default AbstractController;