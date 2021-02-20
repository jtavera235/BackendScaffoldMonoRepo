import { RequestInterface } from "../../../../common/request-interface";

class CreateUserRequest implements RequestInterface {

    public name: string;
    public email: string;
    public requestId: string;

    constructor(name: string, email: string, requestId: string) {
        this.name = name;
        this.email = email;
        this.requestId = requestId;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getRequestId(): string {
        return this.requestId;
    }

}

export default CreateUserRequest;