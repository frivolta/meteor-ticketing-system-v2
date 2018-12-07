import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
   palette: {
        primary: {
            light: '#4dabf5',
            main: '#2196f3',
            dark: '#1769aa',
            contrastText: '#fff',
          },
          secondary: {
            light: '#f73378',
            main: '#f50057',
            dark: '#ab003c',
            contrastText: '#fff',
          },
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif'
        ].join(','),
    }
});