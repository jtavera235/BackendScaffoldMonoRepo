
import AbstractController from "../../../common/abstract-controller";
import GetUserController from './subcontrollers/get-user-controller';
import UpdateUserController from './subcontrollers/update-user-controller';
import GetUserCommand from '../../domain/command/get-user-command';
import UpdateUserCommand from '../../domain/command/update-user-command';
import UserRepository from '../../../persist/mongodb/user/user-repository';
import EventEmitter from 'events';
import { UserRepositoryInterface } from '../../../persist/mongodb/user/user-repository-interface';
import Middleware from "../../../common/middleware/auth/middleware";

class UserController extends AbstractController {

  constructor() {
    super();
    this.routes();
  }

  private routes(): void {

    const userRepository: UserRepositoryInterface = new UserRepository();
    const eventSubscriber = new EventEmitter();

    const getUserCommand = new GetUserCommand(eventSubscriber, userRepository);
    const getUserController = new GetUserController(getUserCommand, eventSubscriber);

    const updateUserCommand = new UpdateUserCommand(eventSubscriber, userRepository);
    const updateUserController = new UpdateUserController(updateUserCommand, eventSubscriber);

    this.express.use('/', Middleware.verify, getUserController.express);
    this.express.use('/', Middleware.verify, updateUserController.express);
  }
}

export default new UserController().express;