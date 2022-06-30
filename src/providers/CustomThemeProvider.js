import { ThemeProvider, createTheme } from '@mui/material';
import PropTypes from 'prop-types';

const theme = createTheme({
  palette: {
    background: {
      default: '#fff',
    },
    primary: {
      light: '#5fb7b8',
      main: '#38a6a7',
      dark: '#277474',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fae084',
      main: '#f9d966',
      dark: '#ae9747',
      contrastText: '#000',
    },
    text: {
      primary: '#000',
      secondary: '#fff',
    },
  },
});

export default function CustomThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

CustomThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
