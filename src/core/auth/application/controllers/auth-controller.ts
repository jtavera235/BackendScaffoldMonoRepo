import AbstractController from "../../../../common/abstract-controller";
import LoginController from "./subcontrollers/login-controller";
import SignupController from "./subcontrollers/signup-controller";
import {useExpressServer} from "routing-controllers";

class AuthController extends AbstractController {

  constructor() {
    super();
    this.routes();
  }

  private routes(): void {

    useExpressServer(this.express, {
      // register created express server in routing-controllers
      controllers: [LoginController, SignupController], // and configure it the way you need (controllers, validation, etc.)
    });
  }
}

export default new AuthController().express;