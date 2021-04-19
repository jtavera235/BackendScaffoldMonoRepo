import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import {Secret} from "jsonwebtoken";


class Middleware {

  public async verify(request: express.Request, response: express.Response, next: express.NextFunction) {
    const token = request.headers.authorization?.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (error, decoded) => {
        if (error) {
          response.status(502).send({
            "error": "Invalid authorization header."
          });
        } else {
          response.locals.data = decoded;
          next();
        }
      })
    } else {
      response.status(502).send({
        "error": "Invalid authorization header."
      });
    }
  }

}

export default new Middleware();