import user from './userSlice';

export { default as Login } from './Login.component';
export { default as Register } from './Register.component';
export { default as InitializeUsers } from './InitializeUsers.component';
export { default as EditProfile } from './EditProfile.component';
export { default as EditForm } from './EditForm.component';
export {
    UserActions,
    getUser,
    getToken,
    getUsers,
    findUser,
} from './userSlice';

export default user;

export const textFieldProps = {
    variant: 'outlined',
    color: 'primary',
    size: 'small',
    sx: {
        '& .MuiOutlinedInput-root:hover': {
            '& > fieldset': {
                borderColor: 'primary.main',
            },
        },
        '& .MuiOutlinedInput-root.Mui-disabled:hover': {
            '& > fieldset': {
                borderColor: 'unset',
            },
        },
        '& .MuiFormHelperText-root': {
            color: 'red',
        },
    },
};
