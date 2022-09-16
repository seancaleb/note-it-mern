export type Role = 'user' | 'admin';

export type Password = {
    password: string;
};

export interface Token {
    token: string | null;
}

export type NonNullableToken = {
    token: NonNullable<Token['token']>;
};

export default interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}

export type UserPartial = Partial<User>;

export type RegisterUser = Pick<User, 'firstName' | 'lastName' | 'email'> &
    Password;

export type LoginUser = Pick<User, 'email'> & Password;

export type UpdateUser = Pick<User, 'firstName' | 'lastName' | 'email'>;
