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
import Logo from '@/components/Logo';

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
                position: 'relative',
                bgcolor: 'primary.main',
                width: '100%',
                minWidth: {
                    xs: 56,
                    sm: 64,
                    md: 256,
                    lg: 276,
                },
                maxWidth: {
                    xs: 56,
                    sm: 64,
                    md: 256,
                    lg: 276,
                },
                paddingBottom: '24px',
                pt: matches ? 0 : 3,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'unset',
            }}
        >
            <Box
                px={3}
                sx={{
                    minHeight: '90px',
                    display: matches ? 'flex' : 'none',
                    alignItems: 'center',
                }}
            >
                <Logo />
            </Box>

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
                mt={{ xs: '16px', md: '32px' }}
                px={{
                    xs: 'unset',
                    md: 3,
                }}
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
                            color="success"
                            startIcon={<AddIcon />}
                            onClick={handleOpen}
                            sx={{
                                textTransform: 'uppercase',
                            }}
                        >
                            New task
                        </Button>

                        <Typography
                            variant="overline"
                            sx={{
                                color: 'white',
                                opacity: 0.5,
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
                                    color: 'white',
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
        icon: ({ color }) => {
            return <DashboardIcon sx={{ color, fontSize: '18px' }} />;
        },
    },
    {
        id: nanoid(),
        name: 'Tasks',
        icon: ({ color }) => {
            return <TaskIcon sx={{ color, fontSize: '18px' }} />;
        },
    },
    {
        id: nanoid(),
        name: 'Users',
        icon: ({ color }) => {
            return <PeopleAltIcon sx={{ color, fontSize: '18px' }} />;
        },
    },
];
