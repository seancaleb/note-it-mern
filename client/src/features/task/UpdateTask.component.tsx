import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { ChangeEvent, useState } from 'react';
import Task, { Status } from '@/interfaces/task';
import { useTask, useUser } from '@/hooks';
import { useQueryUpdateTask } from '@/queries';
import { LoadingButton } from '@mui/lab';

interface UpdateTaskProps {
    open: boolean;
    handleClose: () => void;
    id: string;
}

const UpdateTask = ({ open, handleClose, id }: UpdateTaskProps) => {
    const matches = useMediaQuery('(min-width: 600px)');
    const { foundTask: task } = useTask(id);
    const [title, setTitle] = useState((task as Task).title);
    const [status, setStatus] = useState<Status>((task as Task).status);
    const { user, token } = useUser();
    const { mutate, isLoading, isSuccess } = useQueryUpdateTask({
        email: user?.email,
        handleClose,
    });

    const handleChangeStatus = (event: SelectChangeEvent) =>
        setStatus(event.target.value as Status);

    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) =>
        setTitle(event.target.value);

    /**
     * NOTE: This will be changed when back-end API is implemented.
     */
    const handleUpdateTask = () => {
        if (title && status) mutate({ title, status, id, token });
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Update task</DialogTitle>
                <DialogContent>
                    <Stack
                        spacing={2}
                        direction={matches ? 'row' : 'column'}
                        sx={{
                            mt: 2,
                            alignItems: {
                                xs: 'stretch',
                                sm: 'center',
                            },
                        }}
                    >
                        <TextField
                            autoFocus
                            id="name"
                            label="Task"
                            fullWidth
                            value={title}
                            onChange={handleChangeTitle}
                            variant="standard"
                            sx={{
                                '& .MuiInput-root:hover:not(.Mui-disabled):before':
                                    {
                                        borderBottomColor: 'primary.main',
                                    },
                            }}
                        />

                        <div>
                            <FormControl
                                variant="standard"
                                sx={{
                                    minWidth: 120,
                                    '& .MuiInput-underline:hover:not(.Mui-disabled):before':
                                        {
                                            borderColor: 'primary.main',
                                        },
                                }}
                            >
                                <InputLabel id="select-status-label">
                                    Status
                                </InputLabel>
                                <Select
                                    labelId="select-status-label"
                                    id="select-status"
                                    value={status}
                                    label="status"
                                    onChange={handleChangeStatus}
                                    variant="standard"
                                >
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="completed">
                                        Completed
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                        onClick={handleUpdateTask}
                        disabled={title === ''}
                        loading={isLoading}
                        loadingIndicator="Updating"
                    >
                        Update
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UpdateTask;
