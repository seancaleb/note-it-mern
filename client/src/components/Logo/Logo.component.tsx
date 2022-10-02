import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import useMediaQuery from '@mui/material/useMediaQuery';

type LogoProps = {
    isAbsolute?: boolean;
};

const Logo = ({ isAbsolute = false }: LogoProps) => {
    const matches = useMediaQuery('(min-width: 900px)');

    return (
        <Stack
            direction="row"
            spacing={1.5}
            sx={{
                color: 'primary.200',
                position: isAbsolute ? 'absolute' : 'relative',
                top: isAbsolute ? 32 : 'unset',
                left: isAbsolute ? 32 : 'unset',
                alignItems: 'center',
            }}
        >
            <TaskAltIcon sx={{ fontSize: '24px' }} />
            <Typography
                variant="h6"
                component="div"
                sx={{
                    color: isAbsolute ? 'primary.main' : 'white',
                    fontWeight: isAbsolute ? '600' : '500',
                    fontSize: '18px',
                }}
            >
                NoteIT
            </Typography>
        </Stack>
    );
};

export default Logo;
