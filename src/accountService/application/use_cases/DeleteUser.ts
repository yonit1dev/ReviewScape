import IUserRepo from "../../domain/IUserRepo";

export default class DeleteUsecase {
  constructor(private readonly userRepo: IUserRepo) {}
  async execute(id: number) {
    try {
      return await this.userRepo.delete(id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
