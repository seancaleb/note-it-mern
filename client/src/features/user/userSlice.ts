import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User, { NonNullableToken } from '@/interfaces/user';
import { RootState } from 'app/store';

interface UserState {
    token: string | null;
    user: User | null;
    users: User[];
}

const initialState: UserState = {
    token: null,
    user: null,
    users: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<User & NonNullableToken>) => {
            const { id, firstName, lastName, email, role, token } =
                action.payload;
            state.token = token;
            state.user = { id, firstName, lastName, email, role };
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.users = [];
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const { email, firstName, lastName, role, id } = action.payload;
            state.user = { email, firstName, lastName, role, id };
        },
        initializeUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
    },
});

/**
 * Utility functions
 */
export const getUser = (state: RootState) => state.user.user;
export const getToken = (state: RootState) => state.user.token;
export const getUsers = (state: RootState) => state.user.users;
export const findUser = (
    state: RootState,
    id: string | string[] | undefined
) => {
    if (typeof id === 'string') {
        return state.user.users.find((user) => user.id === id);
    } else id instanceof Array;
    return state.user.users.filter((user) => id?.includes(user.id));
};

export const UserActions = userSlice.actions;
export default userSlice.reducer;
