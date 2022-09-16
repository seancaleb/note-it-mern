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
}: MutationFnProps): Promise<User | APIDeleteResult> =>
    typeof id === 'string'
        ? await (
              await client.delete(`/user/${id}`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              })
          ).data
        : await (
              await client.delete(`/user`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
                  data: { ids: id },
              })
          ).data;

const useQueryDeleteUser = () => {
    const { displayNotification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<User | APIDeleteResult, unknown, MutationFnProps>(
        handleDeleteUser,
        {
            onSuccess: (user) => {
                const message = isSingleUser(user)
                    ? 'User has been deleted'
                    : `${
                          (user as APIDeleteResult).deleteResult.deletedCount
                      } users has been deleted`;

                queryClient.invalidateQueries('users').then(() => {
                    displayNotification({
                        type: 'success',
                        message,
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
        }
    );
};

export default useQueryDeleteUser;

function isSingleUser<T extends Object>(t: T) {
    return t.hasOwnProperty('user');
}
