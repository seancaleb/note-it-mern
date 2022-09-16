import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';

import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddIcon from '@mui/icons-material/Add';

import useMediaQuery from '@mui/material/useMediaQuery';

import { SidePanelMenu, SidePanelButton } from '@/components/SidePanel';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { AddTask } from '@/features/task';
import { useUser } from '@/hooks';

const SidePanel = () => {
    const matches = useMediaQuery('(min-width: 900px)');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { user } = useUser();

    const handleNavigate = (path: string) => {
        const lowercasedPath = path.toLowerCase();

        if (lowercasedPath === 'dashboard') navigate('');
        else navigate(lowercasedPath);
    };

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    return (
        <Paper
            elevation={1}
            sx={{
                bgcolor: 'white',
                width: '100%',
                minWidth: {
                    xs: 56,
                    sm: 64,
                    md: 256,
                    lg: 324,
                },
                maxWidth: {
                    xs: 56,
                    sm: 64,
                    md: 256,
                    lg: 324,
                },
                paddingTop: '60px',
                paddingBottom: '24px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'unset',
            }}
        >
            <Stack spacing={{ xs: 2, md: 0 }}>
                {/* Display side panel menu button list  */}
                {menus.map((menu) => {
                    if (menu.name === 'Users' && user?.role === 'user')
                        return null;

                    return (
                        <SidePanelButton
                            key={menu.id}
                            menu={{ ...menu }}
                            handleNavigate={handleNavigate}
                        />
                    );
                })}
            </Stack>

            <Stack
                px={{ xs: 'unset', md: 4 }}
                mt={{ xs: '16px', md: '32px' }}
                sx={{
                    justifyContent: 'space-between',
                    flexGrow: 1,
                }}
            >
                {matches ? (
                    <>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpen}
                        >
                            New task
                        </Button>

                        <Typography
                            variant="overline"
                            sx={{
                                color: '#757575',
                                fontSize: '10px',
                                fontWeight: '500',
                            }}
                        >
                            &copy; Developed by Sean Caleb 2022
                        </Typography>
                    </>
                ) : (
                    <Box sx={{ alignSelf: 'center' }}>
                        <IconButton onClick={handleOpen}>
                            <AddIcon
                                sx={{
                                    color: 'primary.light',
                                }}
                                fontSize="medium"
                            />
                        </IconButton>
                    </Box>
                )}
            </Stack>

            {open ? <AddTask open={open} handleClose={handleClose} /> : null}
        </Paper>
    );
};

export default SidePanel;

const menus: SidePanelMenu[] = [
    {
        id: nanoid(),
        name: 'Dashboard',
        icon: (
            <DashboardIcon sx={{ color: 'primary.light' }} fontSize="medium" />
        ),
    },
    {
        id: nanoid(),
        name: 'Tasks',
        icon: <TaskIcon sx={{ color: 'primary.light' }} fontSize="medium" />,
    },
    {
        id: nanoid(),
        name: 'Users',
        icon: (
            <PeopleAltIcon sx={{ color: 'primary.light' }} fontSize="medium" />
        ),
    },
];
