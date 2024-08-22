import { ValidationError } from "./UnprocessableError";

type ErrorsType = ValidationError[] | undefined;

class ApiError extends Error {
  public statusCode: number;
  public errors: ErrorsType;

  constructor(message: string, statusCode?: number, errors?: ErrorsType) {
    super(message);
    this.statusCode = statusCode ?? 500;
    this.errors = errors;
  }
}
export default ApiError
