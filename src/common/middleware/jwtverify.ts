import * as express from 'express';
import * as jwt from 'jsonwebtoken';

/* eslint-disable */
export default function verify() {
  return async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const token = request.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_KEY as string, (error, decoded) => {
          if (error) {
            return response.status(502);
          } else {
            response.locals.jwt = decoded;
            next();
            return;
          }
        })
    } else {
      return response.status(502);
    }
  }
}