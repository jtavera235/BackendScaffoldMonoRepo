import CreateUserRequest from "../../application/controllers/requests/create-user-request";
import UserBuilder from '../user-builder';
import User from '../../../dto/user';

class CreateUserCommand {

    public execute(request: CreateUserRequest): User {
      let builder = new UserBuilder();
      builder.withEmail(request.getEmail());
      builder.withName(request.getName());
      builder.withID('ABC');
      return builder.build();
    }
}

export default CreateUserCommand;