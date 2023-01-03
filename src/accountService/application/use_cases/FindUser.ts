import IUserRepo from "../../domain/IUserRepo";

export default class FindUsecase {
  constructor(private readonly userRepo: IUserRepo) {}

  public async execute(username: string) {
    return await this.userRepo.findByUsername(username);
  }
}
