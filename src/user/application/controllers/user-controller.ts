import CreateUserController from './subcontrollers/create-user-controllers';
import AbstractController from "../../../common/abstract-controller";
import GetUserController from './subcontrollers/get-user-controller';
import UpdateUserController from './subcontrollers/update-user-controller';
import CreateUserCommand from '../../domain/command/create-user-command';
import GetUserCommand from '../../domain/command/get-user-command';
import UpdateUserCommand from '../../domain/command/update-user-command';
import UserRepository from '../../../persist/mongodb/user/user-repository';
import AuthenticationService from '../../../common/middleware/auth/authentication-service';
import EventEmitter from 'events';
import { UserRepositoryInterface } from '../../../persist/mongodb/user/user-repository-interface';

class UserController extends AbstractController {

  constructor() {
    super();
    this.routes();
  }

  private routes(): void {

    let name = 'Juan';
    
    const userRepository: UserRepositoryInterface = new UserRepository();
    const authenticationService = new AuthenticationService();
    const eventSubscriber = new EventEmitter();

    const createUserCommand = new CreateUserCommand(eventSubscriber, userRepository, authenticationService);
    const createUserController = new CreateUserController(createUserCommand, eventSubscriber);

    const getUserCommand = new GetUserCommand(eventSubscriber, userRepository);
    const getUserController = new GetUserController(getUserCommand, eventSubscriber);

    const updateUserCommand = new UpdateUserCommand(eventSubscriber, userRepository);
    const updateUserController = new UpdateUserController(updateUserCommand, eventSubscriber);

    this.express.use('/', createUserController.express);
    this.express.use('/', getUserController.express);
    this.express.use('/', updateUserController.express);
  }
}

export default new UserController().express;