import { UserCreatedFailedEvent } from "../../../domain/events/user-created-failed-event";
import { UserCreatedResponseInterface } from "./user-created-response-interface";

class UserCreatedFailedResponse implements UserCreatedResponseInterface {
  private readonly message: string;

  public constructor(message: string) {
    this.message = message;
  }

}

export default UserCreatedFailedEvent;