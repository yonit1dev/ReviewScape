import { StatusCode } from "../../../utils/responses/http";
import { ApiError } from "../../../utils/responses/responses";
import ITokenService from "../../../utils/security/token/IToken";
import { AuthorizeDto } from "../../domain/UserDto";

export class AuthorizeService {
  constructor(private readonly tokenService: ITokenService) {}

  async execute({ accessToken, userInfo }: AuthorizeDto) {
    const sanitizedToken = accessToken.replace("Bearer", "");

    const validToken = await this.tokenService.validate(
      sanitizedToken,
      process.env.SECRET_KEY!
    );

    if (!validToken) {
      const error = new ApiError(
        StatusCode.FORBIDDEN,
        "You don't have authorization for this request"
      );
      return error;
    }

    const user = await this.tokenService.decode(sanitizedToken);

    if (userInfo.id != undefined && userInfo.id != user.id) {
      const error = new ApiError(
        StatusCode.FORBIDDEN,
        "You don't have authorization for this request"
      );

      return error;
    }

    const authorizedUser: AuthorizeDto = {
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
      const error = new ApiError(
        StatusCode.UNAUTHORIZED,
        "Invalid refresh token."
      );
      return error;
    }

    const user = await this.tokenService.decode(sanitizedToken);

    const newAccessToken = await this.tokenService.generate(
      user,
      process.env.SECRET_KEY!,
      "1h"
    );

    return newAccessToken;
  }
}
