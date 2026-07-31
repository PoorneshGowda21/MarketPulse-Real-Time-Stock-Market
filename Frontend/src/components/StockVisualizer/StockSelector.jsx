import React from 'react';
import { Box, Button, Typography, Autocomplete, TextField } from '@mui/material';
import { rows } from '../../Symbol';

const defaultStocks = [
  // US Market Bluechips
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'GOOG', name: 'Alphabet' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'TSLA', name: 'Tesla' },
  { symbol: 'NVDA', name: 'Nvidia' },
  { symbol: 'META', name: 'Meta' },
  // Top Indian Exchange (NSE / BSE) Stocks
  { symbol: 'NSE:RELIANCE', name: 'Reliance' },
  { symbol: 'NSE:TCS', name: 'TCS' },
  { symbol: 'NSE:INFY', name: 'Infosys' },
  { symbol: 'NSE:HDFCBANK', name: 'HDFC Bank' },
  { symbol: 'NSE:TATAMOTORS', name: 'Tata Motors' },
  { symbol: 'NSE:ICICIBANK', name: 'ICICI Bank' },
  { symbol: 'NSE:SBIN', name: 'SBI' },
  { symbol: 'NSE:WIPRO', name: 'Wipro' },
  { symbol: 'BSE:SENSEX', name: 'BSE Sensex' },
  { symbol: 'NSE:NIFTY', name: 'Nifty 50' },
  // Other Tech Giants
  { symbol: 'NFLX', name: 'Netflix' },
  { symbol: 'AMD', name: 'AMD' },
  { symbol: 'INTC', name: 'Intel' },
  { symbol: 'DIS', name: 'Disney' },
  { symbol: 'V', name: 'Visa' },
];

const combinedOptions = [
  ...defaultStocks.map(s => ({ symbol: s.symbol, description: s.name })),
  ...(rows || [])
];

const StockSelector = ({ currentSymbol, onSymbolChange }) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 1.5 }}>
        <Typography variant="subtitle2" sx={{ color: '#4cceac', fontWeight: 'bold', fontSize: '13px', letterSpacing: '0.5px' }}>
          SELECT OR SEARCH MARKET STOCK TO VISUALIZE (US & INDIAN NSE/BSE):
        </Typography>

        {/* Search Bar for all 100,000+ Global & Indian Market Stocks */}
        <Autocomplete
          freeSolo={true}
          options={combinedOptions}
          getOptionLabel={(option) => {
            if (typeof option === 'string') return option;
            if (option && option.symbol) {
              return `${option.symbol} - ${option.description || option.name || ''}`;
            }
            return '';
          }}
          onChange={(event, newValue) => {
            if (!newValue) return;
            if (typeof newValue === 'string') {
              onSymbolChange(newValue.trim().toUpperCase());
            } else if (newValue.symbol) {
              onSymbolChange(newValue.symbol);
            }
          }}
          style={{ width: 360 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="🔍 Search 100,000+ Global & Indian Stocks"
              variant="outlined"
              size="small"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  onSymbolChange(e.target.value.trim().toUpperCase());
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#ffffff',
                  backgroundColor: '#1F2A40',
                  '& fieldset': { borderColor: '#3e4396' },
                  '&:hover fieldset': { borderColor: '#4cceac' },
                  '&.Mui-focused fieldset': { borderColor: '#4cceac' },
                },
                '& .MuiInputLabel-root': { color: '#a3a3a3' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4cceac' },
              }}
            />
          )}
        />
      </Box>

      {/* Quick Selection Chips with US and Indian NSE/BSE Stocks */}
      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', paddingBottom: 1 }}>
        {defaultStocks.map(({ symbol, name }) => {
          const isSelected = currentSymbol === symbol;
          return (
            <Button
              key={symbol}
              variant={isSelected ? 'contained' : 'outlined'}
              onClick={() => onSymbolChange(symbol)}
              sx={{
                backgroundColor: isSelected ? '#4cceac' : '#1F2A40',
                color: isSelected ? '#141b2d' : '#e0e0e0',
                borderColor: isSelected ? '#4cceac' : '#3e4396',
                fontWeight: 'bold',
                textTransform: 'none',
                flexShrink: 0,
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: isSelected ? '#3da58a' : '#2a3754',
                  borderColor: '#4cceac',
                },
              }}
            >
              {symbol} <span style={{ opacity: 0.7, marginLeft: '6px', fontSize: '11px' }}>{name}</span>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default StockSelector;
