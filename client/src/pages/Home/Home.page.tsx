import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Logo from '@/components/Logo';
import { useLocation } from 'react-router-dom';
import { Login, Register } from '@/features/user';

const Home = () => {
    const location = useLocation();

    return (
        <Grid
            container
            sx={{
                height: '100vh',
            }}
        >
            <Logo isAbsolute />

            {/* Column One  */}
            <Grid item xs={12} lg={5} xl={4.5}>
                <Stack
                    p={{
                        xs: 4,
                        sm: 8,
                    }}
                    sx={{
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    {location.pathname === '/register' ? (
                        <Register />
                    ) : (
                        <Login />
                    )}
                </Stack>
            </Grid>

            {/* Column Two  */}
            <Grid
                item
                lg={7}
                xl={7.5}
                sx={{
                    position: 'relative',
                    display: {
                        xs: 'none',
                        lg: 'block',
                    },
                    backgroundImage: "url('../../bg-img.png')",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        maxWidth: 590,
                        position: 'absolute',
                        left: 80,
                        top: '20%',
                    }}
                >
                    Start listing down your daily{' '}
                    <Box component="span" sx={{ color: 'primary.main' }}>
                        tasks.
                    </Box>
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Home;
