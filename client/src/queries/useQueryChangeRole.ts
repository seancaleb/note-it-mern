import { useMutation, useQueryClient } from 'react-query';
import User, { Token } from '@/interfaces/user';
import client from '@/services';
import axios, { AxiosError } from 'axios';
import { retrieveErrorData } from '@/utils';
import { useNotification } from '@/hooks';
import { APIError } from '@/interfaces/api';

type MutationFnProps = Pick<User, 'id' | 'role'> & Token;

const handleChangeRole = async ({
    role,
    token,
    id,
}: MutationFnProps): Promise<User> =>
    await client<User>({
        options: {
            url: `/user/role/${id}`,
            method: 'post',
            data: { role },
        },
        token,
    });

const useQueryChangeRole = () => {
    const queryClient = useQueryClient();
    const { displayNotification } = useNotification();

    return useMutation<User, unknown, MutationFnProps>(handleChangeRole, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('users');

            displayNotification({
                type: 'success',
                message: 'User role has been updated',
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

export default useQueryChangeRole;
