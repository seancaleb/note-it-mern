import MuiChip from '@mui/material/Chip';
import { Status } from '@/interfaces/task';
import { colors } from '@mui/material';
import { Role } from '@/interfaces/user';

interface ChipProps {
    type: Status | Role;
}

const Chip = ({ type }: ChipProps) => {
    let color: {
        color: string;
        bgcolor: string;
    };

    switch (type) {
        case 'active':
        case 'admin':
            color = {
                bgcolor: colors.blue[100],
                color: colors.blue[900],
            };
            break;
        case 'pending':
        case 'user':
            color = {
                bgcolor: colors.orange[100],
                color: colors.orange[900],
            };
            break;
        default:
            color = {
                bgcolor: colors.green[100],
                color: colors.green[900],
            };
            break;
    }

    return (
        <MuiChip
            label={type.toUpperCase()}
            size="small"
            sx={{
                fontSize: '10px',
                fontWeight: 500,
                bgcolor: color.bgcolor,
                color: color.color,
            }}
        />
    );
};

export default Chip;
