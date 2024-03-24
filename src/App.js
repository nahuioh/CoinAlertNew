// App.js

import React from 'react';
import CryptoList from './CryptoList';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el archivo CSS de Bootstrap

function App() {
  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
