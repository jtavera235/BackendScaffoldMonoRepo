import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

class AuthenticationService {

  public hash(value: string): string {
    return bcrypt.hashSync(value, 9);
  }

  public compare(hashed: string, actual: string): boolean {
    return bcrypt.compareSync(hashed, actual);
  }

  public signJWT(userId: string): string {
    const now = new Date().getTime();
    const expire = now + 50 * 100000;
    const expireInseconds = Math.floor(expire / 1000);
    const token = jwt.sign({ userId: userId}, process.env.JWT_KEY as string, {
      issuer: 'REPLACE_ME ',
      algorithm: 'HS256',
      expiresIn: expireInseconds
    });
    return token
  }
}

export default AuthenticationService;