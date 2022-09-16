import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import ProgressButton from '@/components/ProgressButton';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/features/user/schema';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form/dist/types';
import { useQueryLoginUser } from '@/queries';
import { LoginUser } from '@/interfaces/user';
import { textFieldProps } from '@/features/user';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const { mutate, isLoading } = useQueryLoginUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<LoginUser>({
        resolver: yupResolver(loginSchema),
    });
    const handleNavigate = () => navigate('/register');

    const onSubmit = handleSubmit((data) => {
        mutate(data);
    });

    return (
        <FormView
            register={register}
            errors={errors}
            onSubmit={onSubmit}
            handleNavigate={handleNavigate}
            isLoading={isLoading}
        />
    );
};

export default Login;

type FormViewProps = {
    register: UseFormRegister<LoginUser>;
    errors: FieldErrorsImpl<LoginUser>;
    onSubmit: (
        e?: React.BaseSyntheticEvent<object, any, any> | undefined
    ) => Promise<void>;
    handleNavigate: () => void;
    isLoading: boolean;
};

function FormView({
    register,
    errors,
    onSubmit,
    handleNavigate,
    isLoading,
}: FormViewProps) {
    const [isShown, setIsShown] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    return (
        <Stack spacing={4}>
            <Box>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 'bold' }}
                    gutterBottom
                >
                    Sign In
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Enter your credentials to proceed
                </Typography>
            </Box>

            <Stack spacing={3} component="form" onSubmit={onSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    {...register('email')}
                    {...(textFieldProps as TextFieldProps)}
                    helperText={errors.email ? errors.email.message : null}
                />

                <TextField
                    label="Password"
                    type={!isShown ? 'password' : 'text'}
                    fullWidth
                    {...register('password')}
                    {...(textFieldProps as TextFieldProps)}
                    helperText={
                        errors.password ? errors.password.message : null
                    }
                    onFocus={() => setIsSelected(true)}
                    onBlur={() => setIsSelected(false)}
                    InputProps={{
                        endAdornment: isSelected ? (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setIsShown(!isShown)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {isShown ? (
                                        <VisibilityOff
                                            sx={{
                                                fontSize: 'inherit',
                                                color: 'primary.main',
                                            }}
                                        />
                                    ) : (
                                        <Visibility
                                            sx={{
                                                fontSize: 'inherit',
                                                color: 'primary.main',
                                            }}
                                        />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                    }}
                />

                <LoadingButton
                    type="submit"
                    variant="contained"
                    disableElevation
                    loading={isLoading}
                    loadingIndicator={<ProgressButton label="Signing in" />}
                >
                    Sign in
                </LoadingButton>
            </Stack>

            <Stack spacing={3}>
                <Divider />

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Don't have an account?{' '}
                    <Box
                        component="span"
                        sx={{ color: 'primary.main', cursor: 'pointer' }}
                        onClick={handleNavigate}
                    >
                        Sign up
                    </Box>
                </Typography>
            </Stack>
        </Stack>
    );
}
