import React, { useEffect, useState } from 'react';

const BitcoinInfo = () => {
    const [cryptoData, setCryptoData] = useState(null);

   /* useEffect(() => {
        fetch('http://localhost:5000/api/cryptocurrencies')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCryptoData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);*/

    return (
        <div className="card">
            
        </div>
    );
}

export default BitcoinInfo;
