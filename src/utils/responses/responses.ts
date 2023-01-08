import { StatusCode } from "./http";

type successResponse = {
  data: string | object | Array<object>;
  message: string;
};

type errorResponse = {
  error: object | Array<object>;
  message: string;
  code?: number;
};

export class ApiError extends Error {
  constructor(
    public readonly status: StatusCode,
    public readonly message: string
  ) {
    super();
  }
}

export { successResponse, errorResponse };
