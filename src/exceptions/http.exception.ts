export class HttpException extends Error {
    public readonly statusCode: number;
    public readonly errors?: any;

    constructor(statusCode: number, message: string, errors?: any) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}