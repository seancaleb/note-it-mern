import { useState, MouseEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useUser } from '@/hooks';
import { useNavigate } from 'react-router-dom';

const settings = ['Profile', 'Logout'];

const NavBar = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    /**
     * Get user details in redux store
     */
    const { user, logoutUser } = useUser();
    const navigate = useNavigate();

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting: string) => {
        if (setting === 'Logout') {
            logoutUser();
            setAnchorElUser(null);
            navigate('/');
        } else if (setting === 'Profile') {
            navigate('/dashboard/profile');
        }
        setAnchorElUser(null);
    };

    return (
        <AppBar
            elevation={0}
            sx={{
                bgcolor: 'white',
                position: 'relative',
                height: '66px',
                display: 'flex',
                alignItems: 'center',
                px: {
                    xs: 2,
                    md: 3,
                },
                borderRadius: 1,
            }}
        >
            <Toolbar
                disableGutters
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    height: 'inherit',
                }}
            >
                <Box
                    sx={{
                        flexGrow: 0,
                    }}
                >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                            sx={{
                                height: 35,
                                width: 35,
                                fontSize: '14px',
                                bgcolor: 'primary.light',
                            }}
                        >
                            {user?.firstName[0]}
                            {user?.lastName[0]}
                        </Avatar>

                        <Stack
                            direction="row"
                            spacing={0.5}
                            sx={{ cursor: 'pointer', alignItems: 'center' }}
                            onClick={handleOpenUserMenu}
                            aria-controls="menu-appbar"
                        >
                            <Typography
                                variant="subtitle2"
                                component="div"
                                color="text.secondary"
                            >
                                {user?.firstName}
                            </Typography>
                            <KeyboardArrowDownIcon
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '20px',
                                }}
                            />
                        </Stack>
                    </Stack>
                    <Menu
                        sx={{ mt: '40px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        PaperProps={{
                            style: {
                                width: 176,
                            },
                        }}
                        elevation={1}
                    >
                        {settings.map((setting) => (
                            <MenuItem
                                key={setting}
                                onClick={() => handleCloseUserMenu(setting)}
                            >
                                <ListItemIcon>
                                    {setting === 'Profile' ? (
                                        <PersonIcon
                                            sx={{
                                                color: 'primary.main',
                                                fontSize: '18px',
                                            }}
                                        />
                                    ) : (
                                        <LogoutIcon
                                            sx={{
                                                color: 'primary.main',
                                                fontSize: '18px',
                                            }}
                                        />
                                    )}
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            color: 'text.main',
                                            fontSize: '15px',
                                        }}
                                    >
                                        {setting}
                                    </Typography>
                                </ListItemText>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default NavBar;
