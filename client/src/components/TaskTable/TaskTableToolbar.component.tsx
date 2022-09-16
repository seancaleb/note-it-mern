import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { alpha } from '@mui/material/styles';

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import { UpdateTask } from '@/features/task';
import { useState } from 'react';
import { useTask, useUser } from '@/hooks';
import Task from '@/interfaces/task';
import { useQueryDeleteTask } from '@/queries';

interface TaskTableToolbarProps {
    numSelected?: number;
    selected?: string | readonly string[];
}

/**
 * parameter selected is considered as the selected "id" or "ids"
 */
const TaskTableToolbar = ({ numSelected, selected }: TaskTableToolbarProps) => {
    const [open, setOpen] = useState(false);
    const { foundTask: task } = useTask(selected as string);
    const { user, token } = useUser();
    const { mutate, isLoading } = useQueryDeleteTask({ email: user?.email });

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    /**
     * Handle delete for selected items whether its a single one or an array
     */
    const handleDeleteTask = () => {
        if (selected) mutate({ id: selected, token });
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected &&
                    numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                theme.palette.action.activatedOpacity
                            ),
                    }),

                position: 'relative',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                }}
            >
                {isLoading ? <LinearProgress /> : null}
            </Box>

            {numSelected && numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Task
                </Typography>
            )}

            {task &&
            numSelected === 1 &&
            (task as Task).status !== 'completed' ? (
                <Tooltip title="Edit">
                    <IconButton onClick={handleOpen}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {numSelected && numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={handleDeleteTask}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {open ? (
                <UpdateTask
                    open={open}
                    handleClose={handleClose}
                    id={selected as string}
                />
            ) : null}
        </Toolbar>
    );
};

export default TaskTableToolbar;
