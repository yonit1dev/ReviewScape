import { StatusCode } from "../../../utils/responses/http";
import { ApiError } from "../../../utils/responses/responses";
import ITokenService from "../../../utils/security/token/IToken";
import { AuthCredentials } from "../../domain/UserDto";

export class AuthorizeService {
  constructor(private readonly tokenService: ITokenService) {}

  async execute({ accessToken, userInfo }: AuthCredentials) {
    const sanitizedToken = accessToken.replace("Bearer", "");

    const validToken = await this.tokenService.validate(
      sanitizedToken,
      process.env.SECRET_KEY!
    );

    if (!validToken) {
      const error: ApiError = {
        name: "Not Authroized Error",
        status: StatusCode.FORBIDDEN,
        message: "You don't have authorization for this request",
      };

      return error;
    }

    const user = await this.tokenService.decode(sanitizedToken);

    if (userInfo.id != undefined && userInfo.id != user.id) {
      const error: ApiError = {
        name: "Not Authroized Error",
        status: StatusCode.FORBIDDEN,
        message: "You don't have authorization for this request",
      };

      return error;
    }

    const authorizedUser: AuthCredentials = {
      accessToken,
      userInfo,
    };

    return authorizedUser;
  }
}

export class ReAuthorizationService {
  constructor(private readonly tokenService: ITokenService) {}

  async execute(refreshToken: string) {
    const sanitizedToken = refreshToken.replace("Bearer", "");

    const validToken = await this.tokenService.validate(
      sanitizedToken,
      process.env.SECRET_REFRESH!
    );

    if (!validToken) {
      const error: ApiError = {
        name: "Not Authroized Error",
        status: StatusCode.UNAUTHORIZED,
        message: "Invalid refresh token.",
      };

      return error;
    }

    const user = await this.tokenService.decode(sanitizedToken);

    const newAccessToken = await this.tokenService.generate(
      user,
      process.env.SECRET_KEY!
    );

    return newAccessToken;
  }
}
