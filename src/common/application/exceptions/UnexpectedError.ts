import ApiError from "./ApiError";

class UnexpectedError extends ApiError {
  constructor(message: string) {
    super(message, 500);
    this.name = 'Unexpected error';
  }
}
export default UnexpectedError
