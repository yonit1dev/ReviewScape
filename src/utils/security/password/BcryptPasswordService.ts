import bcrypt from "bcrypt";
import IPasswordService from "./IPasswordService";

export default class BcryptPasswordService implements IPasswordService {
  private readonly saltRounds = 14;
  async encrypt(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);

    return await bcrypt.hash(password, salt);
  }
  async compare(
    plainPassword: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, encryptedPassword);
  }
}
