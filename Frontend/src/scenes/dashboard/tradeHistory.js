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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const Portfolio = () => {
  // const { user } = useAuthContext();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id || user?._id || "";
  console.log(user);
  const history = useNavigate();
  //   const [abc, setAbc] = useState([]);
  const [rows, setRows] = useState([]);
  const [invAmt, setInvAmt] = useState(0);
  const [currAmt, setCurrAmt] = useState(0);
  const [tProfit, setTProfit] = useState(0);

  // const [rows: GridRowsProp, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = userId ? "http://localhost:8080/trade/".concat(userId) : "";
  // console.log(url);

  const fetchData = async () => {
    let abc = [];
    const temp = [];
    let totalAmount = 0;
    let totalProfit = 0;
    let totalCurrAmount = 0;

    await fetch(url)
      .then((response) => response.json())
      //   .then((response) => console.log(response));
      //   .then((res) => setAbc(res));
      .then((response) => {
        response.map((d) => abc.push(d));
      });
    console.log(abc);
    for (var key in abc) {
      //   if (!abc.hasOwnProperty(key)) continue;
      //   let newData = [];
      //   const url = "https://finnhub.io/api/v1/quote?symbol=".concat(
      //     abc[key].symbol,
      //     "&token=c94i99aad3if4j50rvn0"
      //   );
      //   await axios
      //     .get(url)
      //     .then((res) => {
      //       const pData = res.data;
      //       newData.push(pData);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      //   console.log(newData);

      const ab = {
        id: abc[key]._id,
        name: abc[key].name,
        type: abc[key].tradeType,
        date: abc[key].date,

        symbol: abc[key].symbol,
        //today: newData[0]["c"],
        buyPrice: abc[key].price,
        shares: abc[key].shares,
        //currAmount: abc[key].shares * newData[0]["c"],
        invAmount: abc[key].shares * abc[key].price,
        // profit:
        //   abc[key].shares * newData[0]["c"] - abc[key].shares * abc[key].price,
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

      totalAmount += ab.invAmount;
      totalProfit += ab.profit;
      totalCurrAmount += ab.currAmount;
      // console.log(pData[key].name)
      temp.push(ab);
    }

    // setInvAmt(totalAmount);
    // setTProfit(totalProfit);
    // setCurrAmt(totalCurrAmount);
    console.log(temp);

    setRows(temp);
    console.log(rows);
    // setIsLoading(false);
  };

  useEffect(() => {
    // abc = [];
    // temp = [];
    fetchData();
  }, []);

  // console.log(abc);

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
      field: "buyPrice",
      headerName: "Buy Price",
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
      field: "type",
      headerName: "Trade Type",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "invAmount",
      headerName: "Amount",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "date",
      headerName: "Transaction Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    // {
    //   field: "Sell",
    //   headerName: "Sell",
    //   sortable: false,
    //   renderCell: (params) => {
    //     const Remove = (e) => {
    //       e.stopPropagation(); // don't select this row after clicking

    //       const api: GridApi = params.api;
    //       const thisRow: Record<string, GridCellValue> = {};

    //       api
    //         .getAllColumns()
    //         .filter((c) => c.field !== "__check__" && !!c)
    //         .forEach(
    //           (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
    //         );

    //       // return alert(JSON.stringify(thisRow.name, null, 4));
    //       // return;
    //       console.log(thisRow);
    //       history("/sellStock", { state: thisRow });
    //     };

    //     return (
    //       <Button onClick={Remove} variant="outlined" color="error">
    //         Sell
    //       </Button>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <Box m="20px">
        <Header title="Trade History" subtitle="Your Order History Deatils" />

        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              color: "#e0e0e0 !important",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #2d3748",
              color: "#e0e0e0 !important",
            },
            "& .name-column--cell": {
              color: "#4cceac !important",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1F2A40 !important",
              borderBottom: "none",
              color: "#4cceac !important",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#4cceac !important",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#141b2d !important",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#1F2A40 !important",
              color: "#e0e0e0 !important",
            },
            "& .MuiTablePagination-root": {
              color: "#e0e0e0 !important",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: "#4cceac !important",
            },
          }}
        >
          {
            <DataGrid
              rows={rows}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          }
        </Box>
      </Box>
    </>
  );
};

export default Portfolio;
