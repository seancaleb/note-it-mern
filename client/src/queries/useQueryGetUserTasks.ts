import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import client from '@/services';
import Task from '@/interfaces/task';
import axios, { AxiosError } from 'axios';
import { retrieveErrorData } from '@/utils';
import { useNotification, useTask, useUser } from '@/hooks';
import { APIError } from '@/interfaces/api';
import { Token, UserPartial } from '@/interfaces/user';

type Tasks = {
    tasks: Task[];
};

type QueryProps = Token & Pick<UserPartial, 'email'>;

const handleGetUserTasks = async ({ token }: Token): Promise<Tasks> =>
    await client<Tasks>({
        options: {
            url: '/task',
        },
        token,
    });

const useQueryGetUserTasks = ({ token, email }: QueryProps) => {
    const { displayNotification } = useNotification();
    const navigate = useNavigate();
    const { logoutUser } = useUser();
    const { emptyTasks } = useTask();

    return useQuery<Tasks, unknown>(
        ['tasks', email],
        () => handleGetUserTasks({ token }),
        {
            retry: false,
            onError: (e) => {
                if (axios.isAxiosError(e)) {
                    const error = e as AxiosError<APIError>;
                    const { message, status } = retrieveErrorData<APIError>({
                        error,
                    });

                    if (status === 401) {
                        emptyTasks();
                        logoutUser();
                        navigate('/');
                    }

                    displayNotification({
                        type: 'error',
                        message: message ? message : 'Something went wrong',
                    });
                }
            },
        }
    );
};

export default useQueryGetUserTasks;
