import { useMutation, useQueryClient } from 'react-query';
import client from '@/services';
import Task from '@/interfaces/task';
import { useNotification } from '@/hooks';
import axios, { AxiosError } from 'axios';
import { retrieveErrorData } from '@/utils';
import { Token, UserPartial } from '@/interfaces/user';
import { APIError } from '@/interfaces/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type MutationFnProps = Pick<Task, 'title' | 'status'> & Token;
type QueryProps = Pick<UserPartial, 'email'> & { handleClose: () => void };

const handleAddTask = async ({
    title,
    status,
    token,
}: MutationFnProps): Promise<Task> =>
    await (
        await client.post(
            '/task',
            { title, status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
    ).data;

const useQueryAddTask = ({ email, handleClose }: QueryProps) => {
    const { displayNotification } = useNotification();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation<Task, unknown, MutationFnProps>(handleAddTask, {
        onSuccess: (task) => {
            location.pathname !== '/dashboard/tasks'
                ? navigate('/dashboard/tasks')
                : null;

            handleClose();

            queryClient.invalidateQueries(`tasks-${email}`).then(() => {
                displayNotification({
                    type: 'success',
                    message: 'Task has been added',
                });
            });
        },
        onError: (e) => {
            if (axios.isAxiosError(e)) {
                const error = e as AxiosError<APIError>;
                const { message } = retrieveErrorData<APIError>({ error });
                displayNotification({
                    type: 'error',
                    message: message ? message : 'Something went wrong',
                });
            }
        },
    });
};

export default useQueryAddTask;
