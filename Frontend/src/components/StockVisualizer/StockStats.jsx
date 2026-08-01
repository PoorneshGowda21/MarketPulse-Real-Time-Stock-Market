import React from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import { useNavigate } from 'react-router-dom';

const StockStats = ({ price, change, volume, high, symbol }) => {
  const navigate = useNavigate();

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(num || 0);
  };

  const formatVolume = (vol) => {
    if (!vol) return '0';
    if (vol >= 1000000) return `${(vol / 1000000).toFixed(2)}M`;
    if (vol >= 1000) return `${(vol / 1000).toFixed(2)}K`;
    return vol.toString();
  };

  const isPositive = change >= 0;

  const handleBuy = () => {
    navigate('/buyStock', {
      state: {
        symbol: symbol || "AAPL",
        name: symbol || "Apple Inc.",
        today: price || 185.50,
      },
    });
  };

  const handleSell = () => {
    navigate('/sellStock', {
      state: {
        symbol: symbol || "AAPL",
        name: symbol || "Apple Inc.",
        today: price || 185.50,
      },
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Live Market Ticker Status Header & Quick Buy/Sell Action Buttons */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap={2}
        sx={{ mb: 2 }}
      >
        <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
          <Chip
            icon={<RadioButtonCheckedIcon style={{ color: '#4cceac', fontSize: '16px' }} />}
            label="LIVE TICKER STREAMING ACTIVE (1.5s Ticks)"
            sx={{
              backgroundColor: 'rgba(76, 206, 172, 0.12)',
              color: '#4cceac',
              fontWeight: 'bold',
              fontSize: '12px',
              border: '1px solid #4cceac',
              py: 0.5,
            }}
          />
          <Typography variant="caption" sx={{ color: '#a3a3a3' }}>
            * US Markets 9:30 AM–4:00 PM EST (24/7 Live Stream)
          </Typography>
        </Box>

        {/* Prominent BUY and SELL Quick Action Buttons */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            onClick={handleBuy}
            sx={{
              backgroundColor: "#4cceac",
              color: "#141b2d",
              fontWeight: "bold",
              fontSize: "13.5px",
              px: 2.5,
              py: 0.9,
              borderRadius: "8px",
              boxShadow: "0 0 14px rgba(76, 206, 172, 0.4)",
              "&:hover": {
                backgroundColor: "#3da58a",
                boxShadow: "0 0 20px rgba(76, 206, 172, 0.6)",
              },
            }}
          >
            BUY {symbol}
          </Button>

          <Button
            variant="outlined"
            startIcon={<SellIcon />}
            onClick={handleSell}
            sx={{
              borderColor: "#ef4444",
              color: "#ef4444",
              fontWeight: "bold",
              fontSize: "13.5px",
              px: 2.5,
              py: 0.8,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "rgba(239, 68, 68, 0.12)",
                borderColor: "#dc2626",
              },
            }}
          >
            SELL {symbol}
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
          gap: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: '#1F2A40',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #3b82f6',
          }}
        >
          <Typography variant="body2" sx={{ color: '#a3a3a3' }}>
            Current Price ({symbol})
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff', mt: 0.5 }}>
            ${formatNumber(price)}
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: '#1F2A40',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: `4px solid ${isPositive ? '#4cceac' : '#ef4444'}`,
          }}
        >
          <Typography variant="body2" sx={{ color: '#a3a3a3' }}>
            24h Change
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', color: isPositive ? '#4cceac' : '#ef4444', mt: 0.5 }}
          >
            {isPositive ? '+' : ''}{formatNumber(change)}%
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: '#1F2A40',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #70d8bd',
          }}
        >
          <Typography variant="body2" sx={{ color: '#a3a3a3' }}>
            Trading Volume
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff', mt: 0.5 }}>
            {formatVolume(volume)}
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: '#1F2A40',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #8b5cf6',
          }}
        >
          <Typography variant="body2" sx={{ color: '#a3a3a3' }}>
            24h High
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff', mt: 0.5 }}>
            ${formatNumber(high)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StockStats;
