import { check } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { validateResult } from '../middlewares/validator.middleware';

export const validateCreateProduct = [
    check('name')
        .exists().withMessage('El nombre es obligatorio')
        .notEmpty().withMessage('El nombre no puede estar vacío'),
    check('price')
        .exists().withMessage('El precio es obligatorio')
        .isFloat({ gt: 0 }).withMessage('El precio debe ser mayor que 0'),
    check('stock')
        .exists().withMessage('El stock es obligatorio')
        .isInt({ min: 0 }).withMessage('El stock debe ser un entero mayor o igual a 0'),
    check('description')
        .optional()
        .isString().withMessage('La descripción debe ser texto'),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    },
];

export const validateUpdateProduct = [
    check('name')
        .optional()
        .notEmpty().withMessage('El nombre no puede estar vacío'),
    check('price')
        .optional()
        .isFloat({ gt: 0 }).withMessage('El precio debe ser mayor que 0'),
    check('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('El stock debe ser un entero mayor o igual a 0'),
    check('description')
        .optional()
        .isString().withMessage('La descripción debe ser texto'),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    },
];