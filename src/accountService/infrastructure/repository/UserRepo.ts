import { PrismaClient } from "@prisma/client";
import IUserRepo from "../../domain/IUserRepo";
import { User, UserDto } from "../../domain/User";
import { errorResponse } from "../../../utils/responses";

export default class UserRepo implements IUserRepo {
  constructor(private readonly client: PrismaClient) {}

  findById(id: number): Promise<User | UserDto> {
    throw new Error("Method not implemented.");
  }
  public async findByUsername(username: string): Promise<User | UserDto> {
    try {
      const user = await this.client.user.findUniqueOrThrow({
        where: {
          username,
        },
      });

      const foundUser: UserDto = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      return foundUser;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public async persist(
    fullName: string,
    email: string,
    username: string,
    password: string,
    phone: string,
    role: string
  ): Promise<User | UserDto> {
    const newUser = await this.client.user.create({
      data: {
        fullName,
        email,
        username,
        password,
        phone,
        role: role as any,
      },
    });

    return newUser;
  }
  update(username: string, updateObj: object): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(username: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
