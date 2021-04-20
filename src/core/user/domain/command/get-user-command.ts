import { UserRepositoryInterface } from "../../../../persist/mongodb/user/user-repository-interface";
import { GetUserFailedEvent } from "../events/get-user-failed-event";
import { GetUserEventEnums } from "../events/get-user-event-enums";
import { GetUserSuccessEvent } from "../events/get-user-success-event";
import { Log } from "../../../../common/logger/logger";
import {Inject, Service} from "typedi";
import {CustomEvent} from "../../../../common/CustomEvent";

@Service('get.users.command')
class GetUserCommand {
  private logger: Log;

  constructor(
    @Inject('user.repository') private readonly userRepository: UserRepositoryInterface,
    @Inject('event.emitter') private readonly event: CustomEvent
    ) {
      this.logger = new Log();
  }

  public async execute(id: string): Promise<void> {

    const userResult = await this.userRepository.retrieve(id);

    if (userResult === null) {
      this.event.emit(GetUserEventEnums.FAILED, new GetUserFailedEvent("User with specified ID was not found"));
    } else {
      this.event.emit(GetUserEventEnums.SUCCESS, new GetUserSuccessEvent(userResult.toDomain()));
    }
  }
}

export default GetUserCommand;