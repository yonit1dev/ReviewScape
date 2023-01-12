import { PrismaClient } from "@prisma/client";
import IUserRepo from "../../domain/IUserRepo";
import { ApiError } from "../../../utils/responses/responses";
import { RegisterDto, VerifiedCredentials } from "../../domain/UserDto";
import { StatusCode } from "../../../utils/responses/http";

export default class UserRepo implements IUserRepo {
  constructor(private readonly client: PrismaClient) {}

  public async findByEmail(email: string): Promise<boolean> {
    try {
      await this.client.user.findUniqueOrThrow({
        where: {
          email,
        },
      });

      return true;
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

      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        password: user.password,
        phone: user.phone,
        role: user.role,
      };
    } catch (error) {
      const errorRes = new ApiError(StatusCode.BAD_REQUEST, "User not found!");

      return Promise.reject(errorRes);
    }
  }
  public async persist(user: RegisterDto): Promise<VerifiedCredentials> {
    const userExists = await this.client.user.findUnique({
      where: { username: user.username },
    });

    if (userExists) {
      const errorResponse = new ApiError(
        StatusCode.BAD_REQUEST,
        "User already exists!"
      );

      return Promise.reject(errorResponse);
    }

    const newUser = await this.client.user.create({
      data: { ...user, role: user.role as any },
    });

    return {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      username: newUser.username,
      phone: newUser.phone,
      role: newUser.role,
    };
  }
  public async update(
    id: number,
    updateObj: object
  ): Promise<VerifiedCredentials> {
    try {
      const updatedUser = await this.client.user.update({
        where: { id },
        data: updateObj,
      });

      return {
        id: updatedUser.id,
        fullName: updatedUser.fullName,
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
      };
    } catch (error) {
      const errorRes = new ApiError(StatusCode.BAD_REQUEST, "User not found!");

      return Promise.reject(errorRes);
    }
  }
  public async delete(id: number): Promise<boolean> {
    try {
      await this.client.user.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      const errorRes = new ApiError(StatusCode.BAD_REQUEST, "User not found!");

      return Promise.reject(errorRes);
    }
  }
}
