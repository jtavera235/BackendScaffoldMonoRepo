import * as bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import helmet from "helmet";

abstract class AbstractExpressClass {
    public express: express.Application;

    constructor() {
      this.express = express();
    }
}

export default AbstractExpressClass;