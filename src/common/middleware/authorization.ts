import * as express from 'express';
import { UserAuthRolesEnum } from '../enums/user-auth-roles-enum';
import UserRepository from '../../persist/mongodb/user/user-repository';

export default function permit(permittedRoles: UserAuthRolesEnum[]) {
  return async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    let repository = new UserRepository();
    let userId = request.params.userId;
    
    await repository.retrieve(userId).then((user) => {
      let role!: UserAuthRolesEnum;

      switch (user?.role) {
        case "owner":
          role = UserAuthRolesEnum.owner;
        case "other":
          role = UserAuthRolesEnum.other;
      }
  
      if (permittedRoles.includes(role)) {
        next();
      } else {
        response.status(403).json({message: "Forbidden"});
      }
    }).catch(err => {
      return response.status(404).json({message: "User does not exist"});
    })
  }
}