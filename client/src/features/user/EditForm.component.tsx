import TextField, { TextFieldProps } from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { textFieldProps } from '@/features/user';
import { updateSchema } from '@/features/user/schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateUser } from '@/interfaces/user';
import { useUser } from '@/hooks';
import { useQueryUpdateUser } from '@/queries';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { experimental_sx as sx } from '@mui/system';
import ProgressButton from '@/components/ProgressButton';

type EditFormProps = {
    handleClose: () => void;
};

const EditForm = ({ handleClose }: EditFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UpdateUser>({
        resolver: yupResolver(updateSchema),
    });
    const { user, token } = useUser();
    const { mutate, isLoading } = useQueryUpdateUser({ handleClose });

    const onSubmit = handleSubmit(({ email, firstName, lastName }) => {
        if (user) {
            const { id, role } = user;
            mutate({
                email,
                firstName,
                lastName,
                role,
                id,
                token,
            });
        }
    });

    const onClose = () => {
        reset();
        handleClose();
    };

    return (
        <GridContainer as="form" onSubmit={onSubmit}>
            <GridItem>
                <TextField
                    label="First name"
                    type="text"
                    fullWidth
                    {...(textFieldProps as TextFieldProps)}
                    defaultValue={user?.firstName}
                    inputProps={{
                        readOnly: !open,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register('firstName')}
                    helperText={
                        errors.firstName ? errors.firstName.message : null
                    }
                />
            </GridItem>

            <GridItem>
                <TextField
                    label="Last name"
                    type="text"
                    fullWidth
                    {...(textFieldProps as TextFieldProps)}
                    defaultValue={user?.lastName}
                    inputProps={{
                        readOnly: !open,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register('lastName')}
                    helperText={
                        errors.lastName ? errors.lastName.message : null
                    }
                />
            </GridItem>

            <GridItem>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    {...(textFieldProps as TextFieldProps)}
                    defaultValue={user?.email}
                    inputProps={{
                        readOnly: !open,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register('email')}
                    helperText={errors.email ? errors.email.message : null}
                />
            </GridItem>

            <Grid item sx={{ gridColumn: 'span 12' }}>
                <StackFormButtons>
                    <LoadingButton
                        type="submit"
                        variant="outlined"
                        disableElevation
                        loading={isLoading}
                        loadingIndicator={<ProgressButton label="Saving" />}
                    >
                        Save Profile
                    </LoadingButton>
                    <Button onClick={onClose}>Cancel</Button>
                </StackFormButtons>
            </Grid>
        </GridContainer>
    );
};

export default EditForm;

const GridContainer = styled(Grid)(({ theme }) => ({
    columnGap: theme.spacing(2),
    rowGap: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumn: 'span 12',
}));

const GridItem = styled(Grid)(({ theme }) =>
    sx({
        gridColumn: {
            xs: 'span 12',
            lg: 'span 6',
        },
    })
);

const StackFormButtons = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    gap: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'flex-end',
}));
