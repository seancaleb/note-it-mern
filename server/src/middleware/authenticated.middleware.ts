import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/token';
import UserModel from '@/resources/user/user.model';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';

export default async function authenticatedMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer '))
        return next(new HttpException(401, 'Unauthorized'));

    const accessToken = bearer.split(' ')[1].trim();

    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(
            accessToken
        );

        if (payload instanceof jwt.JsonWebTokenError)
            return next(new HttpException(401, 'Unauthorized'));

        const user = await UserModel.findById(payload.id)
            .select('-password')
            .exec();

        if (!user) return next(new HttpException(401, 'Unauthorized'));

        req.user = user;

        next();
    } catch (error) {
        next(new HttpException(401, 'Unauthorized'));
    }
}
