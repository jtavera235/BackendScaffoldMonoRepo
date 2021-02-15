import AbstractExpressClass from "./abstract-express-class";
import * as bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { Log } from "./logger/logger";

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
  }
}

export default AbstractController;