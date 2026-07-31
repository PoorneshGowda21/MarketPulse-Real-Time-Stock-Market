import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Icon from "@mui/material/Icon";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Headers";
// import { abc } from "../../mockData";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useAuthContext } from "../../hooks/useAuthContext.jsx";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { CleaningServices } from "@mui/icons-material";
import React from "react";
// import NewsCard from "../Cards/NewsCard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const Portfolio = () => {
  // const { user } = useAuthContext();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id || user?._id || "";
  console.log(user);
  const history = useNavigate();
  // const [abc, setAbc] = useState([]);
  const [rows, setRows] = useState([]);
  const [invAmt, setInvAmt] = useState(0);
  const [currAmt, setCurrAmt] = useState(0);
  const [tProfit, setTProfit] = useState(0);

  // const [rows: GridRowsProp, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = userId ? "http://localhost:8080/portfolio/".concat(userId) : "";
  // console.log(url);

  const fetchData = async () => {
    let abc = [];
    const temp = [];
    let totalAmount = 0;
    let totalProfit = 0;
    let totalCurrAmount = 0;

    await fetch(url)
      .then((response) => response.json())
      // .then((response) => setAbc(response));
      .then((response) => {
        response.map((d) => abc.push(d));
      });
    console.log(abc);
    for (var key in abc) {
      if (!abc.hasOwnProperty(key)) continue;
      let newData = [];
      const url = "https://finnhub.io/api/v1/quote?symbol=".concat(
        abc[key].symbol,
        "&token=c94i99aad3if4j50rvn0"
      );
      await axios
        .get(url)
        .then((res) => {
          const pData = res.data;
          newData.push(pData);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(newData);

      const ab = {
        id: abc[key]._id,
        name: abc[key].name,
        symbol: abc[key].symbol,
        today: newData[0]["c"],
        buyPrice: abc[key].price,
        shares: abc[key].shares,
        currAmount: abc[key].shares*newData[0]["c"],
        invAmount: abc[key].shares*abc[key].price,
        profit: abc[key].shares*newData[0]["c"] - abc[key].shares*abc[key].price
        // id: abc[key]._id,
        // name: abc[key].name,
        // symbol: abc[key].symbol,
        // delete: abc[key]._id,
        // ids: abc[key]._id,
        // today: newData[0]["c"],
        // Percent: newData[0]["dp"] + " %",
        // open: newData[0]["o"],
        // high: newData[0]["h"],
        // low: newData[0]["l"],
        // close: newData[0]["pc"],
      };

      totalAmount+=ab.invAmount;
      totalProfit+=ab.profit;
      totalCurrAmount += ab.currAmount
      // console.log(pData[key].name)
      temp.push(ab);

    }
    setInvAmt(totalAmount)
    setTProfit(totalProfit);
    setCurrAmt(totalCurrAmount)
    console.log(temp);
    const s = new Set(temp);
    console.log(s);
    setRows(Array.from(s));
    // setIsLoading(false);
  };

  useEffect(() => {
    // abc = [];
    // temp = [];
    fetchData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "name",
      headerName: " Company Name",
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
      headerName: "Current Price",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "buyPrice",
      headerName: "Average Price",
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
      field: "currAmount",
      headerName: "Current Amount",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "invAmount",
      headerName: "Invested Amount",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "profit",
      headerName: "Profit/Loss",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Sell",
      headerName: "Sell",
      sortable: false,
      renderCell: (params) => {
        const Remove = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          // return alert(JSON.stringify(thisRow.name, null, 4));
          // return;
          console.log(thisRow)
              history('/sellStock',{state:thisRow});
        };

        return (
          <Button onClick={Remove} variant="outlined" color="error">
            Sell
          </Button>
        );
      },
    },
  ];

  return (
    <>
      {/* {isLoading && <h1>Loading Data...</h1>} */}
      <Box m="20px">
        <Header title="Portfolio" />
        {/* Stylish Portfolio Summary Stat Card */}
        <Box
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "#1F2A40" : "#ffffff",
            borderRadius: "16px",
            border: theme.palette.mode === "dark" ? "2px solid #4cceac" : "2px solid #0d9488",
            boxShadow: theme.palette.mode === "dark" ? "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(76, 206, 172, 0.2)" : "0 4px 20px rgba(0, 0, 0, 0.08)",
            p: 3.5,
            my: 2,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              boxShadow: theme.palette.mode === "dark" ? "0 12px 36px rgba(0, 0, 0, 0.65), 0 0 25px rgba(76, 206, 172, 0.35)" : "0 8px 24px rgba(0, 0, 0, 0.12)",
              transform: "translateY(-1px)",
            },
          }}
        >
          <Grid container spacing={3} justifyContent="space-around" alignItems="center">
            <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
              <Typography variant="subtitle2" sx={{ color: theme.palette.mode === "dark" ? "#a3a3a3" : "#64748b", fontWeight: "bold", fontSize: "13.5px", letterSpacing: "0.5px", mb: 0.5 }}>
                INVESTED AMOUNT
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.mode === "dark" ? "#60a5fa" : "#2563eb", fontWeight: "900", fontSize: "24px" }}>
                $ {invAmt.toFixed(2)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
              <Typography variant="subtitle2" sx={{ color: theme.palette.mode === "dark" ? "#a3a3a3" : "#64748b", fontWeight: "bold", fontSize: "13.5px", letterSpacing: "0.5px", mb: 0.5 }}>
                CURRENT AMOUNT
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#0f172a", fontWeight: "900", fontSize: "24px" }}>
                $ {currAmt.toFixed(2)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
              <Typography variant="subtitle2" sx={{ color: theme.palette.mode === "dark" ? "#a3a3a3" : "#64748b", fontWeight: "bold", fontSize: "13.5px", letterSpacing: "0.5px", mb: 0.5 }}>
                PROFIT / LOSS
              </Typography>
              <Typography variant="h4" sx={{ color: tProfit >= 0 ? "#4cceac" : "#f87171", fontWeight: "900", fontSize: "24px" }}>
                {tProfit >= 0 ? "+" : ""}$ {tProfit.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {/* {invAmt}
        {tProfit} */}
        <Box
          m="30px 0 0 0"
          height="70vh"
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
                "& .MuiSvgIcon-root": {
                  color: theme.palette.mode === "dark" ? "#4cceac !important" : "#0d9488 !important",
                  fontSize: "20px !important",
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
                  quickFilterProps: { debounceMs: 300 },
                },
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Portfolio;
