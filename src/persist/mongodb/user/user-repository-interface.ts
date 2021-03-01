import User from "../../../dto/user/user";
import { UserInterface } from "./user-interface";

export interface UserRepositoryInterface {
  save(user: User): Promise<void | UserInterface>;
  retrieve(userId: string): Promise<UserInterface | null>
  delete(userId: string): Promise<void>
  update(userId: string, user: User): Promise<void | UserInterface>
}