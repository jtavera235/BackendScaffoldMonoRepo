import { RequestInterface } from "../../../../../common/request-interface";

class GetUserRequest implements RequestInterface {
  public requestId: string;

  public userId: string;

  public constructor(requestId: string, userId: string) {
    this.requestId = requestId;
    this.userId = userId;
  }
}

export default GetUserRequest;