
import EventEmitter from "events";
import CreateUserRequest from "../../src/user/application/controllers/requests/create-user-request";
import { UserCreatedEventEnums } from "../../src/user/domain/events/user-created-events-enums";
import * as faker from "faker";
import { UserCreatedSuccessEvent } from "../../src/user/domain/events/user-created-success-event";
import User from "../../src/dto/user/user";
import { UserCreatedFailedEvent } from "../../src/user/domain/events/user-created-failed-event";
import { UserCreatedResponseInterface } from "../../src/user/application/controllers/responses/user-created-response-interface";
import { StatusCodeEnum } from "../../src/common/enums/status-code-enums";

class CreateUserSuccessCommandMock {
  public constructor(private readonly event: EventEmitter) {}
  public async execute(req: CreateUserRequest): Promise<boolean> {
    return Promise.resolve(this.event.emit(UserCreatedEventEnums.SUCCESS, new UserCreatedSuccessEvent(new User(req.getEmail(), req.getName()))));
  }
}

class CreateUserSuccessMockResponse implements UserCreatedResponseInterface  {
  public status: StatusCodeEnum
  public constructor() { this.status = StatusCodeEnum.OK }

  public getStatus(): StatusCodeEnum {
    return this.status;
  }
}

class CreateUserFailedCommandMock {
  public constructor(private readonly event: EventEmitter) {}
  public async execute(_: CreateUserRequest): Promise<boolean> {
    return Promise.resolve(this.event.emit(UserCreatedEventEnums.FAILED, new UserCreatedFailedEvent("Error occurred while creating a new user.")));
  }
}

class CreateUserFiledMockResponse implements UserCreatedResponseInterface  {
  public status: StatusCodeEnum
  public constructor() { this.status = StatusCodeEnum.BAD_REQUEST }

  public getStatus(): StatusCodeEnum {
    return this.status;
  }
}


describe('Test creating new users', () => {

  it('Test successfully creating a new user', async () => {
    let event = new EventEmitter();
    let command = new CreateUserSuccessCommandMock(event);
    let createUserRequest = new CreateUserRequest(faker.name.findName(), faker.internet.email(), '1');
    let response!: UserCreatedResponseInterface;
  
    event.on(UserCreatedEventEnums.SUCCESS, () => {
      response = new CreateUserSuccessMockResponse();
    });
  
    await command.execute(createUserRequest);
  
    expect(response.status).toEqual(StatusCodeEnum.OK);
  })

  it('Test failing to create a new user', async () => {
    let event = new EventEmitter();
    let command = new CreateUserFailedCommandMock(event);
    let createUserRequest = new CreateUserRequest(faker.name.findName(), faker.internet.email(), '1');
    let response!: UserCreatedResponseInterface;
  
    event.on(UserCreatedEventEnums.FAILED, () => {
      response = new CreateUserFiledMockResponse();
    });
  
    await command.execute(createUserRequest);
  
    expect(response.status).toEqual(StatusCodeEnum.BAD_REQUEST);
  })

})
