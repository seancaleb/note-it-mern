import { Document } from 'mongoose';

export default interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

export interface ExtendedUser extends User {
    isValidPassword(password: string): Promise<Error | boolean>;
}

export type UserDocument = ExtendedUser & Document;
export type Role = 'user' | 'admin';
