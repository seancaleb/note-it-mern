import { useMutation, useQueryClient } from 'react-query';
import client from '@/services';
import { NonNullableToken, RegisterUser } from '@/interfaces/user';
import { useNotification } from '@/hooks';
import axios, { AxiosError } from 'axios';
import { retrieveErrorData } from '@/utils';
import { APIError } from '@/interfaces/api';

const handleRegisterUser = async ({
    ...args
}: RegisterUser): Promise<NonNullableToken> =>
    await client<NonNullableToken>({
        options: {
            url: '/user/register',
            method: 'post',
            data: { ...args },
        },
    });

const useQueryRegisterUser = () => {
    const { displayNotification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<NonNullableToken, unknown, RegisterUser>(
        handleRegisterUser,
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries('users');

                displayNotification({
                    type: 'info',
                    message: 'Registered successfully',
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

export default useQueryRegisterUser;
