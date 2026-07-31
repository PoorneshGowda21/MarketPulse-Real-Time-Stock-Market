import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import StockChart from './StockChart';
import StockStats from './StockStats';
import StockSelector from './StockSelector';

const basePrices = {
  AAPL: 185.50,
  MSFT: 415.20,
  GOOG: 175.80,
  AMZN: 182.40,
  TSLA: 220.10,
  NVDA: 125.60,
  META: 512.30,
  NFLX: 640.80,
  AMD: 155.20,
  INTC: 31.40,
  DIS: 102.50,
  PYPL: 64.30,
  COIN: 225.10,
  PLTR: 28.50,
  UNH: 520.30,
  JNJ: 155.40,
  XOM: 118.90,
  V: 275.30,
};

const getBasePrice = (sym) => {
  if (basePrices[sym]) return basePrices[sym];
  let hash = 0;
  for (let i = 0; i < sym.length; i++) {
    hash = sym.charCodeAt(i) + ((hash << 5) - hash);
  }
  const base = Math.abs(hash % 450) + 25;
  return Number(base.toFixed(2));
};

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const generateData = (symbol) => {
  const basePrice = getBasePrice(symbol);
  const now = new Date();
  const rawList = [];
  let currentVal = basePrice * 0.90;

  for (let i = 30; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = formatDate(d);
    
    const delta = (Math.random() - 0.47) * (basePrice * 0.02);
    currentVal = Math.max(5, currentVal + delta);
    
    rawList.push({
      time: dateStr,
      value: Number(currentVal.toFixed(2)),
    });
  }

  // Deduplicate strictly by date string and sort ascending
  const uniqueMap = new Map();
  rawList.forEach(item => uniqueMap.set(item.time, item.value));
  const sortedTimes = Array.from(uniqueMap.keys()).sort();
  
  return sortedTimes.map(t => ({
    time: t,
    value: uniqueMap.get(t),
  }));
};

const StockVisualizer = ({ selectedSymbol, onSelectSymbol }) => {
  const [symbol, setSymbol] = useState(selectedSymbol || 'AAPL');
  const [data, setData] = useState(() => generateData(selectedSymbol || 'AAPL'));
  const [stats, setStats] = useState(() => {
    const bp = getBasePrice(selectedSymbol || 'AAPL');
    return {
      price: bp,
      change: 2.35,
      volume: 8500000,
      high: bp * 1.05,
    };
  });

  useEffect(() => {
    if (selectedSymbol && selectedSymbol !== symbol) {
      setSymbol(selectedSymbol);
    }
  }, [selectedSymbol]);

  useEffect(() => {
    const initialData = generateData(symbol);
    setData(initialData);

    const basePrice = getBasePrice(symbol);
    const initialPrice = initialData.length > 0 ? initialData[initialData.length - 1].value : basePrice;

    setStats({
      price: initialPrice,
      change: Number((((initialPrice - basePrice * 0.95) / (basePrice * 0.95)) * 100).toFixed(2)),
      volume: Math.floor(5000000 + Math.random() * 10000000),
      high: Number((initialPrice * 1.04).toFixed(2)),
    });

    const interval = setInterval(() => {
      setData((prev) => {
        if (!prev || prev.length === 0) return prev;
        const lastItem = prev[prev.length - 1];
        const randomDelta = (Math.random() - 0.49) * 1.5;
        const newValue = Number(Math.max(1, lastItem.value + randomDelta).toFixed(2));
        const todayStr = formatDate(new Date());

        const updated = [...prev];
        if (updated[updated.length - 1].time === todayStr) {
          updated[updated.length - 1] = { time: todayStr, value: newValue };
        } else {
          updated.push({ time: todayStr, value: newValue });
          if (updated.length > 31) updated.shift();
        }

        setStats((prevStats) => ({
          price: newValue,
          change: Number((((newValue - (basePrice * 0.95)) / (basePrice * 0.95)) * 100).toFixed(2)),
          volume: prevStats.volume + Math.floor(Math.random() * 10000),
          high: Math.max(prevStats.high, newValue),
        }));

        return updated;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [symbol]);

  const handleSymbolChange = (newSym) => {
    setSymbol(newSym);
    if (onSelectSymbol) onSelectSymbol(newSym);
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <StockSelector currentSymbol={symbol} onSymbolChange={handleSymbolChange} />
      <StockStats {...stats} symbol={symbol} />
      <StockChart data={data} symbol={symbol} />
    </Box>
  );
};

export default StockVisualizer;
