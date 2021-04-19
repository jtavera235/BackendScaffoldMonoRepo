import express from "express";

abstract class AbstractExpressClass {
    public express: express.Application;

    protected constructor() {
      this.express = express();
    }
}

export default AbstractExpressClass;