export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegisterCredentials = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  role?: string | Array<string>;
  isRoot?: boolean;
};

export type AuthCredentials = {
  accessToken: string;
  userInfo: { id: number; username: string };
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
  role?: string | Array<string>;
  accessToken?: string;
  refreshToken?: string;
};

export type SearchedUser = {
  fullName: string;
  username: string;
  reviews?: Array<object>;
  comments?: Array<object>;
};
