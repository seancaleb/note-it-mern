import { Role } from './user.interface';
import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middleware/authenticated.middleware';
import User from '@/resources/user/user.interface';
import admin from '@/middleware/admin.middleware';

export default class UserController implements Controller {
    public path = '/user';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    /**
     * Assign all controllers to their respective routes
     */
    private initializeRoutes(): void {
        this.router.get(`${this.path}`, authenticated, this.get);
        this.router.get(`${this.path}/all`, authenticated, admin, this.getAll);

        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
        this.router.post(
            `${this.path}/role/:id`,
            authenticated,
            admin,
            validationMiddleware(validate.changeRole),
            this.changeRole
        );

        this.router.patch(
            `${this.path}`,
            authenticated,
            validationMiddleware(validate.update),
            this.update
        );

        this.router.delete(
            `${this.path}/:id`,
            authenticated,
            admin,
            this.delete
        );
        this.router.delete(
            `${this.path}`,
            authenticated,
            admin,
            this.deleteById
        );
    }

    /**
     * REGISTER USER
     */
    private register = async (
        req: Request<{}, {}, User>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { firstName, lastName, email, password, role } = req.body;
            const token = await this.UserService.register({
                firstName,
                lastName,
                email,
                password,
                role,
            });

            res.status(201).json({ token });
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    };

    /**
     * LOGIN USER
     */
    private login = async (
        req: Request<{}, {}, Pick<User, 'email' | 'password'>>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            const token = await this.UserService.login({ email, password });

            res.status(200).json({ token });
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    };

    /**
     * GET USER
     */
    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            if (!req.user)
                return next(new HttpException(404, 'No logged in user'));

            const {
                user: { _id },
            } = req;

            const user = await this.UserService.get(_id);

            res.status(200).json({ user });
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    };

    /**
     * GET ALL USERS
     */
    private getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { user } = req;

            const users = await this.UserService.getAll(user._id);

            res.status(200).json({ users });
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    };

    /**
     * DELETE USER
     */
    private delete = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const user = await this.UserService.delete(id);

            res.status(200).json({ user });
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    };

    /**
     * DELETE MULTIPLE USERS BY ID
     */
    private deleteById = async (
        req: Request<{}, {}, { ids: string[] }>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { ids } = req.body;
            const deleteResult = await this.UserService.deleteById(ids);

            res.status(200).json({ deleteResult });
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    };

    /**
     * CHANGE USER ROLE
     */
    private changeRole = async (
        req: Request<{ id: string }, {}, { role: Role }>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { role } = req.body;
            const { id } = req.params;

            const newRole = role === 'user' ? 'admin' : 'user';

            const user = await this.UserService.changeRole(id, newRole);

            res.status(200).json({ user });
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    };

    /**
     * UPDATE USER
     */
    private update = async (
        req: Request<{}, {}, Omit<User, 'password'>>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { firstName, lastName, email, role } = req.body;
            const { _id } = req.user;

            const user = await this.UserService.update({
                id: _id,
                firstName,
                lastName,
                email,
                role,
            });

            res.status(200).json({ user });
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    };
}
