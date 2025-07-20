import { check, body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { validateResult } from '../middlewares/validator.middleware';
import { prismaClient } from '../server';

export const validateCreateOrder = [
    check('items')
        .exists({ checkNull: true }).withMessage('Debes proporcionar los productos')
        .isArray({ min: 1 }).withMessage('El pedido debe contener al menos un producto'),
    body('items.*.productId')
        .exists().withMessage('El ID del producto es obligatorio')
        .isString().withMessage('El ID del producto debe ser una cadena'),
    body('items.*.quantity')
        .exists().withMessage('La cantidad es obligatoria')
        .isInt({ gt: 0 }).withMessage('La cantidad debe ser un entero mayor que 0'),
    body('items')
        .custom(async (items) => {
            if (!items || !Array.isArray(items)) throw new Error('La lista de items es obligatoria y debe ser un arreglo');
            const ids = items.map((item: any) => item.productId);
            const existingProducts = await prismaClient.product.findMany({
                where: { id: { in: ids }, status: true, stock: { gt: 0 } },
                select: { id: true, name: true, stock: true },
            });
            const existingIds = new Set(existingProducts.map(p => p.id));
            const notFound = ids.filter((id: string) => !existingIds.has(id));
            if (notFound.length > 0) throw new Error(`Los siguientes productos no existen o no tienen stock suficiente: ${notFound.join(', ')}`);
            const noStockProducts: string[] = [];
            for (const product of existingProducts) {
                const requestedQty = items.find((item: any) => item.productId === product.id)?.quantity ?? 0;
                if (requestedQty > product.stock) {
                    noStockProducts.push(`${product.name} (ID: ${product.id}) - solicitado: ${requestedQty}, disponible: ${product.stock}`);
                }
            }
            if (noStockProducts.length > 0) throw new Error(`Los siguientes productos no tienen stock suficiente: ${noStockProducts.join(', ')}`);
            return true;
        }),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    },
];
