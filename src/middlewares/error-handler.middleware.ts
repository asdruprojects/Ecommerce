import { Request, Response, NextFunction } from 'express';

export function errorHandlerMiddleware( err: any, req: Request, res: Response, next: NextFunction ) {
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || null;
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        ...(errors && { errors }),
    });
}