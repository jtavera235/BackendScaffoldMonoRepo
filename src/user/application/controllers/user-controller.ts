import CreateUserController from './subcontrollers/create-user-controllers';
import AbstractController from "../../../common/abstract-controller";
import GetUserController from './subcontrollers/get-user-controller';
import UpdateUserController from './subcontrollers/update-user-controller';

class UserController extends AbstractController {

  constructor() {
    super();
    this.routes();
  }

  private routes(): void {
    this.express.use('/', CreateUserController);
    this.express.use('/', GetUserController);
    this.express.use('/', UpdateUserController)
  }
}

export default new UserController().express;