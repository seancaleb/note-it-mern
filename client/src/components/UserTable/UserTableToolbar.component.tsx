import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha } from '@mui/material/styles';

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import { useUser } from '@/hooks';
import { useQueryDeleteUser, useQueryChangeRole } from '@/queries';
import User from '@/interfaces/user';

interface UserTableToolbarProps {
    numSelected: number;
    selected: string | readonly string[];
}

const UserTableToolbar = ({ numSelected, selected }: UserTableToolbarProps) => {
    const { foundUser, token } = useUser(selected as string);
    const { mutate: mutateDeleteUser, isLoading: isLoadingDeleteUser } =
        useQueryDeleteUser();
    const { mutate: mutateChangeRole, isLoading: isLoadingChangeRole } =
        useQueryChangeRole();

    /**
     * Handle delete for selected users whether its a single one or an array
     */
    const handleDeleteUser = () => {
        mutateDeleteUser({ token, id: selected });
    };

    /**
     * Handle change role for a single user
     */
    const handleChangeRole = (foundUser: User) => {
        const { id, role } = foundUser;
        mutateChangeRole({ token, id, role });
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),

                position: 'relative',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                }}
            >
                {isLoadingDeleteUser || isLoadingChangeRole ? (
                    <LinearProgress />
                ) : null}
            </Box>

            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    User
                </Typography>
            )}

            {foundUser && numSelected === 1 ? (
                <Tooltip title="Change role">
                    <Button
                        size="medium"
                        sx={{
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                            px: 2,
                        }}
                        onClick={() => handleChangeRole(foundUser as User)}
                    >
                        Toggle role
                    </Button>
                </Tooltip>
            ) : null}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={handleDeleteUser}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
};

export default UserTableToolbar;
