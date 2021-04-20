import UserController from './core/user/application/controllers/user-controller';
import AbstractController from "./common/abstract-controller";
import AuthController from "./core/auth/application/controllers/auth-controller";

class Routes extends AbstractController {

    constructor() {
      super();
      this.routes();
    }

    private routes(): void {

      this.express.use("/auth", AuthController);
      this.express.use("/users", UserController);

    }

}

export default new Routes().express;

// juan, audi6900!