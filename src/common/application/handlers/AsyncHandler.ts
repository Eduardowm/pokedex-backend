import { type Request, type Response, type NextFunction } from "express";

class AsyncHandler {
    static handle(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
        return (req: Request, res: Response, next: NextFunction) => {
            fn(req, res, next).catch(next);
        };
    }
}

export default AsyncHandler;