import { StatusCode } from "../../../utils/responses/http";
import { ApiError } from "../../../utils/responses/responses";
import IPasswordService from "../../../utils/security/password/IPasswordService";
import ITokenService from "../../../utils/security/token/IToken";
import IUserRepo from "../../domain/IUserRepo";
import { LoginCredentials, VerifiedCredentials } from "../../domain/UserDto";

export default class LoginUsecase {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService
  ) {}

  async execute(user: LoginCredentials) {
    try {
      const userExists = await this.userRepo.findByUsername(user.username);

      const validPassword = await this.passwordService.compare(
        user.password,
        userExists.password!
      );

      if (!validPassword) {
        const errorResponse: ApiError = {
          name: "Bad Request",
          status: StatusCode.BAD_REQUEST,
          message: "Wrong Password",
        };
        return Promise.reject(errorResponse);
      }
      const accessToken = await this.tokenService.generate(
        {
          id: userExists.id,
          username: userExists.username,
        },
        process.env.SECRET_KEY!
      );

      const refreshToken = await this.tokenService.generate(
        {
          id: userExists.id,
          username: userExists.username,
        },
        process.env.SECRET_REFRESH!
      );

      const verifiedUser: VerifiedCredentials = {
        ...userExists,
        password: undefined,
        accessToken,
        refreshToken,
      };

      return verifiedUser;
    } catch (error) {
      const errorResponse: ApiError = {
        name: "Bad Request",
        status: StatusCode.BAD_REQUEST,
        message: error as any,
      };

      return Promise.reject(errorResponse);
    }
  }
}
