export type LoginDto = {
  username: string;
  password: string;
};

export type RegisterDto = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  role?: string;
  isRoot?: boolean;
};

export type UpdateDto = {
  fullName?: string;
  email?: string;
  phone?: string;
};

export type AuthorizeDto = {
  accessToken: string;
  userInfo: { id: number; role: string };
};

export type ReAuthorizeRequest = {
  refreshToken: string;
};

export type VerifiedCredentials = {
  id: number;
  fullName: string;
  email: string;
  username: string;
  password?: string;
  phone: string;
  role?: string | Array<string>;
  accessToken?: string;
  refreshToken?: string;
};
