export type UserRequired = {
  id: number;
  role: string | Array<string>;
};

export default interface ITokenService {
  generate(payload: UserRequired, secretKey: string): Promise<string>;
  validate(token: string, secretKey: string): Promise<boolean>;
  decode(token: string): Promise<UserRequired>;
}
