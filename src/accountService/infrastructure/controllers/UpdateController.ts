import { HttpResponse, StatusCode } from "../../../utils/responses/http";
import ChangePasswordUsecase from "../../application/use_cases/ChangePassword";
import UpdateUsecase from "../../application/use_cases/UpdateUser";
import { UpdateCredentials } from "../../domain/UserDto";

export default class UpdateController {
  constructor(
    private readonly updateUsecase: UpdateUsecase,
    private readonly changePasswordUsecase: ChangePasswordUsecase
  ) {}
  async handleNormal(
    username: string,
    updateObj: UpdateCredentials
  ): Promise<HttpResponse> {
    try {
      console.log(typeof updateObj);
      const updated = await this.updateUsecase.execute(username, updateObj);

      if (!updated) {
        return {
          status: StatusCode.BAD_REQUEST,
          data: "Update Failed",
        };
      }

      return {
        status: StatusCode.NO_CONTENT,
        data: "Update Successful",
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

  async handlePassword(
    username: string,
    oldPassword: string,
    newPassword: string
  ): Promise<HttpResponse> {
    try {
      const changed = await this.changePasswordUsecase.execute(
        username,
        oldPassword,
        newPassword
      );

      if (!changed) {
        return {
          status: StatusCode.BAD_REQUEST,
          data: "Password Change Failed",
        };
      }

      return {
        status: StatusCode.NO_CONTENT,
        data: "Password Change Successful",
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
