import User from '@/resources/user/user.interface';
import { Types } from 'mongoose';

declare global {
    namespace Express {
        export interface Request {
            user: User & { _id: typeof Types.ObjectId };
        }
    }
}
