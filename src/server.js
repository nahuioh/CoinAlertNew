const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const request = require('request');
require('dotenv').config();

const API_KEY = process.env.API_KEY || '';
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/api/cryptocurrency/:crypto', (req, res) => {
  const crypto = req.params.crypto;
  const url2 = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}`;

  request.get(
    {
      url: url2,
      json: true,
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
    },
    (error, response, data) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      res.send({
        data: data,
      });
    }
  );
});

app.get('/api/cryptocurrency/info/:crypto', (req, res) => {  
  const crypto = req.params.crypto;
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${crypto}`
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
        return res.send({
          error: error,
        });
      }

      res.send({
        data: data,
      });
    }
  );
});

app.get('/api/content/posts/top', (req, res) => {  
  const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest`
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
        return res.send({
          error: error,
        });
      }

      res.send({
        data: data,
      });
    }
  );
});

app.use(
  cors({
    origin: 'http://localhost:5001', // Allow requests from this origin
  })
);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
