import { UserRepositoryInterface } from "../../../src/persist/mongodb/user/user-repository-interface";
import { UserInterface } from "../../../src/persist/mongodb/user/user-interface";
import User from "../../../src/dto/user/user";

export class MockUserRepository implements UserRepositoryInterface {
  public async save(user: User): Promise<void | UserInterface> {
    

    if (user.getEmail() === "fail@fail.com") {
      return Promise.reject(`An error occurred while trying to save the user`);
    } else {
      return Promise.resolve();
    }
  }

  public async retrieve(userId: string): Promise<UserInterface | null> {

    if (userId === "CUSTOM_000000000000") {
      return Promise.reject(`The User ID does not exist`);
    }
    return null;
  }

  public async delete(userId: string): Promise<void> {
    const idExists = userId === "CUSTOM_000000000000";

    if (idExists === false) {
      return Promise.reject(`The User ID does not exist`);
    }

    return Promise.resolve();
  }

  /* eslint-disable */
  public async update(userId: string, user: User): Promise<void | UserInterface> {
    const idExists = userId === "CUSTOM_000000000000";

    if (idExists === false) {
      return Promise.reject(`The User ID does not exist`);
    }
    return Promise.resolve();
  }
}