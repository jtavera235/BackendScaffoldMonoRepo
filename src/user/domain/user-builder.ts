import { UserAuthRolesEnum } from '../../common/enums/user-auth-roles-enum';
import User from '../../dto/user/user';

class UserBuilder {

    private name: string = '';
    private email: string = '';


    public withName(name: string): void {
      this.name = name;
    }

    public withEmail(email: string): void {
      this.email = email;
    }

    public build(): User {
      return new User (
          this.email,
          this.name
      );
    }
}

export default UserBuilder;