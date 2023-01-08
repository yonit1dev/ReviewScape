export default interface IPasswordService {
  encrypt(password: string): Promise<string>;
  compare(plainPassword: string, encryptedPassword: string): Promise<boolean>;
}
