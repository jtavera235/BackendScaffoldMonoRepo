import EventEmitter from "events";
import { Log } from "../../../common/logger/logger";
import User from "../../../dto/user/user";
import { UserRepositoryInterface } from "../../../persist/mongodb/user/user-repository-interface";
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

  public async execute(request: UpdateUserRequest): Promise<boolean> {
    const updatedUser = await this.userRepository.update(request.userId, request.user);

    if (updatedUser === null) {
      return Promise.reject(this.event.emit(UpdateUserEventEnum.FAILED, new UpdateUserFailedEvent("An error occurred while updating the user.")));
    }
    return Promise.resolve(this.event.emit(UpdateUserEventEnum.SUCCESS, new UpdateUserSuccessEvent(updatedUser)));
  }

}

export default UpdateUserCommand;