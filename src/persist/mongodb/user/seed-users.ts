import * as faker from "faker";
import { generateUserId } from "../../../../test/user/generateUserId";
import User from "../../../dto/user/user";
import UserRepository from "./user-repository";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

export async function seedUsers(): Promise<void> {
  dotenv.config();
  await mongoose.connect(process.env.USER_DB_URI as string, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to DB");
  }).catch((err) => {
    console.log(err);
    process.exit(1);
  })

  console.log("Starting seed script");
  for (let ii = 0; ii < 250; ii++) {
    console.log("Starting seed iteration ", ii + 1);
    const userRepo = new UserRepository();
    const user = new User(faker.internet.exampleEmail(), faker.name.findName(), generateUserId());
    await userRepo.save(user).then(() => {
      console.log("Successfully created user ", ii);
    }).catch(err => {
      console.log(err);
    });
  }
  console.log("Finished seed script");
  process.exit();
}
seedUsers();