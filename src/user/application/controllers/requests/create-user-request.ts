import { UserAuthRolesEnum } from "../../../../common/enums/user-auth-roles-enum";
import { RequestInterface } from "../../../../common/request-interface";
import User from "../../../../dto/user/user";

class CreateUserRequest implements RequestInterface {

    public name: string;
    public email: string;
    public requestId: string;
    private role: UserAuthRolesEnum;

    constructor(name: string, email: string, requestId: string, role: UserAuthRolesEnum) {
        this.name = name;
        this.email = email;
        this.requestId = requestId;
        this.role = role;
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

    public getRole(): UserAuthRolesEnum {
        return this.role;
    }

}

export default CreateUserRequest;