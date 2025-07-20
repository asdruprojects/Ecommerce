import { Request, Response } from 'express';
import { prismaClient } from '../server';
import { NotFoundException } from '../exceptions/custom-http.exception';
import { sendSuccessResponse } from '../utils/response.util'


export const getAvailableProducts = async (req: Request, res: Response) => {
    const { offset = 0, limit = 10 } = req.query;
    const skip = Number(offset);
    const take = Number(limit);
    const [products, total] = await Promise.all([
        prismaClient.product.findMany({
            where: { stock: { gt: 0 }, status: true },
            skip,
            take,
        }),
        prismaClient.product.count({ where: { stock: { gt: 0 }, status: true } }),
    ]);
    const page = take ? Math.floor(skip / take) + 1 : 1;
    const totalPages = take ? Math.ceil(total / take) : 1;
    return sendSuccessResponse(res, 200, products, 'Productos disponibles obtenidos correctamente', {
        total,
        offset: skip,
        limit: take,
        page,
        totalPages
    });
};

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await prismaClient.product.findUnique({ where: { id, status: true } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return sendSuccessResponse(res, 200, product, 'Producto obtenido correctamente');
};

export const getAllProducts = async (req: Request, res: Response) => {
    const { offset = 0, limit = 10 } = req.query;
    const skip = Number(offset);
    const take = Number(limit);
    const [products, total] = await Promise.all([
        prismaClient.product.findMany({ skip, take }),
        prismaClient.product.count()
    ]);
    const page = take ? Math.floor(skip / take) + 1 : 1;
    const totalPages = take ? Math.ceil(total / take) : 1;
    return sendSuccessResponse(res, 200, products, 'Todos los productos obtenidos correctamente', {
        total,
        offset: skip,
        limit: take,
        page,
        totalPages
    });
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, price, stock, description } = req.body;
    const product = await prismaClient.$transaction(async (t) => {
        const newProduct = await t.product.create({
            data: { name, price, stock, description },
        });
        return newProduct;
    });
    return sendSuccessResponse(res, 201, product, 'Producto creado exitosamente');
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const product = await prismaClient.$transaction(async (t) => {
        const existingProduct = await t.product.findUnique({ where: { id } });
        if (!existingProduct) throw new NotFoundException('Producto no encontrado');
        return t.product.update({
            where: { id },
            data,
        });
    });
    return sendSuccessResponse(res, 200, product, 'Producto actualizado exitosamente');
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await prismaClient.$transaction(async (t) => {
        const existingProduct = await t.product.findUnique({ where: { id, status: true } });
        if (!existingProduct) throw new NotFoundException('Producto no encontrado o ya inactivo');
        const updated = await t.product.update({
            where: { id },
            data: { status: false },
        });
        return updated;
    });

    return sendSuccessResponse(res, 200, product, 'Producto eliminado exitosamente');
};




