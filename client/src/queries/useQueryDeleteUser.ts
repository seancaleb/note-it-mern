import { useMutation, useQueryClient } from 'react-query';
import client from '@/services';
import { useNotification } from '@/hooks';
import axios, { AxiosError } from 'axios';
import { retrieveErrorData } from '@/utils';
import User, { Token } from '@/interfaces/user';
import { APIDeleteResult, APIError } from '@/interfaces/api';

type Id = {
    id: string | readonly string[];
};

type MutationFnProps = Id & Token;

const handleDeleteUser = async ({
    id,
    token,
}: MutationFnProps): Promise<User | APIDeleteResult> => {
    if (typeof id === 'string')
        return await client<User | APIDeleteResult>({
            options: {
                url: `/user/${id}`,
                method: 'delete',
            },
            token,
        });
    else
        return await client<User | APIDeleteResult>({
            options: {
                url: '/user',
                method: 'delete',
                data: { ids: id },
            },
            token,
        });
};

const useQueryDeleteUser = () => {
    const { displayNotification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<User | APIDeleteResult, unknown, MutationFnProps>(
        handleDeleteUser,
        {
            onSuccess: async (user) => {
                const message = isSingleUser(user)
                    ? 'User has been deleted'
                    : `${
                          (user as APIDeleteResult).deleteResult.deletedCount
                      } users has been deleted`;

                await queryClient.invalidateQueries('users');

                displayNotification({
                    type: 'success',
                    message,
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

export default useQueryDeleteUser;

function isSingleUser<T extends Object>(obj: T) {
    return obj.hasOwnProperty('user');
}
