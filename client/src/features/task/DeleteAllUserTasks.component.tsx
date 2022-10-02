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
                    sx={{ textTransform: 'uppercase' }}
                    onClick={handleDeleteAllUserTasks}
                    loading={isLoading}
                    startIcon={<DeleteOutlinedIcon />}
                    loadingPosition="start"
                >
                    Delete user tasks
                </LoadingButton>
            ) : null}
        </>
    );
};

export default DeleteAllUserTasks;
