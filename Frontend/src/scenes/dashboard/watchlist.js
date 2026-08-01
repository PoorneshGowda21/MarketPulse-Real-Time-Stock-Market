import React, { useEffect, useState } from "react";
import { Box, useTheme, Typography } from "@mui/material";
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
      const url = `${API_BASE}/temp/${userId}`;

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
            today: quote ? quote.c : item.price || 0,
            Percent: quote ? (quote.dp ? quote.dp.toFixed(2) + " %" : "0.00 %") : "—",
            open: quote ? quote.o : 0,
            high: quote ? quote.h : 0,
            low: quote ? quote.l : 0,
            close: quote ? quote.pc : 0,
          });
        }
        setRows(list);
      } catch (err) {
        console.log("Watchlist fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleDelete = async (rowId) => {
    // Remove from UI immediately
    setRows((prev) => prev.filter((r) => r.id !== rowId && r._id !== rowId));

    // Also try to delete from backend
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
      headerName: "Trade",
      sortable: false,
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
        // Empty state — user hasn't added any stocks yet
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
            Search for stocks and add them to your watchlist to track them here.
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
