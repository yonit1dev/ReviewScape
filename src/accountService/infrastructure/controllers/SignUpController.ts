import RegisterUsecase from "../../application/use_cases/Signup";
import { RegisterDto } from "../../domain/UserDto";
import { HttpResponse, StatusCode } from "../../../utils/responses/http";

export default class SignUpController {
  constructor(private readonly registerUsecase: RegisterUsecase) {}

  async handle(data: RegisterDto): Promise<HttpResponse> {
    try {
      const userSigned = await this.registerUsecase.execute(data);

      return {
        status: StatusCode.CREATED,
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
        data: "Internal Server Error",
      };
    }
  }
}
