import * as React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import TablePagination from "@mui/material/TablePagination";
import { rows } from "../../finalStockData";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import axios from "axios";
import { tokens } from "../../theme";

import { useAuthContext } from "../../hooks/useAuthContext";
import StockVisualizer from "../../components/StockVisualizer";

const Dashboard = () => {
  const { user } = useAuthContext();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const history = useNavigate();

//   async function OnAdd(props) {
//     console.log("Button pressed");
//     const item = {
//       userId: user.id,
//       symbol: props.symbol,
//       name: props.description,
//     };

//     const url = "http://localhost:8080/temp/";

//     await axios
//       .post(url, {
//         userId: user.id,
//         symbol: props.symbol,
//         name: props.description,
//       })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     // const response = await fetch(url, {
//     //   method: "POST",
//     //   headers: { "Content-Type": "application/json" },

//     //   body: JSON.stringify(item),
//     // });
//     // const json = await response.json();
//     history("../watchlist");
//   }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "symbol",
      headerName: "Symbol",
      flex: 1,
      cellClassName: "symbol-column--cell",
    },
    {
      field: "figi",
      headerName: "FIGI",
      
      flex: 1,

      cellClassName: "symbol-column--cell",
    },

    {
      field: "mic",
      headerName: "MIC",
      flex: 1,
      
      headerAlign: "left",
      align: "left",
    },
    // {
    //   field: "Add to watchlist",
    //   headerName: "Add to Watchlist",
    //   flex: 1,
      
    //   headerAlign: "left",
    //   align: "left",
    // }
    {
        field: "Details",
        headerAlign: "center",
        headerName: "Add to Watchlkist",
        flex:1,
        align:"center",
        sortable: false,
        renderCell: (params) => {
            const OnAdd = async (e) => {
                e.stopPropagation();

                // Use params.row directly — no deprecated getValue/GridApi needed
                const row = params.row;
                const userId = user?.id || user?._id || "";
                const symbol = row.symbol;
                const name = row.description || row.name || symbol;

                if (!userId || !symbol) {
                    alert("Please log in to add stocks to your watchlist.");
                    return;
                }

                const stockEntry = { userId, symbol, name };

                // === Save to localStorage watchlist (always works offline) ===
                const storageKey = `watchlist_${userId}`;
                const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
                const alreadyExists = existing.find(s => s.symbol === symbol);
                if (!alreadyExists) {
                    existing.push(stockEntry);
                    localStorage.setItem(storageKey, JSON.stringify(existing));
                }

                // === Also try to POST to backend (non-blocking) ===
                const API_BASE = process.env.REACT_APP_API_URL ||
                    (window.location.origin.includes('localhost') ? 'http://localhost:8080' : '');
                try {
                    await axios.post(`${API_BASE}/temp/`, stockEntry);
                } catch (err) {
                    console.log("Backend unavailable, saved to localStorage:", err);
                }

                // Navigate to watchlist
                history("/watchlist");
            };

          return <AddCircleOutlineIcon onClick={OnAdd} sx={{ cursor: "pointer", color: "#4cceac", "&:hover": { color: "#3da58a" } }} />;
        },
      }]

  return (
    <>
      
      {/* <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Figi</TableCell>
            <TableCell>MIC</TableCell>
            <TableCell>Add in watch list</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.symbol}</TableCell>
                <TableCell>{row.figi}</TableCell>
                <TableCell>{row.mic}</TableCell>
                <TableCell>
                  <AddCircleOutlineIcon
                    type="submit"
                    value={row}
                    aria-label="fingerprint"
                    onClick={() => OnAdd(row)}
                    color="success"
                  ></AddCircleOutlineIcon>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      {/* <DataGrid
              rows={rows}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            /> */}
        <Box m="24px" sx={{ maxWidth: "100%", overflowX: "hidden" }}>
        <Header 
          title="Market Overview" 
          subtitle="Real-time stock price charts & live market data visualization" 
        />
        <StockVisualizer
          selectedSymbol={selectedSymbol}
          onSelectSymbol={(sym) => setSelectedSymbol(sym)}
        />

        {/* Stylish Stock Listings Table Container */}
        {/* Stylish Stock Listings Table Container */}
        <Box
          m="24px 0 0 0"
          height="68vh"
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
              cursor: "pointer",
            },
            "& .MuiDataGrid-row": {
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: theme.palette.mode === "dark" ? "#2a3754 !important" : "#f1f5f9 !important",
                transform: "translateY(-1px)",
                boxShadow: theme.palette.mode === "dark" ? "0 4px 12px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0,0,0,0.06)",
              },
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
            "& .MuiTablePagination-root": {
              color: theme.palette.mode === "dark" ? "#e0e0e0 !important" : "#1e293b !important",
            },
            "& .MuiDataGrid-toolbarContainer": {
              mb: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              "& .MuiButton-text": {
                color: theme.palette.mode === "dark" ? "#4cceac !important" : "#0d9488 !important",
                fontWeight: "bold",
                borderRadius: "8px",
                px: 1.5,
                "&:hover": {
                  backgroundColor: theme.palette.mode === "dark" ? "rgba(76, 206, 172, 0.12)" : "rgba(13, 148, 136, 0.12)",
                },
              },
              "& .MuiDataGrid-toolbarQuickFilter": {
                backgroundColor: theme.palette.mode === "dark" ? "#141b2d !important" : "#f8fafc !important",
                borderRadius: "8px !important",
                border: theme.palette.mode === "dark" ? "2px solid #4cceac !important" : "2px solid #0d9488 !important",
                padding: "4px 12px !important",
                marginRight: "4px !important",
                display: "inline-flex !important",
                alignItems: "center !important",
                boxShadow: theme.palette.mode === "dark" ? "0 0 10px rgba(76, 206, 172, 0.35) !important" : "0 2px 8px rgba(13, 148, 136, 0.2) !important",
                transition: "all 0.2s ease-in-out",
                "&:hover, &:focus-within": {
                  borderColor: theme.palette.mode === "dark" ? "#3da58a !important" : "#0f766e !important",
                  boxShadow: theme.palette.mode === "dark" ? "0 0 14px rgba(76, 206, 172, 0.6) !important" : "0 2px 12px rgba(13, 148, 136, 0.4) !important",
                },
                "& .MuiInputBase-root": {
                  color: theme.palette.mode === "dark" ? "#ffffff !important" : "#0f172a !important",
                  fontSize: "14px !important",
                  fontWeight: "bold !important",
                  "&:before, &:after": {
                    display: "none !important",
                    borderBottom: "none !important",
                  },
                },
                "& .MuiInput-underline:before, & .MuiInput-underline:after, & .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  display: "none !important",
                  borderBottom: "none !important",
                },
                "& .MuiInputBase-input": {
                  color: theme.palette.mode === "dark" ? "#ffffff !important" : "#0f172a !important",
                  WebkitTextFillColor: theme.palette.mode === "dark" ? "#ffffff !important" : "#0f172a !important",
                  padding: "4px 6px !important",
                  fontSize: "14px !important",
                  fontWeight: "600 !important",
                  "&::placeholder": {
                    color: theme.palette.mode === "dark" ? "#4cceac !important" : "#0d9488 !important",
                    WebkitTextFillColor: theme.palette.mode === "dark" ? "#4cceac !important" : "#0d9488 !important",
                    opacity: "1 !important",
                    fontSize: "13.5px !important",
                    fontWeight: "bold !important",
                  },
                },
                "& .MuiSvgIcon-root": {
                  color: theme.palette.mode === "dark" ? "#4cceac !important" : "#0d9488 !important",
                  fontSize: "22px !important",
                  marginRight: "6px !important",
                },
              },
            },
          }}
        >
          {rows && (
            <DataGrid
              rows={rows}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { 
                    debounceMs: 200,
                    placeholder: "Search Table Content...",
                  },
                },
              }}
              onRowClick={(params) => {
                if (params.row && params.row.symbol) {
                  setSelectedSymbol(params.row.symbol);
                }
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
