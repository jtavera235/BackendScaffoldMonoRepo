import CreateUserController from './create-user-controllers';
import AbstractController from "../../../common/abstract-controller";

class UserController extends AbstractController {

    constructor() {
      super();
      this.routes();
    }

    private routes(): void {
      this.express.use('/create', CreateUserController);
    }
}

export default new UserController().express;