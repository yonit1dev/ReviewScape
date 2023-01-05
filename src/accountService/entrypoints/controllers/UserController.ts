import { Request, Response, NextFunction } from "express";
import RegisterUsecase from "../../application/use_cases/CreateUser";
import FindUsecase from "../../application/use_cases/FindUser";
import { errorResponse, successResponse } from "../../../utils/responses";

export default class UserController {
  constructor(
    private readonly registerUsecase: RegisterUsecase,
    private readonly findUsecase: FindUsecase
  ) {}

  public async registerUser(req: Request, res: Response) {
    try {
      const { fullName, email, username, password, phone, role } = req.body;

      if (!(fullName && email && username && password && phone)) {
        const error: errorResponse = {
          error: ["Body invalid. Provide values for user parameter"],
          message: "Invalid Request",
        };
        return res.status(401).json(error);
      }

      await this.registerUsecase
        .execute(fullName, email, username, password, phone, role)
        .then((newUser) => {
          const success: successResponse = {
            message: "Created user successfully",
            data: newUser,
          };
          return res.status(201).json(success);
        })
        .catch((error) => {
          const err: errorResponse = {
            error,
            message: "Registration failed",
          };
          return res.status(400).json(err);
        });
    } catch (error) {
      const err: errorResponse = {
        error: error as any,
        message: "Registration failed",
      };
      return res.status(400).json(err);
    }
  }
  public async loginUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      await this.findUsecase
        .execute(username)
        .then((newUser) => {
          const success: successResponse = {
            message: "Found user successfully",
            data: newUser,
          };
          return res.status(200).json(success);
        })
        .catch((error) => {
          const err: errorResponse = {
            error,
            message: "Search failed",
          };
          return res.status(400).json(err);
        });
    } catch (error) {
      const err: errorResponse = {
        error: error as any,
        message: "Search failed",
      };
      return res.status(400).json(err);
    }
  }
}
