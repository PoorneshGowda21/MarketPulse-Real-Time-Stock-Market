import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';

const formatSymbolForTradingView = (sym) => {
  if (!sym) return 'AAPL';
  let clean = sym.trim();
  if (clean.includes(':')) {
    clean = clean.split(':')[1];
  }
  return clean.toUpperCase();
};

const StockChart = ({ symbol = 'AAPL' }) => {
  const displaySymbol = symbol ? symbol.trim().toUpperCase() : 'AAPL';
  const rawSymbol = formatSymbolForTradingView(symbol);

  const widgetConfig = encodeURIComponent(
    JSON.stringify({
      autosize: true,
      symbol: rawSymbol,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      enable_publishing: false,
      allow_symbol_change: true,
      calendar: false,
      support_host: 'https://www.tradingview.com',
      backgroundColor: '#141b2d',
      gridColor: 'rgba(45, 55, 72, 0.5)',
    })
  );

  const iframeSrc = `https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=en#${widgetConfig}`;

  return (
    <Box 
      sx={{ 
        backgroundColor: '#1F2A40', 
        padding: '24px', 
        borderRadius: '16px', 
        boxShadow: '0 8px 32px rgba(0,0,0,0.45)', 
        border: '1px solid rgba(76, 206, 172, 0.35)',
        marginBottom: '28px' 
      }}
    >
      <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '22px', mb: 2 }}>
        📊 {displaySymbol} Live TradingView Candlestick Workstation
      </Typography>

      <Box sx={{ height: '620px', width: '100%', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#141b2d' }}>
        <iframe
          key={rawSymbol}
          title={`TradingView Chart ${rawSymbol}`}
          src={iframeSrc}
          style={{ width: '100%', height: '100%', border: 'none' }}
          allowTransparency={true}
          scrolling="no"
          allowFullScreen={true}
        />
      </Box>
    </Box>
  );
};

export default memo(StockChart, (prevProps, nextProps) => prevProps.symbol === nextProps.symbol);
