import IPasswordService from "../../../utils/security/password/IPasswordService";
import ITokenService from "../../../utils/security/token/IToken";
import IUserRepo from "../../domain/IUserRepo";
import { RegisterDto } from "../../domain/UserDto";

export default class RegisterUsecase {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService
  ) {}

  async execute(user: RegisterDto) {
    try {
      const hashedPassword = await this.passwordService.encrypt(user.password);

      const createdUser = await this.userRepo.persist({
        ...user,
        password: hashedPassword,
      });

      const accessToken = await this.tokenService.generate(
        {
          id: createdUser.id,
          role: createdUser.role!,
        },
        process.env.SECRET_KEY!,
        "1h"
      );

      const refreshToken = await this.tokenService.generate(
        {
          id: createdUser.id,
          role: createdUser.role!,
        },
        process.env.SECRET_REFRESH!,
        "1d"
      );

      return {
        ...createdUser,
        password: undefined,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
