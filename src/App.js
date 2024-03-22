// App.js

import React, { useEffect, useState } from 'react';

function App() {
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/cryptocurrency/BTC')
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        setCryptoData(data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  function getPrice(cryptoData) {
    return cryptoData?.data?.BTC?.quote?.USD?.price || 'Price not available';
  }
  return (
    <div className="App">
      {cryptoData && (
        <div>
        <p>Price: {getPrice(cryptoData)}</p>
      </div>
      )}
    </div>
  );
}

export default App;
