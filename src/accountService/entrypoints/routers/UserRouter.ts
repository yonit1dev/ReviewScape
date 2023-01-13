import { NextFunction, Request, Response, Router } from "express";
import { HttpResponse } from "../../../utils/responses/http";
import {
  deleteController,
  loginController,
  registerController,
  updateController,
} from "../config/user";
import {
  authorizeController,
  reAuthorizeController,
} from "../config/authorize";
import { UserValidator } from "../../../utils/validation/validators";
import { checkJwt, checkRole } from "../../../utils/security/service/Check";

export default class UserRouter {
  public static configRouter() {
    const router = Router();

    router.post(
      "/login",
      UserValidator.loginValidations,
      async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const result: HttpResponse = await loginController.handle({
          username,
          password,
        });

        res.status(result.status).json(result.data);
      }
    );

    router.post(
      "/register",
      UserValidator.loginValidations,
      async (req: Request, res: Response) => {
        const { fullName, email, username, password, phone, role } = req.body;
        const response: HttpResponse = await registerController.handle({
          fullName,
          email,
          username,
          password,
          phone,
          role,
        });

        res.status(response.status).json(response.data);
      }
    );

    router.get("/new-token", async (req: Request, res: Response) => {
      const response: HttpResponse = await reAuthorizeController.handle({
        refreshToken: req.headers.authorization ?? "",
      });

      res.status(response.status).json(response.data);
    });

    router.patch("/update", checkJwt, async (req: Request, res: Response) => {
      const { username, updateReq } = req.body;

      if ("oldPassword" in updateReq) {
        const response: HttpResponse = await updateController.handlePassword(
          username,
          updateReq.oldPassword,
          updateReq.newPassword
        );

        res.status(response.status).json(response.data);
      } else {
        const response: HttpResponse = await updateController.handleNormal(
          username,
          updateReq
        );
        res.status(response.status).json(response.data);
      }
    });

    router.delete(
      "/delete/:username",
      checkJwt,
      async (req: Request, res: Response) => {
        const id = Number(res.locals.id);

        const response: HttpResponse = await deleteController.handle(id);

        res.status(response.status).json(response.data);
      }
    );

    return router;
  }
}
