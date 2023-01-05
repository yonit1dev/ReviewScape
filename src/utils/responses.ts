type successResponse = {
  data: string | object | Array<object>;
  message: string;
};

type errorResponse = {
  error: object | Array<object>;
  message: string;
  code?: number;
};

export { successResponse, errorResponse };
