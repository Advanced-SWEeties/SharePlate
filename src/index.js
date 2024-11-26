import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from '@mui/material/styles'; // Move this up
import theme from './theme'; // Move this up as well
import CssBaseline from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
          <CssBaseline />
          <App />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
