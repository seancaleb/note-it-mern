import { useMutation } from 'react-query';
import client from '@/services';
import jwt_decode from 'jwt-decode';
import User, { NonNullableToken, LoginUser } from '@/interfaces/user';
import { useUser, useNotification } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { retrieveErrorData } from '@/utils';
import { APIError } from '@/interfaces/api';

const handleLoginUser = async ({
    email,
    password,
}: LoginUser): Promise<NonNullableToken> =>
    await client<NonNullableToken>({
        options: {
            url: '/user/login',
            method: 'post',
            data: { email, password },
        },
    });

const useQueryLoginUser = () => {
    const { loginUser } = useUser();
    const navigate = useNavigate();
    const { displayNotification } = useNotification();

    return useMutation<NonNullableToken, unknown, LoginUser>(handleLoginUser, {
        onSuccess: (data) => {
            const { token } = data;
            const { id, firstName, lastName, email, role } =
                jwt_decode<User>(token);

            /**
             * Login user and store data in redux
             */
            loginUser({
                id,
                firstName,
                lastName,
                email,
                role,
                token,
            });
            navigate('dashboard');
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

export default useQueryLoginUser;
