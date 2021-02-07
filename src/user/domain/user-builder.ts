import User from '../../dto/user';

class UserBuilder {

    private name: string = '';
    private id: string = '';
    private email: string = '';


    public withName(name: string): void {
      this.name = name;
    }

    public withEmail(email: string): void {
      this.email = email;
    }

    public withID(id: string): void {
      this.id = id;
    }

    public build(): User {
      return new User (
          this.email,
          this.name,
          this.id
      );
    }
}

export default UserBuilder;