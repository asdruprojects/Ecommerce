import { Request, Response } from 'express';
import { prismaClient } from '../server'; 
import { encrypt, compare } from '../utils/hash.util';
import { BadRequestException, NotFoundException, UnauthorizedException } from '../exceptions/custom-http.exception';
import { sendSuccessResponse } from '../utils/response.util'
import { tokenSign, verifyToken } from '../utils/token.util';

export const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const customerRole = await prismaClient.role.findUnique({
        where: { name: 'customer' },
    });
    if (!customerRole) throw new NotFoundException('Rol "customer" no encontrado');
    const existingUser = await prismaClient.user.findUnique({ where: { email }, });
    if (existingUser) throw new BadRequestException('El correo ya está registrado');
    const hashedPassword = await encrypt(password);
    const user = await prismaClient.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            roleId: customerRole.id,
        },
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            role: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return sendSuccessResponse(res, 201, user, 'Usuario creado exitosamente');
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const data = await prismaClient.user.findUnique({
        where: { email },
        include: {
            role: {
                include: {
                    permissions: {
                        include: {
                            permission: true,
                        },
                    },
                },
            },
        },
    });
    if (!data) throw new UnauthorizedException('Credenciales inválidas');
    const checkPassword = await compare(password, data.password);
    if (!checkPassword) throw new UnauthorizedException('Credenciales inválidas');
    const permisosPlanos = data.role.permissions.map(p => p.permission);
    const user = { // Limpiamos la respuesta
        id: data.id,
        email: data.email,
        name: data.name,
        role: {
            id: data.role.id,
            name: data.role.name,
            permissions: permisosPlanos.map(p => ({
                id: p.id,
                name: p.name,
                key: p.key,
            })),
        },
    };
    const token = tokenSign(user);
    return sendSuccessResponse(res, 200, { token, user }, 'Login exitoso');
};

export const refreshAccessToken = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('Token no proporcionado');
    const refreshToken = authHeader.split(' ').pop();
    if (!refreshToken) throw new UnauthorizedException('Token inválido');
    const decoded = verifyToken(refreshToken);
    if (!decoded || !decoded.id) throw new UnauthorizedException('Token inválido');
    const user = await prismaClient.user.findUnique({
        where: { id: decoded.id },
    })
    if (!user) throw new NotFoundException('El usuario asociado al token no fue encontrado');
    const token = tokenSign(user);
    return sendSuccessResponse(res, 200, { token }, 'Sesión renovada exitosamente');
};