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

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <CryptoList /> 
      </div>
    </div>
  );
}

export default App;
