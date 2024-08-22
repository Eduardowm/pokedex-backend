import ApiError from "./ApiError";

export interface ValidationError {
  field: string;
  message: string;
}

class UnprocessableError extends ApiError {
  constructor(message: string, errors: ValidationError[]) {
    super(message, 422);
    this.name = 'Unprocessable entity';
    this.errors = errors;
  }
}
export default UnprocessableError
