import { NextFunction } from "express";
import { ApiError } from "../../responses/responses";
import { StatusCode } from "../../responses/http";

export default class Role {
  public static checkRole(roles: Array<string>) {
    return async (role: string, next: NextFunction) => {
      if (roles.indexOf(role) > -1) {
        next();
        return;
      } else {
        const error: ApiError = {
          name: "Unauthorized request",
          status: StatusCode.FORBIDDEN,
          message: "You don't have permission to access this resource!",
        };

        return error;
      }
    };
  }
}
