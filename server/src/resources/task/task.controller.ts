import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import Task from '@/resources/task/task.interface';
import validate from '@/resources/task/task.validation';
import TaskService from '@/resources/task/task.service';
import authenticated from '@/middleware/authenticated.middleware';
import admin from '@/middleware/admin.middleware';

export default class TaskController implements Controller {
    public path = '/task';
    public router = Router();
    private TaskService = new TaskService();

    constructor() {
        this.initializeRoutes();
    }

    /**
     * Assign all controllers to their respective routes
     */
    private initializeRoutes(): void {
        this.router.get(`${this.path}/:id`, authenticated, this.get);
        this.router.get(`${this.path}`, authenticated, this.getAll);
        this.router.get(
            `${this.path}/users/all`,
            authenticated,
            admin,
            this.getAllUsers
        );

        this.router.post(
            `${this.path}`,
            authenticated,
            validationMiddleware(validate.create),
            this.create
        );

        this.router.patch(
            `${this.path}/:id`,
            authenticated,
            validationMiddleware(validate.update),
            this.update
        );

        this.router.delete(`${this.path}/:id`, authenticated, this.delete);
        this.router.delete(`${this.path}`, authenticated, this.deleteByIds);
        this.router.delete(
            `${this.path}/users/all`,
            authenticated,
            admin,
            this.deleteAllUserTasks
        );
    }

    /**
     * CREATE TASK
     */
    private create = async (
        req: Request<{}, {}, Omit<Task, 'createdBy'>>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, status } = req.body;
            const { user } = req;

            const task = await this.TaskService.create({
                title,
                createdBy: user._id,
                status,
            });

            res.status(201).json({ task });
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    };

    /**
     * GET TASK
     */
    private get = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const task = await this.TaskService.get(id);

            res.status(200).json({ task });
        } catch (error) {
            next(new HttpException(404, (error as Error).message));
        }
    };

    /**
     * GET ALL TASKS OF LOGGED IN USER
     */
    private getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { user } = req;
            const tasks = await this.TaskService.getAll({
                createdBy: user._id,
            });

            res.status(200).json({ tasks, count: tasks.length });
        } catch (error) {
            next(new HttpException(404, ''));
        }
    };

    /**
     * GET ALL TASKS OF ALL USERS
     */
    private getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const tasks = await this.TaskService.getAllUsers();

            res.status(200).json({ tasks, count: tasks.length });
        } catch (error) {
            next(new HttpException(404, ''));
        }
    };

    /**
     * UPDATE TASK
     */
    private update = async (
        req: Request<{ id: string }, {}, Omit<Task, 'createdBy'>>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const { user } = req;
            const { title, status } = req.body;

            const task = await this.TaskService.update(id, {
                title,
                createdBy: user._id,
                status,
            });

            res.status(200).json({ task });
        } catch (error) {
            next(new HttpException(404, (error as Error).message));
        }
    };

    /**
     * DELETE TASK
     */
    private delete = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            const task = await this.TaskService.delete(id);

            res.status(200).json({ task });
        } catch (error) {
            next(new HttpException(404, (error as Error).message));
        }
    };

    /**
     * DELETE MULTIPLE TASKS BY IDS
     */
    private deleteByIds = async (
        req: Request<{}, {}, { ids: string[] }>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { ids } = req.body;

            const deleteResult = await this.TaskService.deleteById(ids);

            res.status(200).json({ deleteResult });
        } catch (error) {
            next(new HttpException(404, (error as Error).message));
        }
    };

    /**
     * DELETE ALL TASKS OF ALL USERS
     */
    private deleteAllUserTasks = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { user } = req;
            const deleteResult = await this.TaskService.deleteAll(user._id);

            res.status(200).json({ deleteResult });
        } catch (error) {
            next(new HttpException(404, (error as Error).message));
        }
    };
}
