import React, { useEffect, useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Headers";

const Portfolio = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id || user?._id || "";
  const [rows, setRows] = useState([]);

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

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              if (!rows || rows.length === 0) return;
              const headers = ["Company Name", "Symbol", "Price", "Quantity", "Trade Type"];
              const csvRows = rows.map((r) => [
                `"${r.name || ''}"`,
                `"${r.symbol || ''}"`,
                r.today || r.price || 0,
                r.shares || r.quantity || 0,
                `"${r.tradeType || 'BUY'}"`,
              ].join(","));
              const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...csvRows].join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", `MarketPulse_Trade_History_${Date.now()}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            sx={{
              backgroundColor: "#4cceac",
              color: "#141b2d",
              fontWeight: "bold",
              px: 3,
              py: 1,
              borderRadius: "8px",
              boxShadow: "0 0 12px rgba(76, 206, 172, 0.4)",
              "&:hover": { backgroundColor: "#3da58a" }
            }}
          >
            EXPORT CSV
          </Button>
        </Box>

        <Box
          m="20px 0 0 0"
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
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.mode === "dark" ? "#141b2d !important" : "#ffffff !important",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: theme.palette.mode === "dark" ? "1px solid rgba(76, 206, 172, 0.25)" : "1px solid #e2e8f0",
              backgroundColor: theme.palette.mode === "dark" ? "#141b2d !important" : "#f8fafc !important",
              color: theme.palette.mode === "dark" ? "#e0e0e0 !important" : "#1e293b !important",
            },
            "& .MuiDataGrid-toolbarContainer": {
              mb: 1,
              display: "flex",
              justifyContent: "space-between",
              "& .MuiButton-text": {
                color: theme.palette.mode === "dark" ? "#4cceac !important" : "#0d9488 !important",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-toolbarQuickFilter": {
                backgroundColor: theme.palette.mode === "dark" ? "#141b2d !important" : "#f8fafc !important",
                borderRadius: "8px !important",
                border: theme.palette.mode === "dark" ? "2px solid #4cceac !important" : "2px solid #0d9488 !important",
                padding: "4px 12px !important",
                display: "inline-flex !important",
                "& .MuiInputBase-root": {
                  color: theme.palette.mode === "dark" ? "#ffffff !important" : "#0f172a !important",
                  fontWeight: "bold !important",
                },
                "& .MuiSvgIcon-root": {
                  color: theme.palette.mode === "dark" ? "#4cceac !important" : "#0d9488 !important",
                },
              },
            },
          }}
        >
          {
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
          }
        </Box>
      </Box>
    </>
  );
};

export default Portfolio;
