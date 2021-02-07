import AbstractExpressClass from "./abstract-express-class";
import * as bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

abstract class AbstractController extends AbstractExpressClass {

    constructor() {
      super();
    }

    private middleware(): void {
      this.express.use(bodyParser.json());
      this.express.use(cors());
      this.express.use(helmet());
    }
}

export default AbstractController;