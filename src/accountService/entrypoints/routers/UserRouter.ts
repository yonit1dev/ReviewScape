import { Request, Response, Router } from "express";
import FindUsecase from "../../application/use_cases/FindUser";
import RegisterUsecase from "../../application/use_cases/CreateUser";
import IUserRepo from "../../domain/IUserRepo";
import UserController from "../controllers/UserController";

export default class UserRouter {
  public static configRouter(userRepo: IUserRepo): Router {
    const router = Router();

    const controller = UserRouter.configController(userRepo);

    router.get("/users", (req: Request, res: Response) => {
      controller.loginUser(req, res);
    });

    router.post("/users", (req: Request, res: Response) => {
      controller.registerUser(req, res);
    });

    return router;
  }
  private static configController(authRepo: IUserRepo): UserController {
    const registerUsecase = new RegisterUsecase(authRepo);
    const findUsecase = new FindUsecase(authRepo);

    return new UserController(registerUsecase, findUsecase);
  }
}
