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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
