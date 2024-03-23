import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const CryptoTable = ({ cryptoData }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const sortedCryptoData = [...cryptoData].sort((a, b) => {
        if (sortConfig.key !== null) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });

    const requestSort = key => {
        let direction = 'asc';
        if (sortConfig.key === key) {
            direction = sortConfig.direction === 'asc' ? 'desc' : null;
        }
        setSortConfig(direction ? { key, direction } : { key: null, direction: 'asc' });
    };

    const getClassNamesFor = name => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <div className="container mt-5">
            <h2>Cryptocurrency Data</h2>
            <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th onClick={() => requestSort('rank')} className={getClassNamesFor('rank')}>
                                        <div className="d-flex align-items-center justify-content-between">
                                            Rank
                                            {sortConfig.key === 'rank' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                                        </div>
                                    </th>
                                    <th onClick={() => requestSort('name')} className={getClassNamesFor('name')}>
                                        <div className="d-flex align-items-center justify-content-between">
                                            Name
                                            {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                                        </div>
                                    </th>
                                    <th onClick={() => requestSort('symbol')} className={getClassNamesFor('symbol')}>
                                        <div className="d-flex align-items-center justify-content-between">
                                            Symbol
                                            {sortConfig.key === 'symbol' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                                        </div>
                                    </th>
                                    <th onClick={() => requestSort('first_historical_data')} className={getClassNamesFor('first_historical_data')}>
                                        <div className="d-flex align-items-center justify-content-between">
                                            First Historical Data
                                            {sortConfig.key === 'first_historical_data' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                                        </div>
                                    </th>
                                    <th onClick={() => requestSort('last_historical_data')} className={getClassNamesFor('last_historical_data')}>
                                        <div className="d-flex align-items-center justify-content-between">
                                            Last Historical Data
                                            {sortConfig.key === 'last_historical_data' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedCryptoData.map(crypto => (
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
                </div>
            </div>
        </div>
    );
};

export default CryptoTable;
