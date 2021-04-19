import User from '../../../dto/user/user';

class UserBuilder {

    private password = '';
    private email = '';


    public withPassword(password: string): void {
      this.password = password;
    }

    public withEmail(email: string): void {
      this.email = email;
    }

    public build(): User {
      return new User (
          this.email,
          this.password
      );
    }
}

export default UserBuilder;