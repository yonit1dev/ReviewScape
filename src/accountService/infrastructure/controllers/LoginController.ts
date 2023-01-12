import { LoginDto } from "../../domain/UserDto";
import { HttpResponse, StatusCode } from "../../../utils/responses/http";
import LoginUsecase from "../../application/use_cases/Login";

export default class LoginController {
  constructor(private readonly loginUsecase: LoginUsecase) {}

  async handle(data: LoginDto): Promise<HttpResponse> {
    try {
      const userSigned = await this.loginUsecase.execute(data);

      return {
        status: StatusCode.OK,
        data: userSigned,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          status: 401,
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
