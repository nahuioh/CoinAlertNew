import React, { useEffect, useState } from 'react';
import Table from './Table';
import axios from 'axios';

const CryptoList = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [limit, setLimit] = useState(5); // Inicializar el límite en 5
    const [page, setPage] = useState(1); // Inicializar la página en 1
    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/list?page=${page}&limit=${limit}`);
                setCryptoData(response.data.data); // Suponiendo que el objeto de datos tiene una propiedad 'data' que contiene la lista de criptomonedas
            } catch (error) {
                console.error('Error fetching crypto data:', error);
            }
        };

        fetchData();
    }, [page, limit]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1); // Incrementar el número de página en 1 al hacer clic en "Load More"
        setLimit(prevLimit => prevLimit + 10); // Incrementar el límite en 10 al hacer clic en "Load More"
    };

    return (
        <div>
            <button className="btn btn-primary float-right" onClick={loadMore}>Load More</button>
            <Table cryptoData={cryptoData} limit={limit} />
        </div>
    );
};

export default CryptoList;
