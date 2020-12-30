import React from 'react';
import './App.css';
import AuthProvider from './context/AuthContext';
import LoginProvider from './context/LoginContext';
import Routes from './routes';

function App() {
  return (
    <div className="container">
      <div className="content">
        <LoginProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </LoginProvider>
      </div>
    </div>
  );
}

export default App;
