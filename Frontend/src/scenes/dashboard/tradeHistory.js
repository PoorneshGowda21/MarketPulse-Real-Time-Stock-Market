import React, { useEffect, useState } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Header from "../../components/Headers";

const Portfolio = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id || user?._id || "";
  const [rows, setRows] = useState([]);   // ← starts empty — no fake defaults
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!userId) {
        setLoading(false);
        return;
      }

      const API_BASE = process.env.REACT_APP_API_URL ||
        (window.location.origin.includes('localhost') ? 'http://localhost:8080' : '');
      const url = `${API_BASE}/trade/${userId}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          setLoading(false);
          return;
        }
        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
          setLoading(false);
          return;
        }

        const list = data.map((item, index) => ({
          id: item._id || item.id || `trade_${index}`,
          _id: item._id || item.id || `trade_${index}`,
          name: item.name || item.symbol || "Stock Trade",
          symbol: item.symbol || "STK",
          tradeType: item.tradeType || "BUY",
          price: item.price || 0,
          shares: item.shares || 0,
          invAmount: (item.price || 0) * (item.shares || 0),
          date: item.date ? item.date.split("T")[0] : new Date().toISOString().split("T")[0],
        }));
        setRows(list);
      } catch (err) {
        console.log("Trade history fetch error:", err);
      } finally {
        setLoading(false);
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
    { field: "symbol", headerName: "Symbol", flex: 0.5 },
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
    { field: "date", headerName: "Order Date", flex: 0.6 },
  ];

  const gridSx = {
    backgroundColor: theme.palette.mode === "dark" ? "#1F2A40" : "#ffffff",
    borderRadius: "16px",
    border: theme.palette.mode === "dark" ? "1px solid rgba(76, 206, 172, 0.35)" : "1px solid #cbd5e1",
    boxShadow: theme.palette.mode === "dark" ? "0 8px 32px rgba(0, 0, 0, 0.5)" : "0 4px 20px rgba(0, 0, 0, 0.08)",
    p: 2,
    "& .MuiDataGrid-root": { border: "none", color: theme.palette.mode === "dark" ? "#e0e0e0 !important" : "#1e293b !important" },
    "& .MuiDataGrid-cell": { borderBottom: theme.palette.mode === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0", color: theme.palette.mode === "dark" ? "#e0e0e0 !important" : "#1e293b !important", fontSize: "13.5px" },
    "& .name-column--cell": { color: theme.palette.mode === "dark" ? "#4cceac !important" : "#0d9488 !important", fontWeight: "bold" },
    "& .MuiDataGrid-columnHeaders": { backgroundColor: theme.palette.mode === "dark" ? "#141b2d !important" : "#f8fafc !important", borderBottom: theme.palette.mode === "dark" ? "2px solid #4cceac" : "2px solid #0d9488", borderRadius: "10px 10px 0 0" },
    "& .MuiDataGrid-columnHeaderTitle": { color: theme.palette.mode === "dark" ? "#4cceac !important" : "#0d9488 !important", fontWeight: "bold", fontSize: "14px" },
    "& .MuiDataGrid-virtualScroller": { backgroundColor: theme.palette.mode === "dark" ? "#141b2d !important" : "#ffffff !important" },
    "& .MuiDataGrid-footerContainer": { borderTop: theme.palette.mode === "dark" ? "1px solid rgba(76, 206, 172, 0.25)" : "1px solid #e2e8f0", backgroundColor: theme.palette.mode === "dark" ? "#141b2d !important" : "#f8fafc !important", color: theme.palette.mode === "dark" ? "#e0e0e0 !important" : "#1e293b !important", borderRadius: "0 0 10px 10px" },
  };

  return (
    <Box m="20px">
      <Header title="Orders & Trade History" subtitle="Executed Stock Transactions Log" />

      {!loading && rows.length === 0 ? (
        // Empty state — user hasn't placed any orders yet
        <Box
          mt="40px"
          height="60vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={gridSx}
        >
          <ReceiptLongIcon sx={{ fontSize: 64, color: "#4cceac", opacity: 0.5, mb: 2 }} />
          <Typography variant="h5" sx={{ color: theme.palette.mode === "dark" ? "#a3a3a3" : "#64748b", mb: 1 }}>
            No orders yet
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.mode === "dark" ? "#666" : "#94a3b8" }}>
            Your executed buy and sell orders will appear here after you trade.
          </Typography>
        </Box>
      ) : (
        <Box m="40px 0 0 0" height="75vh" sx={gridSx}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 300 },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Portfolio;
