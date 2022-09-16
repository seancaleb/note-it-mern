import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';
import User, { UserDocument, Role } from '@/resources/user/user.interface';
import { Types } from 'mongoose';
import formatName from '@/utils/formatName';
import TaskModel from '@/resources/task/task.model';

export default class UserService {
    /**
     * REGISTER USER
     */
    public async register({
        firstName,
        lastName,
        email,
        password,
        role,
    }: User): Promise<string | Error> {
        try {
            const emailExist = await UserModel.find({ email }).exec();

            if (emailExist.length) throw new Error(`Email already exists`);

            const formattedFirstName = formatName(firstName);
            const formattedLastName = formatName(lastName);

            const user = await UserModel.create({
                firstName: formattedFirstName,
                lastName: formattedLastName,
                email,
                password,
                role,
            });

            return token.createToken(user);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    /**
     * LOGIN USER
     */
    public async login({
        email,
        password,
    }: Pick<User, 'email' | 'password'>): Promise<string | Error> {
        try {
            const user = await UserModel.findOne({ email }).select('+password');

            if (!user) throw new Error(`Email doesn't exist`);

            if (await user.isValidPassword(password))
                return token.createToken(user);
            else throw new Error('Password is incorrect');
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    /**
     * GET USER
     */
    public async get(id: typeof Types.ObjectId): Promise<UserDocument> {
        try {
            const user = await UserModel.findById(id).select([
                '_id',
                'firstName',
                'lastName',
                'email',
                'role',
            ]);

            if (!user) throw new Error(`User with id ${id} doesn't exist`);

            return user;
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * GET ALL USERS
     */
    public async getAll(id: typeof Types.ObjectId): Promise<UserDocument[]> {
        try {
            const users = await UserModel.find({ _id: { $ne: id } }).select(
                '-password'
            );

            return users;
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * DELETE USER
     */
    public async delete(id: string): Promise<UserDocument> {
        try {
            await TaskModel.deleteMany({ createdBy: id });
            const user = await UserModel.findByIdAndDelete(id).select(
                '-password'
            );

            if (!user) throw new Error(`User with id ${id} doesn't exist`);

            return user;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    /**
     * DELETE MULTIPLE USERS BY ID
     */
    public async deleteById(ids: string[]) {
        try {
            await TaskModel.deleteMany({ createdBy: { $in: ids } });
            const deleted = await UserModel.deleteMany({ _id: { $in: ids } });

            return deleted;
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * CHANGE USER ROLE
     */
    public async changeRole(id: string, role: Role): Promise<UserDocument> {
        try {
            const user = await UserModel.findByIdAndUpdate(
                id,
                {
                    role,
                },
                { runValidators: true, new: true }
            );

            if (!user) throw new Error(`User with id ${id} doesn't exist`);

            return user;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    /**
     * UPDATE USER
     */
    public async update({
        id,
        firstName,
        lastName,
        email,
        role,
    }: Omit<User, 'password'> & {
        id: typeof Types.ObjectId;
    }): Promise<UserDocument> {
        try {
            // Find user and get his current email to get list of unique emails not including his/her
            const user = await UserModel.findById(id);

            if (!user) throw new Error(`User with id ${id} doesn't exist`);

            const currentEmail = user.email;

            const userEmails = await UserModel.find({
                email: { $ne: currentEmail },
            });

            // Check if email from req.body is present in the database
            const isPresentEmail = userEmails.find(
                (user) => user.email === email
            );

            // If email is present throw an error
            if (isPresentEmail) throw new Error('Email already exists');

            const formattedFirstName = formatName(firstName);
            const formattedLastName = formatName(lastName);

            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: id },
                {
                    firstName: formattedFirstName,
                    lastName: formattedLastName,
                    email,
                    role,
                },
                { runValidators: true, new: true }
            );

            if (!updatedUser)
                throw new Error(`User with id ${id} doesn't exist`);

            return updatedUser;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}
