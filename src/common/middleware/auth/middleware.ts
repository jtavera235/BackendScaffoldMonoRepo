import * as jwt from 'jsonwebtoken';
import {Secret} from "jsonwebtoken";
import {ExpressMiddlewareInterface} from "routing-controllers";
import {Service} from "typedi";


@Service()
export class Middleware implements ExpressMiddlewareInterface {

  use(request: any, response: any, next: (err?: any) => any): any {
    const token = request.headers.authorization?.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (error: any, decoded: any) => {
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
        "error": "Authorization header not found."
      });
    }
  }


}

export default Middleware;