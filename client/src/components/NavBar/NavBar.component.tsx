import { useState, MouseEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import Logo from '@/components/Logo';
import Stack from '@mui/material/Stack';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

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
            position="absolute"
            elevation={1}
            sx={{ bgcolor: 'white', top: 0, left: 0, right: 0, px: { md: 1 } }}
        >
            <Container maxWidth={false} sx={{ maxWidth: '100%' }}>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Logo />
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography
                                variant="body2"
                                component="div"
                                color="text.primary"
                            >
                                Hi, {user?.firstName}
                            </Typography>

                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    sx={{
                                        height: 40,
                                        width: 40,
                                        fontSize: '15px',
                                        bgcolor: 'primary.light',
                                    }}
                                >
                                    {user?.firstName[0]}
                                    {user?.lastName[0]}
                                </Avatar>
                            </IconButton>
                        </Stack>
                        <Menu
                            sx={{ mt: '45px' }}
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
                                    width: 175,
                                },
                            }}
                            elevation={4}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={() => handleCloseUserMenu(setting)}
                                >
                                    <ListItemIcon>
                                        {setting === 'Profile' ? (
                                            <PersonIcon
                                                fontSize="medium"
                                                sx={{ color: 'primary.light' }}
                                            />
                                        ) : (
                                            <LogoutIcon
                                                fontSize="medium"
                                                sx={{ color: 'primary.light' }}
                                            />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            {setting}
                                        </Typography>
                                    </ListItemText>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
