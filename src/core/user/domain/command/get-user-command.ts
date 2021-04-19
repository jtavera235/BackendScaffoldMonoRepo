import { UserRepositoryInterface } from "../../../../persist/mongodb/user/user-repository-interface";
import User from '../../../../dto/user/user';
import EventEmitter from "events";
import GetUserRequest from "../../application/controllers/requests/get-user-request";
import { GetUserFailedEvent } from "../events/get-user-failed-event";
import { GetUserEventEnums } from "../events/get-user-event-enums";
import { GetUserSuccessEvent } from "../events/get-user-success-event";
import { UserInterface } from "../../../../persist/mongodb/user/user-interface";
import { Log } from "../../../../common/logger/logger";

class GetUserCommand {
  private logger: Log;

  constructor(
    private readonly event: EventEmitter,
    private readonly userRepository: UserRepositoryInterface
    ) {
      this.logger = new Log();
  }

  public async execute(request: GetUserRequest): Promise<void> {

    const userResult = await this.userRepository.retrieve(request.userId);

    if (userResult === null) {
      this.event.emit(GetUserEventEnums.FAILED, new GetUserFailedEvent("User with specified ID was not found"));
    } else {
      this.event.emit(GetUserEventEnums.SUCCESS, new GetUserSuccessEvent(userResult.toDomain()));
    }
  }
}

export default GetUserCommand;