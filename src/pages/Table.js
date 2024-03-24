import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const CryptoTable = ({ cryptoData, limit }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Función para manejar la clasificación de la tabla
    const requestSort = key => {
        let direction = 'asc';
        if (sortConfig.key === key) {
            direction = sortConfig.direction === 'asc' ? 'desc' : null;
        }
        setSortConfig(direction ? { key, direction } : { key: null, direction: 'asc' });
    };

    // Función para obtener las clases de estilo para las columnas
    const getClassNamesFor = name => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options);
    };

    return (
        <div className="table-responsive">
            <Table responsive className=" table-hover" variant="dark">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('rank')} className={getClassNamesFor('rank')}>
                            <div className="d-flex align-items-center justify-content-between">
                                Posición
                                {sortConfig.key === 'rank' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </div>
                        </th>
                        <th onClick={() => requestSort('name')} className={getClassNamesFor('name')}>
                            <div className="d-flex align-items-center justify-content-between">
                                Nombre
                                {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </div>
                        </th>
                        <th onClick={() => requestSort('symbol')} className={getClassNamesFor('symbol')}>
                            <div className="d-flex align-items-center justify-content-between">
                                Símbolo
                                {sortConfig.key === 'symbol' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </div>
                        </th>
                        <th onClick={() => requestSort('first_historical_data')} className={getClassNamesFor('first_historical_data')}>
                            <div className="d-flex align-items-center justify-content-between">
                                Primera Fecha Histórica
                                {sortConfig.key === 'first_historical_data' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </div>
                        </th>
                        <th onClick={() => requestSort('last_historical_data')} className={getClassNamesFor('last_historical_data')}>
                            <div className="d-flex align-items-center justify-content-between">
                                Última Fecha Histórica
                                {sortConfig.key === 'last_historical_data' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoData.map(crypto => (
                        <tr key={crypto.id}>
                            <td>{crypto.rank}</td>
                            <td>{crypto.name}</td>
                            <td>{crypto.symbol}</td>
                            <td>{formatDate(crypto.first_historical_data)}</td>
                            <td>{formatDate(crypto.last_historical_data)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CryptoTable;
