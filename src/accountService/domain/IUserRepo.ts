import { RegisterDto, VerifiedCredentials } from "./UserDto";

export default interface IUserRepo {
  findByEmail(email: string): Promise<boolean>;
  findByUsername(username: string): Promise<VerifiedCredentials>;
  persist(user: RegisterDto): Promise<VerifiedCredentials>;
  update(id: number, updateObj: object): Promise<VerifiedCredentials>;
  delete(id: number): Promise<boolean>;
}
