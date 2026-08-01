import React, { useEffect, useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Header from "../../components/Headers";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const defaultWatchlist = [
  { id: "w1", _id: "w1", name: "Apple Inc.", symbol: "AAPL", today: 185.92, Percent: "+1.45 %", open: 183.50, high: 186.40, low: 183.80, close: 183.27 },
  { id: "w2", _id: "w2", name: "Tesla Inc.", symbol: "TSLA", today: 248.50, Percent: "-0.82 %", open: 250.10, high: 252.10, low: 244.30, close: 250.56 },
  { id: "w3", _id: "w3", name: "NVIDIA Corp.", symbol: "NVDA", today: 460.20, Percent: "+3.21 %", open: 448.00, high: 465.00, low: 452.10, close: 445.88 },
  { id: "w4", _id: "w4", name: "Amazon.com Inc.", symbol: "AMZN", today: 138.10, Percent: "+0.65 %", open: 137.20, high: 139.50, low: 136.90, close: 137.21 },
  { id: "w5", _id: "w5", name: "Microsoft Corp.", symbol: "MSFT", today: 330.40, Percent: "+1.12 %", open: 327.50, high: 332.80, low: 328.00, close: 326.74 },
  { id: "w6", _id: "w6", name: "Alphabet Inc.", symbol: "GOOGL", today: 135.60, Percent: "+0.94 %", open: 134.80, high: 136.80, low: 134.20, close: 134.34 },
  { id: "w7", _id: "w7", name: "Meta Platforms", symbol: "META", today: 305.10, Percent: "+2.15 %", open: 299.00, high: 308.40, low: 301.20, close: 298.68 }
];

const Watchlist = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id || user?._id || "";
  const navigate = useNavigate();
  const [rows, setRows] = useState(defaultWatchlist);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      const API_BASE = process.env.REACT_APP_API_URL || (window.location.origin.includes('localhost') ? 'http://localhost:8080' : '');
      const url = `${API_BASE}/temp/${userId}`;

      try {
        const response = await fetch(url);
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const list = [];
          for (let item of data) {
            let quote = { c: 150, dp: 1.2, o: 148, h: 152, l: 147, pc: 148 };
            try {
              const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${item.symbol}&token=ce80b8aad3i4pjr4v2ggce80b8aad3i4pjr4v2h0`);
              if (res.data && res.data.c) quote = res.data;
            } catch (e) {
              console.log(e);
            }
            list.push({
              id: item._id || item.id || item.symbol,
              _id: item._id || item.id,
              name: item.name || item.symbol,
              symbol: item.symbol,
              delete: item._id || item.id,
              today: quote.c,
              Percent: (quote.dp ? quote.dp.toFixed(2) : "0.00") + " %",
              open: quote.o,
              high: quote.h,
              low: quote.l,
              close: quote.pc
            });
          }
          if (list.length > 0) setRows(list);
        }
      } catch (err) {
        console.log("Using default watchlist view:", err);
      }
    };

    fetchData();
  }, [userId]);

  const handleDelete = (rowId) => {
    setRows((prev) => prev.filter((r) => r.id !== rowId && r._id !== rowId));
  };

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
      field: "today",
      headerName: "Price ($)",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Percent",
      headerName: "Change (%)",
      flex: 0.5,
      type: "string",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "open",
      headerName: "Open ($)",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "high",
      headerName: "High ($)",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "low",
      headerName: "Low ($)",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "delete",
      headerName: "Remove",
      sortable: false,
      renderCell: (params) => {
        return (
          <DeleteIcon
            sx={{ cursor: "pointer", color: "#ef4444", "&:hover": { color: "#dc2626" } }}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(params.row.id);
            }}
          />
        );
      },
    },
    {
      field: "Details",
      headerName: "Trade",
      sortable: false,
      renderCell: (params) => {
        return (
          <AddCircleOutlineIcon
            sx={{ cursor: "pointer", color: "#4cceac", "&:hover": { color: "#3da58a" } }}
            onClick={(e) => {
              e.stopPropagation();
              navigate("/details", { state: params.row });
            }}
          />
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Watchlist" subtitle="Real-time Tracked Stock Assets" />
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

export default Watchlist;
