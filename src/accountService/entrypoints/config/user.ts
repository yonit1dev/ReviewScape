import { PrismaClient } from "@prisma/client";
import UserRepo from "../../infrastructure/repository/UserRepo";
import BcryptPasswordService from "../../../utils/security/password/BcryptPasswordService";
import JwtTokenService from "../../../utils/security/token/JwtToken";
import LoginUsecase from "../../application/use_cases/Login";
import RegisterUsecase from "../../application/use_cases/Signup";
import LoginController from "../../infrastructure/controllers/LoginController";
import SignUpController from "../../infrastructure/controllers/SignUpController";

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

const loginController = new LoginController(loginService);
const registerController = new SignUpController(registerService);

export { loginController, registerController };
