import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {Secret} from "jsonwebtoken";

class AuthenticationService {

  public hash(value: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(value, salt);
  }

  public compare(actual: string, hashed: string): boolean {
    return bcrypt.compareSync(actual, hashed);
  }

  public createAccessToken(userId: string, email: string): string {
    return jwt.sign({ userId: userId, email: email}, process.env.ACCESS_TOKEN_SECRET as Secret, {
      issuer: 'REPLACE_ME ',
      algorithm: 'HS256',
      expiresIn: "10h"
    });
  }

  public createRefreshToken(userId: string, email: string): string {
    return jwt.sign({ userId: userId, email: email}, process.env.REFRESH_TOKEN_SECRET as Secret, {
      issuer: 'REPLACE_ME ',
      algorithm: 'HS256',
      expiresIn: "2 days"
    });
  }

}

export default AuthenticationService;