import React from 'react';

const CryptoTable = ({ cryptoData }) => {
    return (
        <div>
            <h2>Cryptocurrency Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>First Historical Data</th>
                        <th>Last Historical Data</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoData.map(crypto => (
                        <tr key={crypto.id}>
                            <td>{crypto.rank}</td>
                            <td>{crypto.name}</td>
                            <td>{crypto.symbol}</td>
                            <td>{crypto.first_historical_data}</td>
                            <td>{crypto.last_historical_data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoTable;
