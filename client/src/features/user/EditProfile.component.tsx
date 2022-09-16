import { useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { EditForm } from '@/features/user';
import { useUser, useTask } from '@/hooks';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@/components/Chip';

const EditProfile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useUser();
    const { tasks } = useTask();
    const matches = useMediaQuery('(min-width: 600px)');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid
            container
            columnGap={2}
            rowGap={3}
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                alignItems: 'center',
            }}
        >
            <Grid
                item
                sx={{
                    gridColumn: {
                        xs: 'span 6',
                        sm: 'span 8',
                    },
                }}
            >
                <Stack
                    direction="row"
                    spacing={{ xs: 2, md: 3 }}
                    sx={{ alignItems: 'center' }}
                >
                    <Avatar
                        sx={{
                            height: {
                                xs: 65,
                                sm: 75,
                            },
                            width: {
                                xs: 65,
                                sm: 75,
                            },
                            bgcolor: 'primary.light',
                        }}
                    >
                        {user?.firstName[0]}
                        {user?.lastName[0]}
                    </Avatar>

                    {matches ? (
                        <div>
                            <Typography variant="h6">
                                {user?.firstName} {user?.lastName}
                            </Typography>
                            {tasks === null ? (
                                <Skeleton animation={false} />
                            ) : (
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                    sx={{ alignItems: 'center' }}
                                >
                                    <Typography
                                        variant="overline"
                                        color="primary"
                                    >
                                        Today's task: {tasks.length}
                                    </Typography>

                                    <Chip type={user!.role} />
                                </Stack>
                            )}
                        </div>
                    ) : null}
                </Stack>
            </Grid>

            <Grid
                item
                sx={{
                    gridColumn: {
                        xs: 'span 6',
                        sm: 'span 4',
                    },
                    justifySelf: 'flex-end',
                }}
            >
                <Button
                    variant="outlined"
                    onClick={handleOpen}
                    disabled={open === true}
                >
                    Edit Profile
                </Button>
            </Grid>

            {!matches ? (
                <Grid
                    item
                    sx={{
                        gridColumn: {
                            xs: 'span 12',
                        },
                    }}
                >
                    <Typography variant="h6">
                        {user?.firstName} {user?.lastName}
                    </Typography>
                    {tasks === null ? (
                        <Skeleton animation={false} />
                    ) : (
                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{ alignItems: 'center' }}
                        >
                            <Typography variant="overline" color="primary">
                                Today's task: {tasks.length}
                            </Typography>

                            <Chip type={user!.role} />
                        </Stack>
                    )}
                </Grid>
            ) : null}

            {open ? <EditForm handleClose={handleClose} /> : null}
        </Grid>
    );
};

export default EditProfile;
