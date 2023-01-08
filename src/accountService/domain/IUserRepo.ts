import { RegisterCredentials, VerifiedCredentials } from "./UserDto";

export default interface IUserRepo {
  findByEmail(email: string): Promise<VerifiedCredentials>;
  findByUsername(username: string): Promise<VerifiedCredentials>;
  persist(user: RegisterCredentials): Promise<VerifiedCredentials>;
  update(username: string, updateObj: object): Promise<boolean>;
  delete(username: string): Promise<boolean>;
}
