import { UserRepositoryInterface } from "../../../persist/mongodb/user/user-repository-interface";
import User from '../../../dto/user/user';
import EventEmitter from "events";
import GetUserRequest from "../../application/controllers/requests/get-user-request";
import { GetUserFailedEvent } from "../events/get-user-failed-event";
import { GetUserEventEnums } from "../events/get-user-event-enums";
import { GetUserSuccessEvent } from "../events/get-user-success-event";
import { UserInterface } from "../../../persist/mongodb/user/user-interface";

class GetUserCommand {
  private user!: User;

  constructor(
    private readonly event: EventEmitter,
    private readonly userRepository: UserRepositoryInterface
    ) {
  }

  public async execute(request: GetUserRequest): Promise<boolean> {

    return await this.userRepository.retrieve(request.userId).then((result) => {

      if (result === null) {
        return Promise.resolve(this.event.emit(GetUserEventEnums.FAILED, new GetUserFailedEvent("User with specified ID was not found")));
      }

      const userResult: UserInterface = result;

      this.user = new User(userResult.email, userResult.name, userResult.uuid);
      return Promise.resolve(this.event.emit(GetUserEventEnums.SUCCESS, new GetUserSuccessEvent(this.user.toDomain())));
    }).catch(() => {
      return Promise.reject(this.event.emit(GetUserEventEnums.FAILED, new GetUserFailedEvent("User with specified ID was not found")));
    });
  }
}

export default GetUserCommand;