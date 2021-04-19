import AbstractController from "../../../../common/abstract-controller";
import {UserRepositoryInterface} from "../../../../persist/mongodb/user/user-repository-interface";
import UserRepository from "../../../../persist/mongodb/user/user-repository";
import AuthenticationService from "../../../../common/middleware/auth/authentication-service";
import EventEmitter from "events";
import LoginCommand from "../../domain/command/login-command";
import LoginController from "./subcontrollers/login-controller";
import SignupCommand from "../../domain/command/signup-command";
import SignupController from "./subcontrollers/signup-controller";


class AuthController extends AbstractController {

  constructor() {
    super();
    this.routes();
  }

  private routes(): void {
    const userRepository: UserRepositoryInterface = new UserRepository();
    const authenticationService = new AuthenticationService();
    const eventSubscriber = new EventEmitter();

    const loginCommand = new LoginCommand(eventSubscriber, userRepository, authenticationService);
    const loginController = new LoginController(eventSubscriber, loginCommand);

    const signupCommand = new SignupCommand(eventSubscriber, userRepository, authenticationService);
    const signupController = new SignupController(eventSubscriber, signupCommand);

    this.express.use('/', signupController.express);
    this.express.use('/', loginController.express);
  }
}

export default new AuthController().express;