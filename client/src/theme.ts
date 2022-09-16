import { createTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

const font = "'Inter', sans-serif";
const theme = createTheme({
    typography: {
        fontFamily: font,
        button: {
            textTransform: 'none',
        },
    },
    palette: {
        primary: {
            main: colors.indigo[800],
            A700: colors.indigo.A700,
        },
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                filledSuccess: {
                    backgroundColor: colors.indigo[100],
                    color: colors.indigo[900],
                },
                filledError: {
                    backgroundColor: colors.red[100],
                    color: colors.red[900],
                },
                filledWarning: {
                    backgroundColor: 'orange',
                    color: 'white',
                },
                filledInfo: {
                    backgroundColor: colors.green[100],
                    color: colors.green[900],
                },
            },
        },
    },
});

export default theme;
