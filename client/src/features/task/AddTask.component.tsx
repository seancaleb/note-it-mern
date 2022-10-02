import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { ChangeEvent, useState } from 'react';
import { Status } from '@/interfaces/task';
import { useUser } from '@/hooks';
import { useQueryAddTask } from '@/queries';
import { LoadingButton } from '@mui/lab';

interface AddTaskProps {
    open: boolean;
    handleClose: () => void;
}

const AddTask = ({ open, handleClose }: AddTaskProps) => {
    const matches = useMediaQuery('(min-width: 600px)');
    const [status, setStatus] = useState<Status>('pending');
    const [title, setTitle] = useState('');
    const { token, user } = useUser();
    const { mutate, isLoading } = useQueryAddTask({
        email: user?.email,
        handleClose,
    });

    const handleChangeStatus = (event: SelectChangeEvent) =>
        setStatus(event.target.value as Status);

    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) =>
        setTitle(event.target.value);

    const handleAddTask = () => {
        mutate({ title, status, token });
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>New task</DialogTitle>
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
                                </Select>
                            </FormControl>
                        </div>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                        onClick={handleAddTask}
                        disabled={title === ''}
                        loading={isLoading}
                        loadingIndicator="Adding"
                    >
                        Add
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddTask;
