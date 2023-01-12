import IUserRepo from "../../domain/IUserRepo";
import { UpdateDto } from "../../domain/UserDto";

export default class UpdateUsecase {
  constructor(private readonly userRepo: IUserRepo) {}

  async execute(id: number, updateObj: UpdateDto) {
    try {
      return await this.userRepo.update(id, updateObj);
    } catch (error) {
      Promise.reject(error);
    }
  }
}
