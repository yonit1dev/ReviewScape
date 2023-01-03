import IUserRepo from "../../domain/IUserRepo";

export default class RegisterUsecase {
  constructor(private readonly userRepo: IUserRepo) {}

  public async execute(
    fullName: string,
    email: string,
    username: string,
    password: string,
    phone: string,
    role: string
  ) {
    return await this.userRepo.persist(
      fullName,
      email,
      username,
      password,
      phone,
      role
    );
  }
}
