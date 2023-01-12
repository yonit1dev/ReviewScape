import jwt from "jsonwebtoken";
import ITokenService, { UserRequired } from "./IToken";

export default class JwtTokenService implements ITokenService {
  async generate(
    payload: string | object,
    secretKey: string,
    expiresIn: string
  ): Promise<string> {
    return jwt.sign(payload, secretKey, {
      expiresIn,
    });
  }
  async validate(token: string, secretKey: string): Promise<boolean> {
    return !!jwt.verify(token, secretKey);
  }
  async decode(token: string): Promise<UserRequired> {
    return (jwt.decode(token) as any) ?? {};
  }
}
