export type ApiErrorObject = {
  status: number;
  title: string;
  detail: string;
  path: string;
};

export type ApiError = {
  errors: ApiErrorObject[];
};
