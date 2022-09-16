import { useMutation, useQueryClient } from 'react-query';
import client from '@/services';
import { useNotification } from '@/hooks';
import axios, { AxiosError } from 'axios';
import { retrieveErrorData } from '@/utils';
import { Token, UserPartial } from '@/interfaces/user';
import { APIDeleteResult, APIError } from '@/interfaces/api';

type MutationFnProps = Token;
type QueryProps = Pick<UserPartial, 'email'>;

const handleDeleteAllUserTasks = async ({
    token,
}: MutationFnProps): Promise<APIDeleteResult> =>
    await (
        await client.delete(`/task/users/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    ).data;

const useQueryDeleteAllUserTasks = ({ email }: QueryProps) => {
    const { displayNotification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<APIDeleteResult, unknown, MutationFnProps>(
        handleDeleteAllUserTasks,
        {
            onSuccess: (task) => {
                const deleteCount = task.deleteResult.deletedCount;

                queryClient.invalidateQueries(`tasks-${email}`).then(() =>
                    displayNotification({
                        type: 'success',
                        message: `All tasks has been deleted ${
                            deleteCount === 0 ? '' : `(${deleteCount})`
                        }`,
                    })
                );
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
        }
    );
};

export default useQueryDeleteAllUserTasks;
