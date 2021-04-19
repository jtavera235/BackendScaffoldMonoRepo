import User from "../../../dto/user/user";

export interface UserRepositoryInterface {
  save(user: User): Promise<User | null>;
  retrieve(userId: string): Promise<User | null>
  delete(userId: string): Promise<void>
  update(userId: string, user: User): Promise<User | null>
  login(email: string): Promise<User | null>
}