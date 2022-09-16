import { useQueryGetUserTasks } from '@/queries';
import { useTask, useUser } from '@/hooks';
import { Fragment, useEffect } from 'react';
import Task from '@/interfaces/task';

interface Tasks {
    tasks: Task[];
}

const InitializeTasks = () => {
    const { token, user } = useUser();
    const { initializeTasks } = useTask();
    const { data, isSuccess } = useQueryGetUserTasks({
        token,
        email: user?.email,
    });

    const handleInitializeTasks = (args: Tasks) => {
        const tasks: Task[] = args.tasks.map(
            ({ id, title, status, createdAt, createdBy }) => ({
                id,
                title,
                status,
                createdAt,
                createdBy,
            })
        );

        initializeTasks(tasks);
    };

    useEffect(() => {
        if (isSuccess) {
            handleInitializeTasks(data);
        }
    }, [isSuccess, data]);

    return <Fragment />;
};

export default InitializeTasks;
