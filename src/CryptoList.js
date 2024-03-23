import React, { useEffect, useState } from 'react';
import CryptoTable  from "./CryptoTable";
import axios from 'axios';

const CoinTable = () => {
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/list'); // Cambia la URL según la ubicación de tu servidor
                console.log(response.data.data);
                setCryptoData(response.data.data); // Aquí asumimos que el objeto de datos tiene una propiedad 'data' que contiene la lista de criptomonedas
            } catch (error) {
                console.error('Error fetching crypto data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <CryptoTable cryptoData={cryptoData}/>
        </div>
    );
};

export default CoinTable;
