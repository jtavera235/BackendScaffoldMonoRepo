import AbstractController from "../../../../common/abstract-controller";
import {useExpressServer} from "routing-controllers";
import GetUserController from "./subcontrollers/get-user-controller";
import UpdateUserController from "./subcontrollers/update-user-controller";
import Middleware from "../../../../common/middleware/middleware";

class UserController extends AbstractController {


  public constructor() {
    super();
    this.setRoutes();
  }

  private setRoutes(): void {

    useExpressServer(this.express, {
      // register created express server in routing-controllers
      controllers: [UpdateUserController, GetUserController],
      middlewares: [Middleware],// and configure it the way you need (controllers, validation, etc.)
    });
  }
}

export default new UserController().express;