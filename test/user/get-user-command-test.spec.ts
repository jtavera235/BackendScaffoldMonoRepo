
import EventEmitter from "events";
import { UserCreatedResponseInterface } from "../../src/user/application/controllers/responses/user-created-response-interface";
import { StatusCodeEnum } from "../../src/common/enums/status-code-enums";
import { MockUserRepository } from "./mocks/mock-user-repository";
import { UserSuccessMockResponse } from "./mocks/mock-user-created-sucess-response";
import { UserFailedMockResponse } from "./mocks/mock-user-created-failed-response";
import GetUserCommand from "../../src/user/domain/command/get-user-command";
import GetUserRequest from "../../src/user/application/controllers/requests/get-user-request";
import { generateUserId } from "./generateUserId";

describe('Test retrieving users', () => {

  it('Successfully retrieve a user', async () => {
    const event = new EventEmitter();
    const command = new GetUserCommand(event, new MockUserRepository());
    const getUserRequest = new GetUserRequest('1', generateUserId());
    let response!: UserCreatedResponseInterface;

    await command.execute(getUserRequest).then(() => {
      response = new UserSuccessMockResponse();
    }).catch(() => {
      response = new UserFailedMockResponse();
    });

    expect(response.status).toEqual(StatusCodeEnum.OK);
  })

  it('Failing to retrieve a user', async () => {
    const event = new EventEmitter();
    const command = new GetUserCommand(event, new MockUserRepository());
    const getUserRequest = new GetUserRequest('1', 'CUSTOM_000000000000');
    let response!: UserCreatedResponseInterface;

    await command.execute(getUserRequest).then(() => {
      response = new UserSuccessMockResponse();
    }).catch(() => {
      response = new UserFailedMockResponse();
    });

    expect(response.status).toEqual(StatusCodeEnum.BAD_REQUEST);
  })

})
