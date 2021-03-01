import EventEmitter from "events";
import { Log } from "../../../common/logger/logger";
import User from "../../../dto/user/user";
import { UserRepositoryInterface } from "../../../persist/mongodb/user/user-repository-interface";
import UpdateUserRequest from "../../application/controllers/requests/update-user-request";
import { UpdateUserEventEnum } from "../events/update-user-event-enum";
import { UpdateUserFailedEvent } from "../events/update-user-failed-event";
import { UpdateUserSuccessEvent } from "../events/update-user-success-event";

class UpdateUserCommand {

  private user!: User;
  private logger: Log;

  constructor(
    private readonly event: EventEmitter,
    private readonly userRepository: UserRepositoryInterface
    ) {
      this.logger = new Log();
    }

  public async execute(request: UpdateUserRequest): Promise<boolean> {

    this.user = request.user;

    return await this.userRepository.update(request.userId, this.user).then(() => {
      return Promise.resolve(this.event.emit(UpdateUserEventEnum.SUCCESS, new UpdateUserSuccessEvent(this.user)));
    }).catch((err) => {
      this.logger.logErrorFailures(err);
      return Promise.reject(this.event.emit(UpdateUserEventEnum.FAILED, new UpdateUserFailedEvent("An error occurred while updating the user.")));
    });0
  }

}

export default UpdateUserCommand;