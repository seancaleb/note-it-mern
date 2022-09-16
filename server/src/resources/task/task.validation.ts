import Joi from 'joi';
import Task from '@/resources/task/task.interface';

const create = Joi.object<Task>({
    title: Joi.string().required(),
    status: Joi.string().valid('active', 'pending', 'completed').required(),
});

const update = Joi.object<Task>({
    title: Joi.string().required(),
    status: Joi.string().valid('active', 'pending', 'completed').required(),
});

export default { create, update };
