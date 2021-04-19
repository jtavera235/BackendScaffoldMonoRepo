
import EventEmitter from "events";
import * as faker from "faker";
import { StatusCodeEnum } from "../../src/common/enums/status-code-enums";
import { MockUserRepository } from "./mocks/mock-user-repository";
import AuthenticationService from "../../src/common/middleware/auth/authentication-service";
import { UserSuccessMockResponse } from "./mocks/mock-user-created-sucess-response";
import { UserFailedMockResponse } from "./mocks/mock-user-created-failed-response";

describe('Test creating new users', () => {

 /* it('Successfully creating a new user', async () => {
    const event = new EventEmitter();
    const command = new CreateUserCommand(event, new MockUserRepository(), new AuthenticationService());
    const createUserRequest = new CreateUserRequest(faker.name.findName(), faker.internet.email(), '1');
    let response!: UserCreatedResponseInterface;

    await command.execute(createUserRequest).then(() => {
      response = new UserSuccessMockResponse();
    }).catch(() => {
      response = new UserFailedMockResponse();
    });

    expect(response.status).toEqual(StatusCodeEnum.OK);
  })

  it('Failing to create a new user', async () => {
    const event = new EventEmitter();
    const command = new CreateUserCommand(event, new MockUserRepository(), new AuthenticationService());
    const createUserRequest = new CreateUserRequest(faker.name.findName(), "fail@fail.com", '1');
    let response!: UserCreatedResponseInterface;

    await command.execute(createUserRequest).then(() => {
      response = new UserSuccessMockResponse();
    }).catch(() => {
      response = new UserFailedMockResponse();
    });

    expect(response.status).toEqual(StatusCodeEnum.BAD_REQUEST);
  })
  */

})
