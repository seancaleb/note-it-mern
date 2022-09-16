import { AxiosError, AxiosResponse } from 'axios';

interface RetrieveErrorData<T> {
    error: AxiosError<T>;
}

function retrieveErrorData<T>({ error }: RetrieveErrorData<T>): T {
    const { data } = error.response as AxiosResponse<T>;
    return { ...(data as Object) } as T;
}

export default retrieveErrorData;
