import { Request, Response } from 'express';
import { prismaClient } from '../server';
import { sendSuccessResponse } from '../utils/response.util';
import { NotFoundException } from '../exceptions/custom-http.exception';
import { getUserIdToken } from '../utils/token.util';

// Crear pedido
export const createOrder = async (req: Request, res: Response) => {
    const { items } = req.body;
    const userId = getUserIdToken(req);
    const order = await prismaClient.$transaction(async (t) => {
        const order = await t.order.create({
            data: {
                userId,
                items: {
                    create: items.map(({ productId, quantity }: { productId: string; quantity: number }) => ({
                        productId,
                        quantity,
                    })),
                },
            },
            include: {
                items: {
                    select: {
                        quantity: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                price: true,
                            },
                        },
                    },
                },
            },
        });
        for (const item of items) {
            await t.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        decrement: item.quantity,
                    },
                },
            });
        }
        return order;
    });
    return sendSuccessResponse(res, 201, order, 'Pedido creado exitosamente');
};

// Listar pedidos del usuario autenticado (paginado)
export const getUserOrders = async (req: Request, res: Response) => {
    const { offset = 0, limit = 10 } = req.query;
    const userId = getUserIdToken(req);
    const skip = Number(offset);
    const take = Number(limit);
    const [orders, total] = await Promise.all([
        prismaClient.order.findMany({
            where: { userId },
            skip,
            take,
            orderBy: { createdAt: 'desc' },
            include: {
                items: {
                    select: {
                        quantity: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                price: true,
                            },
                        },
                    },
                },
            },
        }),
        prismaClient.order.count({ where: { userId } }),
    ]);
    const page = take ? Math.floor(skip / take) + 1 : 1;
    const totalPages = take ? Math.ceil(total / take) : 1;
    return sendSuccessResponse(res, 200, orders, 'Pedidos del usuario obtenidos correctamente', {
        total,
        offset: skip,
        limit: take,
        page,
        totalPages,
    });
};

// Obtener detalle de pedido
export const getUserOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = getUserIdToken(req);
    const order = await prismaClient.order.findFirst({
        where: { id, userId },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            },
            items: {
                select: {
                    quantity: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            price: true,
                        },
                    },
                },
            },
        },
    });
    if (!order) throw new NotFoundException('Pedido no encontrado');
    return sendSuccessResponse(res, 200, order, 'Pedido obtenido correctamente');
};
