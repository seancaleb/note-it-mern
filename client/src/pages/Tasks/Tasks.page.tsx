import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';

import TaskTable from '@/components/TaskTable';
import { Status } from '@/interfaces/task';

const Dashboard = () => {
    const [value, setValue] = useState<Lowercase<Status | 'all'>>('all');
    const matches = useMediaQuery('(min-width: 900px)');

    // For the tab width
    const matches360px = useMediaQuery('(max-width: 360px)');
    const matches480px = useMediaQuery('(max-width: 480px)');
    const greaterThan480px = useMediaQuery('(min-width: 481px)');
    const [width, setWidth] = useState<string>('100%');

    const handleChange = (
        event: React.SyntheticEvent,
        newValue: Lowercase<Status>
    ) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (matches360px) setWidth('250px');
        else if (matches480px) setWidth('275px');
        else setWidth('100%');
    }, [matches360px, matches480px]);

    return (
        <Grid
            container
            rowGap={{ xs: 1.5, lg: 2 }}
            sx={{ display: 'grid', height: '100%', maxHeight: '80vh' }}
            gridAutoRows="auto 1fr"
        >
            <Grid item xs={12}>
                <Paper sx={{ maxWidth: width }} elevation={0}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                        allowScrollButtonsMobile
                        scrollButtons
                        variant={greaterThan480px ? 'fullWidth' : 'scrollable'}
                    >
                        <Tab value="all" label="All" />
                        <Tab value="active" label="Active" />
                        <Tab value="pending" label="Pending" />
                        <Tab value="completed" label="Completed" />
                    </Tabs>
                </Paper>
            </Grid>

            <Grid item xs={12} sx={{ overflowX: 'auto' }}>
                <TaskTable status={value} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
