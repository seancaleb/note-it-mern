import { useNotification } from '@/hooks';
import { useQuery } from 'react-query';
import client from '@/services';
import User, { Token } from '@/interfaces/user';
import axios, { AxiosError } from 'axios';
import { retrieveErrorData } from '@/utils';
import { APIError } from '@/interfaces/api';

type Users = {
    users: User[];
};

const handleGetUsers = async ({ token }: Token): Promise<Users> =>
    await client<Users>({
        options: {
            url: '/user/all',
        },
        token,
    });

const useQueryGetUsers = ({ token }: Token) => {
    const { displayNotification } = useNotification();

    return useQuery<Users, unknown>('users', () => handleGetUsers({ token }), {
        retry: false,
        onError: (e) => {
            if (axios.isAxiosError(e)) {
                const error = e as AxiosError<APIError>;
                const { message } = retrieveErrorData<APIError>({
                    error,
                });

                displayNotification({
                    type: 'error',
                    message: message ? message : 'Something went wrong',
                });
            }
        },
    });
};

export default useQueryGetUsers;
