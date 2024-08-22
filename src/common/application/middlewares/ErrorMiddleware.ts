import type { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError";

class ErrorMiddleware {
  public static handle(error: Error, _: Request, res: Response, next: NextFunction) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        message: error.message,
        errors: error.errors,
        stack: process.env.NODE_ENV === 'production' ? undefined : error.stack?.split('\n').map((line) => line.trim()),
      });
    }

    return res.status(500).json({
      message: 'Internal server error.',
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack?.split('\n').map((line) => line.trim()),
    });
  }
}
export default ErrorMiddleware
