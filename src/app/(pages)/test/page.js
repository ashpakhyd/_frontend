"use client"
import React, { useState } from 'react';
import axios from 'axios';

const GSTINLookup = () => {
    const [gstin, setGstin] = useState('');
    const [gstinData, setGstinData] = useState(null);
    const [error, setError] = useState(null);

    const fetchGSTINDetails = async () => {
        const options = {
            method: 'GET',
            url: `https://apisetu.gov.in/gstn/v1/taxpayers/${gstin}`,
        };

        try {
            const response = await axios.request(options);
            setGstinData(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching GSTIN details:', error);
            setError('Failed to fetch GSTIN details. Please check the GSTIN or try again later.');
        }
    };

    const handleInputChange = (e) => {
        setGstin(e.target.value);
    };

    return (
        <div>
            <h2>GSTIN Lookup</h2>
            <input
                type="text"
                placeholder="Enter GSTIN"
                value={gstin}
                onChange={handleInputChange}
            />
            <button onClick={fetchGSTINDetails}>Search</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {gstinData && (
                <div>
                    <h3>GSTIN Details:</h3>
                    <p><strong>Legal Name:</strong> {gstinData.legalName}</p>
                    <p><strong>Trade Name:</strong> {gstinData.tradeName}</p>
                    <p><strong>Status:</strong> {gstinData.status}</p>
                </div>
            )}
        </div>
    );
};

export default GSTINLookup;
