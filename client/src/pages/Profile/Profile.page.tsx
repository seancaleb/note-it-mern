import DashboardHeading from '@/components/DashboardHeading';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { EditProfile } from '@/features/user';

const Profile = () => {
    return (
        <Stack spacing={{ xs: 1.5, lg: 2 }} sx={{ height: '100%' }}>
            <DashboardHeading title="Profile" />

            <Paper
                sx={{
                    height: 'auto',
                    width: '100%',
                    px: {
                        xs: 2,
                        md: 3,
                    },
                    py: 4,
                }}
                elevation={0}
            >
                <EditProfile />
            </Paper>
        </Stack>
    );
};

export default Profile;
