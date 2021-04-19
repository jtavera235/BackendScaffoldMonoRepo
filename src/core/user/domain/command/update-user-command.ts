import EventEmitter from "events";
import { Log } from "../../../../common/logger/logger";
import User from "../../../../dto/user/user";
import { UserRepositoryInterface } from "../../../../persist/mongodb/user/user-repository-interface";
import UpdateUserRequest from "../../application/controllers/requests/update-user-request";
import { UpdateUserEventEnum } from "../events/update-user-event-enum";
import { UpdateUserFailedEvent } from "../events/update-user-failed-event";
import { UpdateUserSuccessEvent } from "../events/update-user-success-event";

class UpdateUserCommand {

  private logger: Log;

  constructor(
    private readonly event: EventEmitter,
    private readonly userRepository: UserRepositoryInterface
    ) {
      this.logger = new Log();
    }

  public async execute(request: UpdateUserRequest): Promise<void> {
    const updatedUser = await this.userRepository.update(request.userId, request.user);

    if (updatedUser === null) {
      this.event.emit(UpdateUserEventEnum.FAILED, new UpdateUserFailedEvent("An error occurred while updating the user."));
    } else {
      this.event.emit(UpdateUserEventEnum.SUCCESS, new UpdateUserSuccessEvent(updatedUser));
    }
  }

}

export default UpdateUserCommand;