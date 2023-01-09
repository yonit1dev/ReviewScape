import { StatusCode } from "../../../utils/responses/http";
import { ApiError } from "../../../utils/responses/responses";
import IPasswordService from "../../../utils/security/password/IPasswordService";
import IUserRepo from "../../domain/IUserRepo";

export default class ChangePasswordUsecase {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly passwordService: IPasswordService
  ) {}

  async execute(username: string, oldPassword: string, newPassword: string) {
    try {
      const userExists = await this.userRepo.findByUsername(username);

      const validPassword = await this.passwordService.compare(
        oldPassword,
        userExists.password!
      );

      if (!validPassword) {
        const errorResponse: ApiError = {
          name: "Bad Request",
          status: StatusCode.BAD_REQUEST,
          message: "Wrong Password",
        };
        return Promise.reject(errorResponse);
      }

      const modifiedPassword = await this.passwordService.encrypt(newPassword);

      const updated = await this.userRepo.update(userExists.username, {
        password: modifiedPassword,
      });

      return updated;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
