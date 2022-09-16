import { useAppDispatch } from '@/redux-hooks';
import { NotificationActions } from '@/features/notification';
import { Notification } from '@/interfaces/notification';

const useNotification = () => {
    const dispatch = useAppDispatch();

    const displayNotification = (notification: Notification) => {
        dispatch(NotificationActions.addNotification(notification));
    };

    const clearNotification = () => {
        dispatch(NotificationActions.clearNotification());
    };

    return { displayNotification, clearNotification } as const;
};

export default useNotification;
