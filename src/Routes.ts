import UserController from './user/application/controllers/user-controller';
import AbstractController from "./common/abstract-controller";

class Routes extends AbstractController {

    constructor() {
      super();
      this.routes();
    }

    private routes(): void {
      this.express.use('/users', UserController)
    }
}

export default new Routes().express;