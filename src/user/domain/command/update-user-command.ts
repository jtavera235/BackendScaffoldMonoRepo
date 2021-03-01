import EventEmitter from "events";
import User from "../../../dto/user/user";
import UserRepository from "../../../persist/mongodb/user/user-repository";
import UpdateUserRequest from "../../application/controllers/requests/update-user-request";
import { UpdateUserEventEnum } from "../events/update-user-event-enum";
import { UpdateUserFailedEvent } from "../events/update-user-failed-event";
import { UpdateUserSuccessEvent } from "../events/update-user-success-event";

class UpdateUserCommand {
  private events: EventEmitter;
  private user!: User;
  private userRepository: UserRepository;

  constructor(event: EventEmitter) {
    this.events = event;
    this.userRepository = new UserRepository();
  }

  public async execute(request: UpdateUserRequest): Promise<boolean> {

    this.user = request.user;

    return await this.userRepository.update(request.userId, this.user).then(() => {
      return Promise.resolve(this.events.emit(UpdateUserEventEnum.SUCCESS, new UpdateUserSuccessEvent(this.user)));
    }).catch(() => {
      return Promise.resolve(this.events.emit(UpdateUserEventEnum.FAILED, new UpdateUserFailedEvent("An error occurred while updating the user.")));
    });
  }

}

export default UpdateUserCommand;