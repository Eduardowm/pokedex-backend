import ApiError from "./ApiError";

class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'Page not found';
  }
}
export default NotFoundError
