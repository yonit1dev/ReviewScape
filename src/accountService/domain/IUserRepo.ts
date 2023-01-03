import { User, UserDto } from "./User";

export default interface IUserRepo {
  findById(id: number): Promise<User | UserDto>;
  findByUsername(username: string): Promise<User | UserDto>;
  persist(
    fullName: string,
    email: string,
    username: string,
    password: string,
    phone: string,
    role: string
  ): Promise<User | UserDto>;
  update(username: string, updateObj: object): Promise<boolean>;
  delete(username: string): Promise<boolean>;
}
