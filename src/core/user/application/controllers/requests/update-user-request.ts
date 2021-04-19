import { RequestInterface } from "../../../../../common/request-interface";
import User from "../../../../../dto/user/user";

class UpdateUserRequest implements RequestInterface {

  public requestId: string;
  public user: User;
  public userId: string;

  public constructor(requestId: string, user: User, userId: string) {
    this.requestId = requestId;
    this.user = user;
    this.userId = userId;
  }

}

export default UpdateUserRequest;