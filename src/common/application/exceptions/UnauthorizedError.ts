import ApiError from "./ApiError";

class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
    this.name = 'Unauthorized';
  }
}
export default UnauthorizedError
