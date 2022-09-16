import { useMutation, useQueryClient } from 'react-query';
import client from '@/services';
import { NonNullableToken, RegisterUser } from '@/interfaces/user';
import { useNotification } from '@/hooks';
import axios, { AxiosError } from 'axios';
import { retrieveErrorData } from '@/utils';
import { APIError } from '@/interfaces/api';

const handleRegisterUser = async ({
    firstName,
    lastName,
    email,
    password,
}: RegisterUser): Promise<NonNullableToken> =>
    await (
        await client.post(`/user/register`, {
            firstName,
            lastName,
            email,
            password,
        })
    ).data;

const useQueryRegisterUser = () => {
    const { displayNotification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<NonNullableToken, unknown, RegisterUser>(
        handleRegisterUser,
        {
            onSuccess: (data) => {
                const { token } = data;

                if (token) {
                    displayNotification({
                        type: 'info',
                        message: 'Registered successfully',
                    });

                    queryClient.invalidateQueries('users');
                }
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
