import express from "express";

abstract class AbstractExpressClass {
    public express: express.Application;

    constructor() {
      this.express = express();
    }
}

export default AbstractExpressClass;