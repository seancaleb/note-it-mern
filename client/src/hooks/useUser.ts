import { useAppDispatch, useAppSelector } from '@/redux-hooks';
import { TaskActions } from '@/features/task';
import {
    UserActions,
    getUser,
    getToken,
    getUsers,
    findUser,
} from '@/features/user';
import User, { NonNullableToken } from '@/interfaces/user';

const useUser = (id?: string | string[]) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUser);
    const token = useAppSelector(getToken);
    const users = useAppSelector(getUsers);
    const foundUser = useAppSelector((state) => findUser(state, id));

    const loginUser = ({ ...args }: User & NonNullableToken) => {
        dispatch(UserActions.loginUser(args));
    };

    const logoutUser = () => {
        dispatch(UserActions.logoutUser());
        dispatch(TaskActions.emptyTasks());
    };

    const initializeUsers = (args: User[]) => {
        dispatch(UserActions.initializeUsers(args));
    };

    const updateUser = ({ ...args }: User) => {
        dispatch(UserActions.updateUser(args));
    };

    return {
        loginUser,
        logoutUser,
        user,
        token,
        initializeUsers,
        users,
        foundUser,
        updateUser,
    } as const;
};

export default useUser;
