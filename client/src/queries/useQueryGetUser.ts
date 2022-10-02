import User, { Password, Token, UserPartial } from '@/interfaces/user';
import { useQuery } from 'react-query';
import client from '@/services';
import axios, { AxiosError } from 'axios';
import { retrieveErrorData } from '@/utils';
import { APIError } from '@/interfaces/api';
import { useNotification } from '@/hooks';

type UserProfile = {
    user: User & Password;
};
type QueryProps = Token & Pick<UserPartial, 'email'>;

const handleGetUser = async ({ token }: Token): Promise<UserProfile> =>
    await client<UserProfile>({
        options: {
            url: '/user',
        },
        token,
    });

const useQueryGetUser = ({ token, email }: QueryProps) => {
    const { displayNotification } = useNotification();

    return useQuery<UserProfile, unknown>(
        ['users', email],
        () => handleGetUser({ token }),
        {
            retry: false,
            refetchOnWindowFocus: false,
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
        }
    );
};

export default useQueryGetUser;
