import React, { memo, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

const formatSymbolForTradingView = (sym) => {
  if (!sym) return 'NASDAQ:AAPL';
  let clean = sym.trim().toUpperCase();
  if (clean.includes(':')) return clean;
  // Common crypto or US stock prefixes
  if (["BTC", "ETH", "SOL"].includes(clean)) return `BINANCE:${clean}USDT`;
  return `NASDAQ:${clean}`;
};

const StockChart = ({ symbol = 'AAPL' }) => {
  const displaySymbol = symbol ? symbol.trim().toUpperCase() : 'AAPL';
  const tvSymbol = formatSymbolForTradingView(symbol);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [symbol]);

  return (
    <Box 
      sx={{ 
        backgroundColor: '#1F2A40', 
        padding: { xs: '16px', sm: '24px' }, 
        borderRadius: '16px', 
        boxShadow: '0 8px 32px rgba(0,0,0,0.45)', 
        border: '1px solid rgba(76, 206, 172, 0.35)',
        marginBottom: '28px',
        width: '100%',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: { xs: '18px', sm: '22px' } }}>
          📊 {displaySymbol} Live Candlestick Workstation
        </Typography>
      </Box>

      <Box
        sx={{
          height: { xs: '420px', sm: '560px' },
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#141b2d',
          position: 'relative',
        }}
      >
        {!hasError ? (
          <AdvancedRealTimeChart
            symbol={tvSymbol}
            theme="dark"
            autosize
            hide_side_toolbar={false}
            allow_symbol_change={true}
            save_image={false}
            style="1"
            locale="en"
            container_id={`tv_chart_${displaySymbol}`}
          />
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            color="#a3a3a3"
          >
            <Typography variant="h6" color="#4cceac">
              TradingView Stream Initializing...
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default memo(StockChart, (prevProps, nextProps) => prevProps.symbol === nextProps.symbol);
