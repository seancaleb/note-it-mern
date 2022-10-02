import User, { Token } from '@/interfaces/user';
import { useMutation } from 'react-query';
import client from '@/services';
import axios, { AxiosError } from 'axios';
import { APIError } from '@/interfaces/api';
import { retrieveErrorData } from '@/utils';
import { useNotification, useUser } from '@/hooks';

type MutationFnProps = User & Token;
type QueryProps = {
    handleClose: () => void;
};
type UpdatedUser = {
    user: User;
};

const handleUpdateUser = async ({
    token,
    ...args
}: MutationFnProps): Promise<UpdatedUser> =>
    await client<UpdatedUser>({
        options: {
            url: '/user/update',
            method: 'patch',
            data: { ...args },
        },
        token,
    });

const useQueryUpdateUser = ({ handleClose }: QueryProps) => {
    const { displayNotification } = useNotification();
    const { updateUser } = useUser();

    return useMutation<UpdatedUser, unknown, MutationFnProps>(
        handleUpdateUser,
        {
            onSuccess: ({ user }) => {
                const { id, firstName, lastName, email, role } = user;

                updateUser({ id, firstName, lastName, email, role });

                displayNotification({
                    type: 'success',
                    message: 'Profile has been updated',
                });

                handleClose();
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

export default useQueryUpdateUser;
