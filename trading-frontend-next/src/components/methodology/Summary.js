import React, { useState, useEffect } from 'react';

const Summary = () => {
    const [currencyScores, setCurrencyScores] = useState({}); // Tracks scores for all currencies

    useEffect(() => {
        fetchCurrencyData();
    }, []);

    const fetchCurrencyData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/currencies/');
            const data = await response.json(); // Assume this data matches the format you shared

            const updatedScores = {}; // Initialize a new object to store scores

            // Initialize scores for all currencies
            Object.keys(data[0]).forEach((key) => {
                if (key !== 'date') { // Skip the 'date' field
                    updatedScores[key] = 0; // Start with score 0 for each currency
                }
            });

            // Iterate through all data and calculate scores
            for (let i = 1; i < data.length; i++) {
                const previous = data[i - 1]; // Previous object
                const current = data[i]; // Current object

                Object.keys(current).forEach((key) => {
                    if (key !== 'date') { // Skip the 'date' field
                        const previousValue = parseFloat(previous[key]);
                        const currentValue = parseFloat(current[key]);

                        if (currentValue > previousValue) {
                            updatedScores[key] += 1; // Increment score if value increased
                        } else if (currentValue < previousValue) {
                            updatedScores[key] -= 1; // Decrement score if value decreased
                        }
                    }
                });
            }

            setCurrencyScores(updatedScores); // Update state with the final scores
            console.log('Final Scores:', updatedScores); // Debugging
        } catch (error) {
            console.error('Error fetching currency data:', error);
        }
    };

    return (
        <div>
            <h1>Currency Scores</h1>
            {Object.keys(currencyScores).map((currencyName) => (
                <div key={currencyName}>
                    <strong>{currencyName}:</strong> {currencyScores[currencyName]}
                </div>
            ))}
        </div>
    );
};

export default Summary;
