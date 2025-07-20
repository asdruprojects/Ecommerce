import config from '../config/config';
import { Request } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { UnauthorizedException } from '../exceptions/custom-http.exception';


export const tokenSign = (user: any): string => {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
    };
    return jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRATION as jwt.SignOptions['expiresIn'],
    });
};

export const verifyToken = (token: string): JwtPayload | null => {
    try {
        const secret: Secret = config.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        return decoded as JwtPayload;
    } catch (error) {
        return null;
    }
};

export function getUserIdToken(req: Request): string {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new UnauthorizedException('Token no proporcionado');
    }
    const token = authHeader.split(' ').pop();
    if (!token) {
        throw new UnauthorizedException('Token inválido');
    }
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
        throw new UnauthorizedException('Token inválido');
    }
    return decoded.id;
}