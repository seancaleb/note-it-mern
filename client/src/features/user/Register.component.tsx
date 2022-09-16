import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
import { registerSchema } from '@/features/user/schema';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form/dist/types';
import { useQueryRegisterUser } from '@/queries';
import { RegisterUser } from '@/interfaces/user';
import { useEffect } from 'react';
import { textFieldProps } from '@/features/user';
import { useState } from 'react';

const Register = () => {
    const navigate = useNavigate();
    const { mutate, isSuccess, isLoading } = useQueryRegisterUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterUser>({
        resolver: yupResolver(registerSchema),
    });
    const handleNavigate = () => navigate('/login');

    const onSubmit = handleSubmit((data) => {
        mutate(data);
    });

    useEffect(() => {
        if (isSuccess) handleNavigate();
    }, [isSuccess]);

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

export default Register;

type FormViewProps = {
    register: UseFormRegister<RegisterUser>;
    errors: FieldErrorsImpl<RegisterUser>;
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
                    Sign Up
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Fill up with your personal details
                </Typography>
            </Box>

            <Stack spacing={3} component="form" onSubmit={onSubmit}>
                <Stack direction="row" spacing={2}>
                    <TextField
                        label="First name"
                        fullWidth
                        {...register('firstName')}
                        {...(textFieldProps as TextFieldProps)}
                        helperText={
                            errors.firstName ? errors.firstName.message : null
                        }
                    />

                    <TextField
                        label="Last name"
                        fullWidth
                        {...register('lastName')}
                        {...(textFieldProps as TextFieldProps)}
                        helperText={
                            errors.lastName ? errors.lastName.message : null
                        }
                    />
                </Stack>

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
                    loadingIndicator={<ProgressButton label="Signing up" />}
                >
                    Sign up
                </LoadingButton>
            </Stack>

            <Stack spacing={3}>
                <Divider />

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Back to{' '}
                    <Box
                        component="span"
                        sx={{ color: 'primary.main', cursor: 'pointer' }}
                        onClick={handleNavigate}
                    >
                        Sign in
                    </Box>
                </Typography>
            </Stack>
        </Stack>
    );
}
