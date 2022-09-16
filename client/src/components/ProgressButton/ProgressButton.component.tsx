import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

type ProgressButtonProps = {
    label?: string;
};

const ProgressButton = ({ label }: ProgressButtonProps) => {
    return (
        <Stack
            role="progressbar"
            direction="row"
            spacing={1.5}
            alignItems="center"
        >
            {label ? <Typography variant="body2">{label}</Typography> : null}
            <CircularProgress color="inherit" size={16} />
        </Stack>
    );
};

export default ProgressButton;
