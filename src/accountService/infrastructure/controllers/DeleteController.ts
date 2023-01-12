import { HttpResponse, StatusCode } from "../../../utils/responses/http";
import DeleteUsecase from "../../application/use_cases/DeleteUser";

export default class DeleteController {
  constructor(private readonly deleteUsecase: DeleteUsecase) {}

  async handle(id: number): Promise<HttpResponse> {
    try {
      const userDeleted = await this.deleteUsecase.execute(id);

      if (userDeleted) {
        return {
          status: StatusCode.NO_CONTENT,
          data: "Account deleted!",
        };
      } else {
        return {
          status: StatusCode.SERVER_ERROR,
          data: "Failed to delete account!",
        };
      }
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
