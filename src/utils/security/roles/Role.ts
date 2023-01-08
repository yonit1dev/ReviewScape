import { Request, Response, NextFunction } from "express";

export default class Role {
  public static checkRole(roles: Array<string>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const role = res.locals.roles;
    };
  }
}
