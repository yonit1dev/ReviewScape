import IUserRepo from "../../domain/IUserRepo";

export default class DeleteUsecase {
  constructor(private readonly userRepo: IUserRepo) {}

  async execute(username: string) {
    return await this.userRepo.delete(username);
  }
}
