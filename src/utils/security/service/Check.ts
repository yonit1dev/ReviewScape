import { Request, Response, NextFunction } from "express";
import { HttpResponse, StatusCode } from "../../responses/http";
import { authorizeController } from "../../../accountService/entrypoints/config/authorize";

const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
  const { userInfo } = req.body;

  const result: HttpResponse = await authorizeController.handle({
    accessToken: req.headers.authorization ?? "",
    userInfo,
  });

  if (result.status != 200) {
    res.status(result.status).json(result.data);
    return;
  }
  res.locals.userId = userInfo.id;
  res.locals.role = userInfo.role;
  next();
};

const checkRole = () => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
    role: string
  ) => {
    const userRole = res.locals.role;

    if (userRole !== role) {
      const result: HttpResponse = {
        status: StatusCode.FORBIDDEN,
        data: "Forbidden to access this resource!",
      };

      res.status(result.status).json({ error: result.data });
      return;
    }
    next();
  };
};

export { checkJwt, checkRole };
