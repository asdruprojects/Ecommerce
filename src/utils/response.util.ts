import { Response } from 'express';

interface Meta {
    total?: number;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
}

export function sendSuccessResponse<T>(
    res: Response,
    status: number,
    data: T,
    message = 'Operación exitosa',
    meta?: Meta
) {
    return res.status(status).json({
        success: status >= 200 && status < 300,
        message,
        data,
        ...(meta && { meta }),
    });
}