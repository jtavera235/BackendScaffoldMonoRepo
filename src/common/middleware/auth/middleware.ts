import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import {Secret} from "jsonwebtoken";
import {Log} from "../../logger/logger";


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

  public logRequest(request: express.Request, _: express.Response, next: express.NextFunction) {
    const logger = new Log();
    const data = request.body;
    const action = request.method;
    const path = request.originalUrl;
    logger.logApiRequests(data, action, path);
    next();
  }

  public  logResponse(req: express.Request, res: express.Response, next: express.NextFunction) {
    const logger = new Log();
    const action = req.method;
    const path = req.originalUrl;

    const [oldWrite, oldEnd] = [res.write, res.end];
    const chunks: Buffer[] = [];

    (res.write as unknown) = function(chunk: any) {
      chunks.push(Buffer.from(chunk));
      // eslint-disable-next-line @typescript-eslint/ban-types,prefer-rest-params
      (oldWrite as Function).apply(res, arguments);
    };

    res.end = function(chunk: any) {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }
      const bufferContent = Buffer.concat(chunks).toString("utf-8");

      if (bufferContent.length == 0 || bufferContent.charAt(0) != '{') {
        logger.logApiResponses(bufferContent, action, path);
      } else {
        const body = JSON.parse(bufferContent);
        logger.logApiResponses(body, action, path);
      }
      // eslint-disable-next-line prefer-rest-params,@typescript-eslint/ban-types
      (oldEnd as Function).apply(res, arguments);
    };
    if (next) {
      next();
    }
  }
}

export default new Middleware();