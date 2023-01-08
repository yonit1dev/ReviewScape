import { StatusCode } from "../../../utils/responses/http";
import { ApiError } from "../../../utils/responses/responses";
import IPasswordService from "../../../utils/security/password/IPasswordService";
import ITokenService from "../../../utils/security/token/IToken";
import IUserRepo from "../../domain/IUserRepo";
import { RegisterCredentials, VerifiedCredentials } from "../../domain/UserDto";

export default class RegisterUsecase {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService
  ) {}

  async execute(user: RegisterCredentials) {
    const hashedPassword = await this.passwordService.encrypt(user.password);

    const createdUser = await this.userRepo.persist({
      ...user,
      password: hashedPassword,
    });

    const accessToken = await this.tokenService.generate(
      {
        id: createdUser.id,
        username: createdUser.username,
      },
      process.env.SECRET_KEY!
    );

    const refreshToken = await this.tokenService.generate(
      {
        id: createdUser.id,
        username: createdUser.username,
      },
      process.env.SECRET_REFRESH!
    );

    const verifiedUser: VerifiedCredentials = {
      ...createdUser,
      password: undefined,
      accessToken,
      refreshToken,
    };

    return verifiedUser;
  }
}
