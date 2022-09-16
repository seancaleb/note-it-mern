import Joi from 'joi';
import User from '@/resources/user/user.interface';

const register = Joi.object<User>({
    firstName: Joi.string().trim().lowercase().max(30).required(),
    lastName: Joi.string().trim().lowercase().max(30).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(6).required(),
});

const login = Joi.object<Pick<User, 'email' | 'password'>, true>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const update = Joi.object<User>({
    firstName: Joi.string().trim().lowercase().max(30).required(),
    lastName: Joi.string().trim().lowercase().max(30).required(),
    email: Joi.string().trim().email().required(),
});

const changeRole = Joi.object<Pick<User, 'role'>>({
    role: Joi.string().valid('user', 'admin').required(),
});

export default { register, login, changeRole, update };
