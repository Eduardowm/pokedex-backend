import ApiError from "./ApiError";

class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'Bad request';
  }
}
export default BadRequestError
