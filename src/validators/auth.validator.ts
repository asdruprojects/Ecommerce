import { check } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { validateResult } from '../middlewares/validator.middleware';

export const validateSignup = [
    check('email')
        .exists().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('Debe ser un correo electrónico válido'),
    check('password')
        .exists().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('name')
        .exists().withMessage('El nombre es obligatorio')
        .notEmpty().withMessage('El nombre no puede estar vacío'),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    },
];

export const validateLogin = [
    check('email')
        .exists().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('Debe ser un correo electrónico válido'),
    check('password')
        .exists().withMessage('La contraseña es obligatoria')
        .notEmpty().withMessage('La contraseña no puede estar vacía'),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    },
];

