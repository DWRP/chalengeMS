import React from 'react';
import './App.css';
import AuthProvider from './context/AuthContext';
import Routes from './routes';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[900],
      contrastText: '#FFF',
    },
    secondary: {
      main: '#ff1744',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      
      <div className="container">
        <div className="content">
            <AuthProvider>
              <Routes />
            </AuthProvider>
        </div>
      </div>

    </ThemeProvider>
  );
}

export default App;
