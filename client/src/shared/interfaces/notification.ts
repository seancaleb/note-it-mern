import { AlertColor } from '@mui/material';

export interface Notification {
    open?: boolean;
    type?: AlertColor;
    message?: string;
    timeout?: number | null;
}
