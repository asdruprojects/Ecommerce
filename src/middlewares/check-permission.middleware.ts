import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../server';
import { ForbiddenException, NotFoundException } from '../exceptions/custom-http.exception';
import { getUserIdToken } from '../utils/token.util';

export const checkPermissionAuth = (requiredPermission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = getUserIdToken(req);
            const user = await prismaClient.user.findUnique({
                where: { id: userId },
                include: {
                    role: {
                        include: {
                            permissions: {
                                include: { permission: true }
                            }
                        }
                    }
                }
            });
            if (!user) throw new NotFoundException('El usuario asociado al token no existe');
            const userPermissions = user.role.permissions.map(rp => rp.permission.key);
            if (!userPermissions.includes(requiredPermission)) throw new ForbiddenException('El usuario no tiene permiso para acceder a este recurso');
            next();
        } catch (error) {
            next(error);
        }
    };
};