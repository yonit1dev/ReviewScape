import { StatusCode } from "../../../utils/responses/http";
import { ApiError } from "../../../utils/responses/responses";
import IPasswordService from "../../../utils/security/password/IPasswordService";
import ITokenService from "../../../utils/security/token/IToken";
import IUserRepo from "../../domain/IUserRepo";
import { LoginDto } from "../../domain/UserDto";

export default class LoginUsecase {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService
  ) {}

  async execute(user: LoginDto) {
    try {
      const userExists = await this.userRepo.findByUsername(user.username);

      const validPassword = await this.passwordService.compare(
        user.password,
        userExists.password!
      );

      if (!validPassword) {
        const errorResponse = new ApiError(
          StatusCode.BAD_REQUEST,
          "Wrong Password"
        );

        return Promise.reject(errorResponse);
      }
      const accessToken = await this.tokenService.generate(
        {
          id: userExists.id,
          role: userExists.role!,
        },
        process.env.SECRET_KEY!,
        "1h"
      );

      const refreshToken = await this.tokenService.generate(
        {
          id: userExists.id,
          role: userExists.role!,
        },
        process.env.SECRET_REFRESH!,
        "1d"
      );

      return {
        ...userExists,
        password: undefined,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
