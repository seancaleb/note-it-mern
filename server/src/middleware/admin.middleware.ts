import HttpException from '@/utils/exceptions/http.exception';
import { Request, Response, NextFunction } from 'express';

export default async function adminMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    try {
        if (!req.user) return next(new HttpException(404, 'No logged in user'));

        const { user } = req;

        if (user.role !== 'admin')
            return next(new HttpException(401, 'Unauthorized action'));

        next();
    } catch (error) {
        next(new HttpException(401, 'Unauthorized'));
    }
}
