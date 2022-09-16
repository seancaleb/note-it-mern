import { useMutation, useQueryClient } from 'react-query';
import client from '@/services';
import { useNotification } from '@/hooks';
import axios, { AxiosError } from 'axios';
import { retrieveErrorData } from '@/utils';
import Task from '@/interfaces/task';
import { Token, UserPartial } from '@/interfaces/user';
import { APIDeleteResult, APIError } from '@/interfaces/api';

type Id = {
    id: string | readonly string[];
};

type MutationFnProps = Id & Token;

const handleDeleteTask = async ({
    id,
    token,
}: MutationFnProps): Promise<Task | APIDeleteResult> =>
    typeof id === 'string'
        ? await (
              await client.delete(`/task/${id}`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              })
          ).data
        : await (
              await client.delete(`/task`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
                  data: { ids: id },
              })
          ).data;

const useQueryDeleteTask = ({ email }: Pick<UserPartial, 'email'>) => {
    const { displayNotification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<Task | APIDeleteResult, unknown, MutationFnProps>(
        handleDeleteTask,
        {
            onSuccess: (task) => {
                const message = isSingleTask(task)
                    ? 'Task has been deleted'
                    : `${
                          (task as APIDeleteResult).deleteResult.deletedCount
                      } tasks has been deleted`;

                queryClient.invalidateQueries(`tasks-${email}`).then(() =>
                    displayNotification({
                        type: 'success',
                        message,
                    })
                );
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

export default useQueryDeleteTask;

function isSingleTask<T extends Object>(t: T) {
    return t.hasOwnProperty('task');
}
