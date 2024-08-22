import type { NextFunction, Request, Response } from "express";
import NotFoundError from "../exceptions/NotFoundError";

class NotFoundMiddleware {
  public static handle(req: Request, res: Response, next: NextFunction) {
    throw new NotFoundError('Invalid route or method.');
  }
}
export default NotFoundMiddleware
