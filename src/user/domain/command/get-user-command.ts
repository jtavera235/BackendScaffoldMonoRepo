import UserRepository from "../../../persist/mongodb/user/user-repository";
import User from '../../../dto/user/user';
import EventEmitter from "events";
import GetUserRequest from "../../application/controllers/requests/get-user-request";
import { GetUserFailedEvent } from "../events/get-user-failed-event";
import { GetUserEventEnums } from "../events/get-user-event-enums";
import { GetUserSuccessEvent } from "../events/get-user-success-event";

class GetUserCommand {
  private events: EventEmitter;
  private user!: User;
  private userRepository: UserRepository;

  constructor(event: EventEmitter) {
    this.events = event;
    this.userRepository = new UserRepository();
  }

  public async execute(request: GetUserRequest): Promise<boolean> {

    return await this.userRepository.retrieve(request.userId).then((result) => {

      this.user = new User(result!.email, result!.name);
      return Promise.resolve(this.events.emit(GetUserEventEnums.SUCCESS, new GetUserSuccessEvent(this.user.toDomain())));
    }).catch(err => {
      return Promise.resolve(this.events.emit(GetUserEventEnums.FAILED, new GetUserFailedEvent("User with specified ID was not found")));
    });
  }
}

export default GetUserCommand;