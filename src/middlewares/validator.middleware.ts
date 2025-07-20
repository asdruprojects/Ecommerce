import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestException } from '../exceptions/custom-http.exception';

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err: any) {
        const errors = err.array().map((e: any) => e.msg);
        next(new BadRequestException('Validación fallida', errors));
    }
};