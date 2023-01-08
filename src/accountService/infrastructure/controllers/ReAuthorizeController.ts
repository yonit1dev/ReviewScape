import { HttpResponse, StatusCode } from "../../../utils/responses/http";
import { ApiError } from "../../../utils/responses/responses";
import { ReAuthorizeRequest } from "../../domain/UserDto";
import { ReAuthorizationService } from "../security/Authorization";

export default class ReAuthorizeController {
  constructor(private readonly reAuthorizeService: ReAuthorizationService) {}
  async handle({ refreshToken }: ReAuthorizeRequest): Promise<HttpResponse> {
    try {
      if (!refreshToken) {
        return {
          status: StatusCode.BAD_REQUEST,
          data: "No refresh token provided!",
        };
      }

      const accessToken = await this.reAuthorizeService.execute(refreshToken);

      if (accessToken instanceof ApiError) {
        return {
          status: accessToken.status,
          data: accessToken.message,
        };
      } else {
        return {
          status: StatusCode.OK,
          data: accessToken,
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          status: 403,
          data: error.message,
        };
      }
      return {
        status: StatusCode.SERVER_ERROR,
        data: "Server erorr",
      };
    }
  }
}
