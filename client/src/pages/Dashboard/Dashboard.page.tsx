import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { nanoid } from 'nanoid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';

import { StatusCount } from '@/interfaces/task';
import DashboardHeading from '@/components/DashboardHeading';
import { useTask } from '@/hooks';
import Skeleton from '@mui/material/Skeleton';

const Dashboard = () => {
    const { statusCount, tasks } = useTask();

    return (
        <Stack spacing={{ xs: 1.5, lg: 2 }}>
            <DashboardHeading title="Dashboard" />

            <Grid
                container
                gap={{ xs: 1.5, lg: 2 }}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                }}
            >
                <StatusView title="all" count={tasks ? tasks.length : 0} />
                {statusCount.map((status) => {
                    const { title, count } = status;
                    return (
                        <StatusView
                            key={nanoid()}
                            title={title}
                            count={count}
                        />
                    );
                })}
            </Grid>
        </Stack>
    );
};

export default Dashboard;

function StatusView({ title, count }: StatusCount) {
    const matches = useMediaQuery('(min-width: 600px)');
    const { tasks } = useTask();

    return (
        <Grid
            item
            sx={{
                gridColumn: {
                    xs: 'span 6',
                    lg: 'span 3',
                },
            }}
        >
            {tasks === null ? (
                <Skeleton animation={false} />
            ) : (
                <Paper
                    sx={{
                        width: '100%',
                        borderRadius: 1,
                        px: 2,
                        py: { xs: 0.5, sm: 1, lg: 1.5 },
                        borderLeft: '3px solid',
                        borderColor: 'primary.light',
                    }}
                >
                    <Typography
                        variant="overline"
                        component="div"
                        sx={{
                            fontWeight: '600',
                            color: 'primary.main',
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography variant={matches ? 'h5' : 'h6'}>
                        {count}
                    </Typography>
                </Paper>
            )}
        </Grid>
    );
}
