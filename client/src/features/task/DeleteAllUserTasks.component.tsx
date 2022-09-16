import Button from '@mui/material/Button';
import { useQueryDeleteAllUserTasks } from '@/queries';
import { useUser } from '@/hooks';
import { LoadingButton } from '@mui/lab';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const DeleteAllUserTasks = () => {
    const { token, user } = useUser();
    const { mutate, isLoading } = useQueryDeleteAllUserTasks({
        email: user?.email,
    });

    const handleDeleteAllUserTasks = () => {
        mutate({ token });
    };

    return (
        <>
            {user?.role === 'admin' ? (
                <LoadingButton
                    color="error"
                    variant="outlined"
                    size="medium"
                    sx={{ textTransform: 'uppercase' }}
                    onClick={handleDeleteAllUserTasks}
                    loading={isLoading}
                    endIcon={<DeleteOutlinedIcon />}
                    loadingPosition="end"
                >
                    Delete all user tasks
                </LoadingButton>
            ) : null}
        </>
    );
};

export default DeleteAllUserTasks;
