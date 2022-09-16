import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Task, { StatusCount } from '@/interfaces/task';
import { RootState } from 'app/store';

// const initialState: Task[] = [];
type TasksState = {
    tasks: Task[] | null;
};

const initialState: TasksState = {
    tasks: null,
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        initializeTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        emptyTasks: (state) => {
            state.tasks = null;
        },
    },
});

/**
 * Utility functions
 */
export const getAllTasks = (state: RootState) => state.task.tasks;
export const findTask = (
    state: RootState,
    id: string | string[] | undefined
) => {
    if (typeof id === 'string') {
        return state.task.tasks?.find((task) => task.id === id);
    } else id instanceof Array;
    return state.task.tasks?.filter((task) => id?.includes(task.id));
};
export const getStatusCount = (state: RootState) => {
    let statusCount: StatusCount[] = [
        {
            title: 'active',
            count: 0,
        },
        {
            title: 'pending',
            count: 0,
        },
        {
            title: 'completed',
            count: 0,
        },
    ];

    state.task.tasks?.forEach((task) => {
        statusCount.forEach((el) => {
            if (el.title === task.status) el.count++;
        });
    });

    return statusCount;
};

export const TaskActions = taskSlice.actions;
export default taskSlice.reducer;
