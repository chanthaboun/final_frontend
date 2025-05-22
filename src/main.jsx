

// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';

// ສ້າງຮູບແບບສີຫຼັກຂອງແອັບ
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Noto Sans Lao", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// ເລີ່ມຕົ້ນແອັບ React
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);