import jwt from 'jsonwebtoken';
import { UserDocument } from '@/resources/user/user.interface';
import Token from '@/utils/interfaces/token.interface';

export const createToken = (user: UserDocument): string => {
    const { firstName, lastName, email, role, password } = user;

    const slicedPassword = password.slice(0, 16);

    const userObj = {
        firstName,
        lastName,
        email,
        role,
        password: slicedPassword,
    };

    return jwt.sign(
        { id: user._id, ...userObj },
        process.env.JWT_SECRET as jwt.Secret,
        {
            expiresIn: '1d',
        }
    );
};

export const verifyToken = async (
    token: string
): Promise<jwt.VerifyErrors | Token> =>
    new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => (err ? reject(err) : resolve(payload as Token))
        );
    });

export default { createToken, verifyToken };
