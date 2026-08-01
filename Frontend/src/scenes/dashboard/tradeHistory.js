import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Headers";

const defaultHistory = [
  { id: "t1", _id: "t1", name: "Apple Inc.", symbol: "AAPL", tradeType: "BUY", price: 180.50, shares: 10, invAmount: 1805.00, date: "2026-07-28" },
  { id: "t2", _id: "t2", name: "NVIDIA Corp.", symbol: "NVDA", tradeType: "BUY", price: 450.00, shares: 5, invAmount: 2250.00, date: "2026-07-29" },
  { id: "t3", _id: "t3", name: "Tesla Inc.", symbol: "TSLA", tradeType: "SELL", price: 250.00, shares: 2, invAmount: 500.00, date: "2026-07-30" },
  { id: "t4", _id: "t4", name: "Amazon.com Inc.", symbol: "AMZN", tradeType: "BUY", price: 135.00, shares: 15, invAmount: 2025.00, date: "2026-07-31" },
  { id: "t5", _id: "t5", name: "Microsoft Corp.", symbol: "MSFT", tradeType: "BUY", price: 325.00, shares: 4, invAmount: 1300.00, date: "2026-08-01" }
];

const Portfolio = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id || user?._id || "";
  const [rows, setRows] = useState(defaultHistory);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      const API_BASE = process.env.REACT_APP_API_URL || (window.location.origin.includes('localhost') ? 'http://localhost:8080' : '');
      const url = `${API_BASE}/trade/${userId}`;

      try {
        const response = await fetch(url);
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const list = data.map((item, index) => ({
            id: item._id || item.id || `trade_${index}`,
            _id: item._id || item.id || `trade_${index}`,
            name: item.name || item.symbol || "Stock Trade",
            symbol: item.symbol || "STK",
            tradeType: item.tradeType || "BUY",
            price: item.price || 100,
            shares: item.shares || 1,
            invAmount: (item.price || 100) * (item.shares || 1),
            date: item.date ? item.date.split("T")[0] : new Date().toISOString().split("T")[0]
          }));
          setRows(list);
        }
      } catch (err) {
        console.log("Using default trade history view:", err);
      }
    };

    fetchData();
  }, [userId]);

  const columns = [
    {
      field: "name",
      headerName: "Company Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "symbol",
      headerName: "Symbol",
      flex: 0.5,
      cellClassName: "symbol-column--cell",
    },
    {
      field: "tradeType",
      headerName: "Order Type",
      flex: 0.5,
      renderCell: (params) => {
        const isBuy = params.value === "BUY";
        return (
          <Box
            sx={{
              px: 1.5,
              py: 0.4,
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "12px",
              backgroundColor: isBuy ? "rgba(76, 206, 172, 0.18)" : "rgba(239, 68, 68, 0.18)",
              color: isBuy ? "#4cceac" : "#ef4444",
              border: isBuy ? "1px solid rgba(76, 206, 172, 0.4)" : "1px solid rgba(239, 68, 68, 0.4)",
            }}
          >
            {params.value}
          </Box>
        );
      },
    },
    {
      field: "price",
      headerName: "Price ($)",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "shares",
      headerName: "Quantity",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "invAmount",
      headerName: "Total Value ($)",
      flex: 0.6,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "date",
      headerName: "Order Date",
      flex: 0.6,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Orders & Trade History" subtitle="Executed Stock Transactions Log" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#1F2A40" : "#ffffff",
          borderRadius: "16px",
          border: theme.palette.mode === "dark" ? "1px solid rgba(76, 206, 172, 0.35)" : "1px solid #cbd5e1",
          boxShadow: theme.palette.mode === "dark" ? "0 8px 32px rgba(0, 0, 0, 0.5)" : "0 4px 20px rgba(0, 0, 0, 0.08)",
          p: 2,
          "& .MuiDataGrid-root": {
            border: "none",
            color: theme.palette.mode === "dark" ? "#e0e0e0 !important" : "#1e293b !important",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: theme.palette.mode === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
            color: theme.palette.mode === "dark" ? "#e0e0e0 !important" : "#1e293b !important",
            fontSize: "13.5px",
          },
          "& .name-column--cell": {
            color: theme.palette.mode === "dark" ? "#4cceac !important" : "#0d9488 !important",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.mode === "dark" ? "#141b2d !important" : "#f8fafc !important",
            borderBottom: theme.palette.mode === "dark" ? "2px solid #4cceac" : "2px solid #0d9488",
            borderRadius: "10px 10px 0 0",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: theme.palette.mode === "dark" ? "#4cceac !important" : "#0d9488 !important",
            fontWeight: "bold",
            fontSize: "14px",
            letterSpacing: "0.4px",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.mode === "dark" ? "#141b2d !important" : "#ffffff !important",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: theme.palette.mode === "dark" ? "1px solid rgba(76, 206, 172, 0.25)" : "1px solid #e2e8f0",
            backgroundColor: theme.palette.mode === "dark" ? "#141b2d !important" : "#f8fafc !important",
            color: theme.palette.mode === "dark" ? "#e0e0e0 !important" : "#1e293b !important",
            borderRadius: "0 0 10px 10px",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 300 },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Portfolio;
