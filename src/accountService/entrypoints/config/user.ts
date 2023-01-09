import { PrismaClient } from "@prisma/client";
import UserRepo from "../../infrastructure/repository/UserRepo";
import BcryptPasswordService from "../../../utils/security/password/BcryptPasswordService";
import JwtTokenService from "../../../utils/security/token/JwtToken";
import LoginUsecase from "../../application/use_cases/Login";
import RegisterUsecase from "../../application/use_cases/Signup";
import LoginController from "../../infrastructure/controllers/LoginController";
import SignUpController from "../../infrastructure/controllers/SignUpController";
import DeleteController from "../../infrastructure/controllers/DeleteController";
import DeleteUsecase from "../../application/use_cases/DeleteUser";
import UpdateUsecase from "../../application/use_cases/UpdateUser";
import ChangePasswordUsecase from "../../application/use_cases/ChangePassword";
import UpdateController from "../../infrastructure/controllers/UpdateController";

const prismaClient = new PrismaClient();
const passwordService = new BcryptPasswordService();
const tokenService = new JwtTokenService();

const userRepo = new UserRepo(prismaClient);

const loginService = new LoginUsecase(userRepo, passwordService, tokenService);
const registerService = new RegisterUsecase(
  userRepo,
  passwordService,
  tokenService
);
const updateService = new UpdateUsecase(userRepo);
const changePasswordService = new ChangePasswordUsecase(
  userRepo,
  passwordService
);
const deleteService = new DeleteUsecase(userRepo);

const loginController = new LoginController(loginService);
const registerController = new SignUpController(registerService);
const updateController = new UpdateController(
  updateService,
  changePasswordService
);
const deleteController = new DeleteController(deleteService);

export {
  loginController,
  registerController,
  updateController,
  deleteController,
};
