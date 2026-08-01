import React, { useEffect, useState } from "react";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Header from "../../components/Headers";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Watchlist = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id || user?._id || "";
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!userId) {
        setLoading(false);
        return;
      }

      // Helper: load from localStorage fallback
      const loadFromLocalStorage = async () => {
        const storageKey = `watchlist_${userId}`;
        const localItems = JSON.parse(localStorage.getItem("user_watchlist_" + userId) || localStorage.getItem(storageKey) || "[]");
        if (localItems.length === 0) {
          setLoading(false);
          return;
        }
        const list = localItems.map((item, i) => ({
          id: item._id || item.id || item.symbol || `local_${i}`,
          _id: item._id || item.id || item.symbol,
          name: item.name || item.symbol,
          symbol: item.symbol,
          delete: item._id || item.id || item.symbol,
          today: item.today || 185.50,
          Percent: item.Percent || "+1.25 %",
          open: item.open || 184.00,
          high: item.high || 187.20,
          low: item.low || 183.50,
          close: item.close || 184.50,
        }));
        setRows(list);
        setLoading(false);
      };

      const API_BASE = process.env.REACT_APP_API_URL ||
        (window.location.origin.includes('localhost') ? 'http://localhost:8080' : '');
      const url = `${API_BASE}/temp/${userId}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          await loadFromLocalStorage();
          return;
        }
        const data = await response.json();

        // If backend returns empty, fall back to localStorage
        if (!Array.isArray(data) || data.length === 0) {
          await loadFromLocalStorage();
          return;
        }

        const list = [];
        for (let item of data) {
          let quote = null;
          try {
            const res = await axios.get(
              `https://finnhub.io/api/v1/quote?symbol=${item.symbol}&token=ce80b8aad3i4pjr4v2ggce80b8aad3i4pjr4v2h0`
            );
            if (res.data && res.data.c) quote = res.data;
          } catch (e) {
            console.log("Quote fetch failed for", item.symbol, e);
          }

          list.push({
            id: item._id || item.id || item.symbol,
            _id: item._id || item.id,
            name: item.name || item.symbol,
            symbol: item.symbol,
            delete: item._id || item.id,
            today: quote ? quote.c : 185.50,
            Percent: quote ? (quote.dp ? quote.dp.toFixed(2) + " %" : "0.00 %") : "+1.25 %",
            open: quote ? quote.o : 184.00,
            high: quote ? quote.h : 187.20,
            low: quote ? quote.l : 183.50,
            close: quote ? quote.pc : 184.50,
          });
        }
        setRows(list);
      } catch (err) {
        console.log("Watchlist fetch error:", err);
        await loadFromLocalStorage();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleDelete = async (rowId) => {
    const deletedRow = rows.find((r) => r.id === rowId || r._id === rowId);
    setRows((prev) => prev.filter((r) => r.id !== rowId && r._id !== rowId));

    if (deletedRow && userId) {
      const storageKey = `watchlist_${userId}`;
      const existingKey = "user_watchlist_" + userId;
      const existing = JSON.parse(localStorage.getItem(existingKey) || localStorage.getItem(storageKey) || "[]");
      const updated = existing.filter(s => s.symbol !== deletedRow.symbol);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      localStorage.setItem(existingKey, JSON.stringify(updated));
    }

    if (!userId) return;
    const API_BASE = process.env.REACT_APP_API_URL ||
      (window.location.origin.includes('localhost') ? 'http://localhost:8080' : '');
    try {
      await fetch(`${API_BASE}/temp/${rowId}`, { method: "DELETE" });
    } catch (e) {
      console.log("Delete from backend failed:", e);
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Company Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "symbol", headerName: "Symbol", flex: 0.5 },
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
      field: "BuyAction",
      headerName: "Buy Stock",
      sortable: false,
      flex: 0.6,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/buyStock", {
              state: {
                symbol: params.row.symbol,
                name: params.row.name,
                today: params.row.today || 150,
              },
            });
          }}
          sx={{
            backgroundColor: "#4cceac",
            color: "#141b2d",
            fontWeight: "bold",
            fontSize: "12px",
            py: 0.4,
            px: 1.5,
            borderRadius: "6px",
            "&:hover": { backgroundColor: "#3da58a" },
          }}
        >
          BUY
        </Button>
      ),
    },
    {
      field: "SellAction",
      headerName: "Sell Stock",
      sortable: false,
      flex: 0.6,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/sellStock", {
              state: {
                symbol: params.row.symbol,
                name: params.row.name,
                today: params.row.today || 150,
              },
            });
          }}
          sx={{
            fontWeight: "bold",
            fontSize: "12px",
            py: 0.4,
            px: 1.5,
            borderRadius: "6px",
          }}
        >
          SELL
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Remove",
      sortable: false,
      flex: 0.4,
      renderCell: (params) => (
        <DeleteIcon
          sx={{ cursor: "pointer", color: "#ef4444", "&:hover": { color: "#dc2626" } }}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(params.row.id);
          }}
        />
      ),
    },
    {
      field: "Details",
      headerName: "Chart",
      sortable: false,
      flex: 0.4,
      renderCell: (params) => (
        <AddCircleOutlineIcon
          sx={{ cursor: "pointer", color: "#4cceac", "&:hover": { color: "#3da58a" } }}
          onClick={(e) => {
            e.stopPropagation();
            navigate("/details", { state: params.row });
          }}
        />
      ),
    },
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
      <Header title="Watchlist" subtitle="Real-time Tracked Stock Assets" />

      {!loading && rows.length === 0 ? (
        <Box
          mt="40px"
          height="60vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ ...gridSx }}
        >
          <BookmarkBorderIcon sx={{ fontSize: 64, color: "#4cceac", opacity: 0.5, mb: 2 }} />
          <Typography variant="h5" sx={{ color: theme.palette.mode === "dark" ? "#a3a3a3" : "#64748b", mb: 1 }}>
            Your watchlist is empty
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.mode === "dark" ? "#666" : "#94a3b8" }}>
            Search for stocks on the Market Overview dashboard and add them to your watchlist to track & trade them here.
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

export default Watchlist;
