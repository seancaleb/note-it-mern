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
    await client<APIDeleteResult>({
        options: {
            url: '/task/users/all',
            method: 'delete',
        },
        token,
    });

const useQueryDeleteAllUserTasks = ({ email }: QueryProps) => {
    const { displayNotification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<APIDeleteResult, unknown, MutationFnProps>(
        handleDeleteAllUserTasks,
        {
            onSuccess: async (task) => {
                const deleteCount = task.deleteResult.deletedCount;

                await queryClient.invalidateQueries(['tasks', email]);

                displayNotification({
                    type: 'success',
                    message: `All tasks has been deleted ${
                        deleteCount === 0 ? '' : `(${deleteCount})`
                    }`,
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
        }
    );
};

export default useQueryDeleteAllUserTasks;
