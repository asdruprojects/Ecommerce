import { Request, Response, NextFunction } from 'express';

export function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
    return function (req: Request, res: Response, next: NextFunction) {
        fn(req, res, next).catch(next); // Captura el error y lo pasa al siguiente middleware (error handler)
    };
}