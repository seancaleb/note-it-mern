import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TodayIcon from '@mui/icons-material/Today';
import useMediaQuery from '@mui/material/useMediaQuery';
import { format } from 'date-fns';
import { DeleteAllUserTasks } from '@/features/task';

interface DashboardHeadingProps {
    title: string;
}

const DashboardHeading = ({ title }: DashboardHeadingProps) => {
    const matches = useMediaQuery('(min-width: 900px)');
    const today = format(Date.now(), 'EEEE, LLLL do');

    return (
        <Stack
            direction={{
                xs: 'column',
                sm: 'row',
            }}
            sx={{
                justifyContent: 'space-between',
                alignItems: {
                    xs: 'stretch',
                    sm: 'center',
                },
            }}
            spacing={2}
        >
            <Stack spacing={1}>
                <Typography
                    variant={matches ? 'h5' : 'h6'}
                    component="div"
                    sx={{
                        fontWeight: '500',
                        color: 'primary.main',
                    }}
                >
                    {title}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <TodayIcon
                        fontSize="medium"
                        sx={{ color: 'primary.light' }}
                    />
                    <Typography
                        variant="body2"
                        component="div"
                        color="text.primary"
                    >
                        {today}
                    </Typography>
                </Stack>
            </Stack>

            {location.pathname === '/dashboard' ? <DeleteAllUserTasks /> : null}
        </Stack>
    );
};

export default DashboardHeading;
