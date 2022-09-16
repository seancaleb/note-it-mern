import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';

/**
 *      Status Codes
 *      ---------------------------
 *      OK = 200
 *      NO_CONTENT = 204
 *      BAD_REQUEST = 400
 *      UNAUTHORIZED = 401
 *      NOT_FOUND = 404
 *      INTERNAL_SERVER_ERROR = 500
 */

export default function errorMiddleware(
    error: HttpException,
    _req: Request,
    res: Response,
    next: NextFunction
): void {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    res.status(status).json({ status, message });
}

export function defaultErrorFallback(
    _req: Request,
    res: Response,
    next: NextFunction
): void {
    const message = "Route doesn't exist";

    res.status(500).json({ message });
}
