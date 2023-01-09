import { PrismaClient } from "@prisma/client";
import IUserRepo from "../../domain/IUserRepo";
import { ApiError } from "../../../utils/responses/responses";
import { RegisterCredentials, VerifiedCredentials } from "../../domain/UserDto";
import { StatusCode } from "../../../utils/responses/http";

export default class UserRepo implements IUserRepo {
  constructor(private readonly client: PrismaClient) {}

  public async findByEmail(email: string): Promise<VerifiedCredentials> {
    try {
      const user = await this.client.user.findUniqueOrThrow({
        where: {
          email,
        },
      });

      const foundUser: VerifiedCredentials = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        role: user.role,
      };

      return foundUser;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public async findByUsername(username: string): Promise<VerifiedCredentials> {
    try {
      const user = await this.client.user.findUniqueOrThrow({
        where: {
          username,
        },
      });

      const foundUser: VerifiedCredentials = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        password: user.password,
        role: user.role,
      };

      return foundUser;
    } catch (error) {
      const errorRes = new ApiError(StatusCode.BAD_REQUEST, "User not found!");

      return Promise.reject(errorRes);
    }
  }
  public async persist(
    user: RegisterCredentials
  ): Promise<VerifiedCredentials> {
    const userExists = await this.client.user.findUnique({
      where: { username: user.username },
    });

    if (userExists) {
      const errorResponse = new ApiError(
        StatusCode.BAD_REQUEST,
        "User already exists"
      );

      return Promise.reject(errorResponse);
    }

    const newUser = await this.client.user.create({
      data: { ...user, role: user.role as any },
    });

    const createdUser: VerifiedCredentials = {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
    };

    return createdUser;
  }
  public async update(username: string, updateObj: object): Promise<boolean> {
    try {
      await this.client.user.update({
        where: { username },
        data: updateObj,
      });

      return true;
    } catch (error) {
      const errorRes = new ApiError(StatusCode.BAD_REQUEST, "User not found!");

      return Promise.reject(errorRes);
    }
  }
  public async delete(username: string): Promise<boolean> {
    const deletedUser = await this.client.user.delete({
      where: {
        username,
      },
    });

    if (deletedUser) return true;

    const errorRes = new ApiError(StatusCode.BAD_REQUEST, "User not found!");

    return Promise.reject(errorRes);
  }
}
