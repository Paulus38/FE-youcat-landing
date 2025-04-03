import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B', // Vibrant coral red
      light: '#FF9E9E',
      dark: '#D14545',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4ECDC4', // Bright turquoise
      light: '#7DDFD9',
      dark: '#2D9B94',
      contrastText: '#fff',
    },
    error: {
      main: '#FF5252',
      light: '#FF7B7B',
      dark: '#C50E0E',
    },
    warning: {
      main: '#FFD166', // Bright yellow
      light: '#FFDF94',
      dark: '#DBA32A',
    },
    info: {
      main: '#6A8EFF', // Bright blue
      light: '#9DB5FF',
      dark: '#4268D6',
    },
    success: {
      main: '#06D6A0', // Bright green
      light: '#4EEBC1',
      dark: '#05A57A',
    },
    background: {
      default: '#F9F9FF', // Light lavender background
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Nunito',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.8rem',
      color: '#333333',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.2rem',
      color: '#333333',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.8rem',
      color: '#333333',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#333333',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.3rem',
      color: '#333333',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
      color: '#333333',
    },
  },
  shape: {
    borderRadius: 16, // More rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '10px 20px',
          fontWeight: 600,
          boxShadow: '0px 4px 0px rgba(0, 0, 0, 0.15)',
          '&:active': {
            boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(2px)',
          },
        },
        contained: {
          boxShadow: '0px 4px 0px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            boxShadow: '0px 6px 0px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.08)',
          borderRadius: 16,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #FF6B6B 0%, #FF9E9E 100%)',
        },
      },
    },
  },
});

export default theme; 