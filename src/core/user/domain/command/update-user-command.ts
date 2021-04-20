import { Log } from "../../../../common/logger/logger";
import { UserRepositoryInterface } from "../../../../persist/mongodb/user/user-repository-interface";
import UpdateUserRequest from "../../application/controllers/requests/update-user-request";
import { UpdateUserEventEnum } from "../events/update-user-event-enum";
import { UpdateUserFailedEvent } from "../events/update-user-failed-event";
import { UpdateUserSuccessEvent } from "../events/update-user-success-event";
import {Inject, Service} from "typedi";
import { CustomEvent} from "../../../../common/CustomEvent";

@Service('update.users.command')
class UpdateUserCommand {

  private logger: Log;

  constructor(
    @Inject('event.emitter') private readonly event: CustomEvent,
    @Inject('user.repository') private readonly userRepository: UserRepositoryInterface
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