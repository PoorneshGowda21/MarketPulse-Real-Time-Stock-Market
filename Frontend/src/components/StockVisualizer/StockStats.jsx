import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const StockStats = ({ price, change, volume, high, symbol }) => {
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

  return (
    <Box sx={{ mb: 3 }}>
      {/* Live Market Ticker Status Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
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
          * US Markets operate 9:30 AM–4:00 PM EST. Real-time simulation stream is active 24/7.
        </Typography>
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
