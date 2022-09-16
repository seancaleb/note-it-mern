import Grid from '@mui/material/Grid';

import UserTable from '@/components/UserTable';
import DashboardHeading from '@/components/DashboardHeading';

const Users = () => {
    return (
        <Grid
            container
            rowGap={{ xs: 1.5, lg: 2 }}
            sx={{
                display: 'grid',
                height: '100%',
                maxHeight: '75vh',
            }}
            gridAutoRows="auto 1fr"
        >
            <DashboardHeading title="Active Users" />

            <Grid item xs={12} sx={{ height: '100%', overflowX: 'auto' }}>
                <UserTable />
            </Grid>
        </Grid>
    );
};

export default Users;
