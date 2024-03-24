// App.js

import React from 'react';
import CryptoList from './pages/CryptoList';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el archivo CSS de Bootstrap
import './App.css';

function App() {
  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">COIN ALERT NEWS</a>
        </div>
      </nav>
      <div className="container mt-4">
        <CryptoList /> 
      </div>
    </div>
  );
}

export default App;
