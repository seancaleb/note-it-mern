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
            main: colors.indigo[900],
            50: colors.indigo[50],
            200: colors.indigo[200],
            500: colors.indigo[500],
            800: colors.indigo[800],
        },

        success: {
            main: colors.indigo[50],
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
