export type UserRequired = {
  id: number;
  username: string;
};

export default interface ITokenService {
  generate(
    payload: UserRequired,
    secretKey: string,
  ): Promise<string>;
  validate(token: string, secretKey: string): Promise<boolean>;
  decode(token: string): Promise<UserRequired>;
}
