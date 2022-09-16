import Task from '@/interfaces/task';
import { useAppDispatch, useAppSelector } from '@/redux-hooks';
import {
    TaskActions,
    getAllTasks,
    findTask,
    getStatusCount,
} from '@/features/task';

const useTask = (id?: string | string[]) => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(getAllTasks);
    const foundTask = useAppSelector((state) => findTask(state, id));
    const statusCount = useAppSelector(getStatusCount);

    const initializeTasks = (args: Task[]) => {
        dispatch(TaskActions.initializeTasks(args));
    };

    const emptyTasks = () => {
        dispatch(TaskActions.emptyTasks());
    };

    return {
        initializeTasks,
        tasks,
        foundTask,
        emptyTasks,
        statusCount,
    } as const;
};

export default useTask;
