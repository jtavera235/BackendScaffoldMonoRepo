import AbstractController from "../../../common/abstract-controller";
import CreateUserRequest from './requests/create-user-request';
import CreateUserCommand from '../../domain/command/create-user-command';

class CreateUserController extends AbstractController {

    private createUserCommand: CreateUserCommand;

    constructor() {
      super();
      this.createUserCommand = new CreateUserCommand();
      this.routes();
    }

    private routes(): void {
      this.express.post('/', (req, res, _) => {
        const request = new CreateUserRequest(req.body.name, req.body.email);
        const response = this.createUserCommand.execute(request);
        res.json(response);
      });
    }
}

export default new CreateUserController().express;