import { HttpResponse, StatusCode } from "../../../utils/responses/http";
import { ApiError } from "../../../utils/responses/responses";
import { AuthorizeService } from "../security/AuthorizeService";
import { AuthorizeDto } from "../../domain/UserDto";

export default class AuthorizeController {
  constructor(private readonly authService: AuthorizeService) {}

  async handle({
    accessToken,
    userInfo,
  }: AuthorizeDto): Promise<HttpResponse> {
    try {
      if (!accessToken && !userInfo) {
        return {
          status: StatusCode.BAD_REQUEST,
          data: "No access token or user info provided",
        };
      }

      const sanitizedToken = accessToken!.replace("Bearer", "");

      const authorized = await this.authService.execute({
        accessToken: sanitizedToken,
        userInfo: userInfo,
      });

      if (authorized instanceof ApiError) {
        return {
          status: authorized.status,
          data: authorized.message,
        };
      } else {
        return {
          status: StatusCode.OK,
          data: authorized,
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
        data: error,
      };
    }
  }
}
