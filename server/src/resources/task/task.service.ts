import TaskModel from '@/resources/task/task.model';
import UserModel from '@/resources/user/user.model';
import Task, { TaskDocument } from '@/resources/task/task.interface';

export default class TaskService {
    /**
     * CREATE TASK
     */
    public async create({
        title,
        createdBy,
        status,
    }: Task): Promise<TaskDocument> {
        try {
            const task = await TaskModel.create({
                title,
                createdBy,
                status,
            });

            return task;
        } catch (error) {
            throw new Error('Unable to create task');
        }
    }

    /**
     * GET TASK
     */
    public async get(id: string): Promise<TaskDocument> {
        try {
            const task = await TaskModel.findById(id);
            const user = await UserModel.findById(task?.createdBy);

            if (!task) throw new Error(`Task with id ${id} doesn't exist`);

            if (!user) {
                await TaskModel.findByIdAndDelete(id);
                throw new Error(`User has been deleted`);
            }

            return task;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    /**
     * GET ALL TASKS OF LOGGED IN USER
     */
    public async getAll({
        createdBy,
    }: Pick<Task, 'createdBy'>): Promise<TaskDocument[]> {
        try {
            const tasks = await TaskModel.find({ createdBy });

            return tasks;
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * GET ALL TASKS OF ALL USERS
     */
    public async getAllUsers(): Promise<TaskDocument[]> {
        try {
            const tasks = await TaskModel.find({});

            return tasks;
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * UPDATE TASK
     */
    public async update(
        id: string,
        { title, createdBy, status }: Task
    ): Promise<TaskDocument> {
        try {
            const task = await TaskModel.findByIdAndUpdate(
                id,
                {
                    title,
                    createdBy,
                    status,
                },
                { runValidators: true, new: true }
            );

            if (!task) throw new Error(`Task with id ${id} doesn't exist`);

            return task;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    /**
     * DELETE TASK
     */
    public async delete(id: string): Promise<TaskDocument> {
        try {
            const task = await TaskModel.findByIdAndDelete(id);

            if (!task) throw new Error(`Task with id ${id} doesn't exist`);

            return task;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    /**
     * DELETE TASKS BY ID
     */
    public async deleteById(ids: string[]) {
        try {
            const deleted = await TaskModel.deleteMany({ _id: { $in: ids } });

            return deleted;
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * DELETE ALL TASKS OF ALL USERS
     */
    public async deleteAll() {
        try {
            const tasks = await TaskModel.deleteMany({});

            return tasks;
        } catch (error) {
            throw new Error();
        }
    }
}
