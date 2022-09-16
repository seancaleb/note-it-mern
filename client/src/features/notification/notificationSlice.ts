import { Notification } from '@/interfaces/notification';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Notification = {
    open: false,
    type: 'success',
    message: '',
    timeout: 2000,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (_state, action: PayloadAction<Notification>) => ({
            ...initialState,
            ...action.payload,
            open: true,
        }),
        clearNotification: (state) => ({ ...state, open: false }),
    },
});

export const NotificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
