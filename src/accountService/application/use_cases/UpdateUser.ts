import IUserRepo from "../../domain/IUserRepo";
import { UpdateCredentials } from "../../domain/UserDto";

export default class UpdateUsecase {
  constructor(private readonly userRepo: IUserRepo) {}

  async execute(username: string, updateObj: UpdateCredentials) {
    try {
      const userExists = await this.userRepo.findByUsername(username);

      return await this.userRepo.update(userExists.username, updateObj);
    } catch (error) {
      Promise.reject(error);
    }
  }
}
