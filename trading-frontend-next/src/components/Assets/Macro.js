import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const MAJOR_CURRENCIES = ['AUD', 'CAD', 'CHF', 'EUR', 'GBP', 'JPY', 'NZD', 'USD'];

const WEIGHTS = {
    // Commodity currencies (AUD, CAD, NZD)
    AUD: { trade_balance: 0.20, consumer_confidence: 0.10, gdp: 0.25, interest_rate: 0.20, retail_sales: 0.10, unemployment: 0.15 },
    CAD: { trade_balance: 0.20, consumer_confidence: 0.10, gdp: 0.25, interest_rate: 0.20, retail_sales: 0.10, unemployment: 0.15 },
    NZD: { trade_balance: 0.20, consumer_confidence: 0.10, gdp: 0.25, interest_rate: 0.20, retail_sales: 0.10, unemployment: 0.15 },
    
    // Safe-haven currencies (CHF, JPY)
    CHF: { trade_balance: 0.25, consumer_confidence: 0.05, gdp: 0.10, interest_rate: 0.40, retail_sales: 0.05, unemployment: 0.15 },
    JPY: { trade_balance: 0.25, consumer_confidence: 0.05, gdp: 0.10, interest_rate: 0.45, retail_sales: 0.05, unemployment: 0.10 },
    
    // Major reserve currencies (USD, EUR)
    USD: { trade_balance: 0.10, consumer_confidence: 0.15, gdp: 0.20, interest_rate: 0.35, retail_sales: 0.10, unemployment: 0.10 },
    EUR: { trade_balance: 0.10, consumer_confidence: 0.15, gdp: 0.20, interest_rate: 0.35, retail_sales: 0.10, unemployment: 0.10 },
    
    // GBP (unique characteristics)
    GBP: { trade_balance: 0.15, consumer_confidence: 0.15, gdp: 0.20, interest_rate: 0.30, retail_sales: 0.10, unemployment: 0.10 },
  };

const MIN_VALUES = {
  trade_balance: -100,
  consumer_confidence: 0,
  gdp: -10,
  interest_rate: 0,
  retail_sales: -20,
  unemployment: 0,
};

const MAX_VALUES = {
  trade_balance: 100,
  consumer_confidence: 15,
  gdp: 10,
  interest_rate: 10,
  retail_sales: 20,
  unemployment: 20,
};

const Macro = () => {
  const [currencyData, setCurrencyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/datavital2/');
        console.log('API Response:', response.data);

        // Initialize complete data structure with default values
        const transformedData = MAJOR_CURRENCIES.reduce((acc, currency) => {
          acc[currency] = {
            trade_balance: 0,
            consumer_confidence: 0,
            gdp: 0,
            interest_rate: 0,
            retail_sales: 0,
            unemployment: 0,
          };
          return acc;
        }, {});

        // Process each indicator row from API
        response.data.forEach(row => {
          const indicatorKey = getIndicatorKey(row.indicator);
          if (!indicatorKey) return;

          MAJOR_CURRENCIES.forEach(currency => {
            if (row[currency] !== undefined && row[currency] !== null) {
              transformedData[currency][indicatorKey] = parseFloat(row[currency]) || 0;
            }
          });
        });

        setCurrencyData(transformedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getIndicatorKey = (indicatorName) => {
    const mapping = {
      'Balance of Trade': 'trade_balance',
      'Consumer Confidence': 'consumer_confidence',
      'GDP Annual Growth Rate': 'gdp',
      'Interest Rate': 'interest_rate',
      'Retail Sales MoM': 'retail_sales',
      'Unemployment Rate': 'unemployment',
    };
    return mapping[indicatorName];
  };

  const normalizeValue = (key, value) => {
    if (key === 'unemployment') {
      return 100 - ((value - MIN_VALUES[key]) / (MAX_VALUES[key] - MIN_VALUES[key]) * 100);
    }
    return ((value - MIN_VALUES[key]) / (MAX_VALUES[key] - MIN_VALUES[key]) * 100);
  };

  const calculateScore = (data, currencyCode) => {
    const weights = WEIGHTS[currencyCode];
    let score = 0;

    Object.keys(weights).forEach((key) => {
      const value = data[key] || 0;
      const normalizedValue = Math.min(100, Math.max(0, normalizeValue(key, value)));
      score += normalizedValue * weights[key];
    });

    return score.toFixed(1);
  };

  const columns = [
    { field: 'currency', headerName: 'Currency', width: 100 },
    { field: 'interest_rate', headerName: 'Interest Rate (%)', width: 120 },
    { field: 'consumer_confidence', headerName: 'Consumer Confidence', width: 150 },
    { field: 'gdp', headerName: 'GDP Growth (%)', width: 120 },
    { field: 'retail_sales', headerName: 'Retail Sales (%)', width: 120 },
    { field: 'unemployment', headerName: 'Unemployment (%)', width: 120 },
    { field: 'trade_balance', headerName: 'Trade Balance', width: 120 },
    { field: 'score', headerName: 'Strength Score', width: 120, cellClassName: 'font-bold' },
  ];

  const rows = currencyData
    ? MAJOR_CURRENCIES.map(currency => ({
        id: currency,
        currency,
        interest_rate: currencyData[currency]?.interest_rate || 0,
        consumer_confidence: currencyData[currency]?.consumer_confidence || 0,
        gdp: currencyData[currency]?.gdp || 0,
        retail_sales: currencyData[currency]?.retail_sales || 0,
        unemployment: currencyData[currency]?.unemployment || 0,
        trade_balance: currencyData[currency]?.trade_balance || 0,
        score: calculateScore(currencyData[currency], currency),
      })).sort((a, b) => b.score - a.score)
    : [];

  return (
    <Box sx={{ height: 600, width: '100%', p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Currency Strength Dashboard
      </Typography>

      {error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : loading ? (
        <Typography>Loading data...</Typography>
      ) : rows.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          sx={{
            '& .font-bold': { fontWeight: 'bold' },
            '& .MuiDataGrid-columnHeader': { backgroundColor: '#1976d2', color: 'white' },
          }}
        />
      ) : (
        <Typography>No data available</Typography>
      )}
    </Box>
  );
};

export default Macro;