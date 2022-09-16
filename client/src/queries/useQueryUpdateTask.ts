import { useMutation, useQueryClient } from 'react-query';
import client from '@/services';
import Task, { Status } from '@/interfaces/task';
import { useNotification } from '@/hooks';
import axios, { AxiosError } from 'axios';
import { retrieveErrorData } from '@/utils';
import { APIError } from '@/interfaces/api';
import { Token, UserPartial } from '@/interfaces/user';

type MutationFnProps = Pick<Task, 'id' | 'title' | 'status'> & Token;
type QueryProps = Pick<UserPartial, 'email'> & { handleClose: () => void };

const handleUpdateTask = async ({
    id,
    title,
    status,
    token,
}: MutationFnProps): Promise<Task> =>
    await (
        await client.patch(
            `/task/${id}`,
            { title, status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
    ).data;

const useQueryUpdateTask = ({ email, handleClose }: QueryProps) => {
    const { displayNotification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<Task, unknown, MutationFnProps>(handleUpdateTask, {
        onSuccess: (task) => {
            handleClose();

            queryClient.invalidateQueries(`tasks-${email}`).then(() => {
                displayNotification({
                    type: 'success',
                    message: 'Task has been updated',
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

export default useQueryUpdateTask;
