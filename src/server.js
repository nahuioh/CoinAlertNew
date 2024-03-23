const express = require('express');
const cors = require('cors');
const request = require('request');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || '';

app.use(cors());


app.get('/api/list', (req, res) => {
  const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map';
  const options = {
    url: url,
    qs: {
        limit: 10 // Limitar los resultados a 10 criptomonedas
    },
    headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
    },
  };
  request.get(options, (error, response, body) => {
          if (error) {
              console.error('Error fetching coin map:', error);
              res.status(500).json({ error: 'Internal server error' });
          } else {
              const data = JSON.parse(body);
              res.json(data);
          }
      }
  );
});

// Ruta para obtener información de una criptomoneda por su símbolo
app.get('/api/cryptocurrencies', async (req, res) => {
  const cryptos = ['BTC', 'ETH', 'XRP', 'SOL', 'POL', 'NEXO']; // Ejemplo de criptomonedas a consultar

  try {
    const responses = await Promise.all(cryptos.map(crypto => getCryptoData(crypto)));
    const data = responses.reduce((acc, response, index) => {
      acc[cryptos[index]] = response.data[cryptos[index]]; // Acceder al objeto de datos de la criptomoneda específica
      return acc;
    }, {});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }

});

// Función para obtener información de una criptomoneda por su símbolo
const getCryptoData = (crypto) => {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}`;

  return new Promise((resolve, reject) => {
    request.get(
      {
        url: url,
        json: true,
        headers: {
          'X-CMC_PRO_API_KEY': API_KEY,
        },
      },
      (error, response, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
};
// Función para obtener el ID de una criptomoneda por su símbolo
const getCryptoId = async (symbol) => {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`;

  return new Promise((resolve, reject) => {
      request.get(
          {
              url: url,
              json: true,
              headers: {
                  'X-CMC_PRO_API_KEY': API_KEY,
              },
          },
          (error, response, data) => {
              if (error) {
                  reject(error);
              } else {
                  //const cryptoId = Object.keys(data.data[symbol]); // Obtener el ID de la criptomoneda
                  //console.log(cryptoId)
                  resolve(data.data[symbol].id);
              }
          }
      );
  });
};

// Ruta para obtener información completa de las criptomonedas
app.get('/api/cryptocurrency/info', async (req, res) => {
  const cryptos = ['BTC', 'ETH', 'XRP', 'SOL', 'POL', 'NEXO']; // Ejemplo de criptomonedas a consultar

  try {
      const cryptoIds = await Promise.all(cryptos.map(crypto => getCryptoId(crypto)));
      const responses = await Promise.all(cryptoIds.map(cryptoId => getCryptoInfo(cryptoId)));
      
      const data = responses.reduce((acc, response, index) => {
          const cryptoSymbol = cryptos[index];
          const cryptoId = cryptoIds[index];
          acc[cryptoSymbol] = response.data[cryptoId]; // Acceder al objeto de datos de la criptomoneda específica
          return acc;
      }, {});
      res.json(data);
  } catch (error) {
      console.error('Error al obtener la información de las criptomonedas:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
// Función para obtener información de una criptomoneda por su ID
const getCryptoInfo = (cryptoId) => {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${cryptoId}`;

  return new Promise((resolve, reject) => {
      request.get(
          {
              url: url,
              json: true,
              headers: {
                  'X-CMC_PRO_API_KEY': API_KEY,
              },
          },
          (error, response, data) => {
              if (error) {
                  reject(error);
              } else {
                  resolve(data);
              }
          }
      );
  });
};
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
