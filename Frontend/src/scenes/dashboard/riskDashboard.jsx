import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  useTheme,
  Alert,
  AlertTitle,
} from "@mui/material";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Header from "../../components/Header";

// Stock Sector & Beta Reference Table
const STOCK_META = {
  AAPL: { sector: "Technology", beta: 1.15, vol: "18.4%" },
  MSFT: { sector: "Technology", beta: 0.98, vol: "15.2%" },
  NVDA: { sector: "Technology", beta: 1.72, vol: "32.1%" },
  TSLA: { sector: "Consumer Cyclical", beta: 1.85, vol: "36.4%" },
  GOOGL: { sector: "Technology", beta: 1.05, vol: "19.1%" },
  AMZN: { sector: "Consumer Cyclical", beta: 1.18, vol: "22.0%" },
  V: { sector: "Financial Services", beta: 0.92, vol: "14.1%" },
  JPM: { sector: "Financial Services", beta: 1.08, vol: "17.5%" },
  RELIANCE: { sector: "Energy & Utilities", beta: 0.88, vol: "16.0%" },
  TCS: { sector: "Technology", beta: 0.78, vol: "12.8%" },
  HDFCBANK: { sector: "Financial Services", beta: 0.95, vol: "15.0%" },
  INFY: { sector: "Technology", beta: 0.85, vol: "14.5%" },
};

const SECTOR_COLORS = {
  "Technology": "#60a5fa",
  "Financial Services": "#4cceac",
  "Consumer Cyclical": "#f59e0b",
  "Healthcare": "#ec4899",
  "Energy & Utilities": "#a855f7",
  "General Equity": "#94a3b8",
};

const RiskDashboard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id || user?._id || "";

  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!userId) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/user/${userId}`);
        if (response.ok) {
          const pData = await response.json();
          const temp = [];
          for (let key in pData) {
            if (pData[key].name !== undefined && pData[key].name !== null) {
              const ab = {
                name: pData[key].name,
                symbol: pData[key].symbol || pData[key].Symbol || "EQUITY",
                today: pData[key].today || pData[key].price || 100,
                invAmount: pData[key].invAmount || 0,
                currAmount: pData[key].currAmount || 0,
                quantity: pData[key].quantity || pData[key].shares || 1,
              };
              temp.push(ab);
            }
          }
          setHoldings(temp);
        }
      } catch (err) {
        console.log("Risk analysis using fallback state", err);
      }
    };

    fetchPortfolio();
  }, [userId]);

  // Compute Dynamic Metrics
  const totalValue = holdings.reduce((sum, h) => sum + (h.currAmount || (h.today * h.quantity)), 0);
  const hasHoldings = holdings.length > 0 && totalValue > 0;

  // Sector Breakdown Calculation
  const sectorMap = {};
  let totalWeightedBeta = 0;
  let highestVolStock = { symbol: "None", beta: 0, vol: "0%" };

  if (hasHoldings) {
    holdings.forEach((item) => {
      const sym = (item.symbol || "EQUITY").toUpperCase();
      const meta = STOCK_META[sym] || { sector: "General Equity", beta: 1.0, vol: "15.0%" };
      const val = item.currAmount || (item.today * item.quantity);
      const weight = val / totalValue;

      sectorMap[meta.sector] = (sectorMap[meta.sector] || 0) + val;
      totalWeightedBeta += meta.beta * weight;

      if (meta.beta > highestVolStock.beta) {
        highestVolStock = { symbol: sym, name: item.name, beta: meta.beta, vol: meta.vol };
      }
    });
  }

  const sectorBreakdown = Object.keys(sectorMap).map((sec) => ({
    sector: sec,
    amount: sectorMap[sec],
    allocation: Math.round((sectorMap[sec] / totalValue) * 100),
    color: SECTOR_COLORS[sec] || "#4cceac",
  })).sort((a, b) => b.allocation - a.allocation);

  const maxSectorAlloc = sectorBreakdown.length > 0 ? sectorBreakdown[0].allocation : 0;
  const numSectors = sectorBreakdown.length;

  // Dynamic Scores
  const portfolioBeta = hasHoldings ? parseFloat(totalWeightedBeta.toFixed(2)) : 0;
  const diversificationScore = hasHoldings ? Math.min(100, Math.round(numSectors * 25 - (maxSectorAlloc > 50 ? 20 : 0))) : 0;
  const riskScore = hasHoldings ? Math.min(100, Math.max(10, Math.round(portfolioBeta * 30 + (maxSectorAlloc > 45 ? 25 : 10)))) : 0;

  let riskCategory = "Zero Active Risk (Empty Portfolio)";
  if (hasHoldings) {
    if (riskScore < 35) riskCategory = "Low Risk Portfolio";
    else if (riskScore < 65) riskCategory = "Moderate Risk Portfolio";
    else riskCategory = "High Volatility Risk";
  }

  // Dynamic Rule Alerts
  const ruleAlerts = [];
  if (!hasHoldings) {
    ruleAlerts.push({
      severity: "info",
      title: "Portfolio Initialization Required",
      message: "You currently have no active stock positions in your portfolio. Buy stocks from Stock Listings or Watchlist to view automated risk scores and sector analysis.",
    });
  } else {
    if (maxSectorAlloc <= 45) {
      ruleAlerts.push({
        severity: "success",
        title: "Sector Diversification Rule Passed",
        message: `Your highest sector concentration is ${maxSectorAlloc}% in ${sectorBreakdown[0].sector}, which is below the 45% risk threshold.`,
      });
    } else {
      ruleAlerts.push({
        severity: "warning",
        title: "High Sector Concentration Alert",
        message: `High risk detected: ${maxSectorAlloc}% of your portfolio is concentrated in ${sectorBreakdown[0].sector}. Consider diversifying into other sectors.`,
      });
    }

    ruleAlerts.push({
      severity: "info",
      title: "Beta Volatility Benchmark",
      message: `Your calculated Portfolio Beta is ${portfolioBeta}. Your portfolio is expected to move ${Math.round(portfolioBeta * 100)}% relative to market benchmark index moves.`,
    });

    if (highestVolStock.beta > 1.4) {
      ruleAlerts.push({
        severity: "warning",
        title: "High Asset Volatility Warning",
        message: `${highestVolStock.symbol} (${highestVolStock.name}) exhibits elevated volatility with a Beta of ${highestVolStock.beta} (30D Volatility: ${highestVolStock.vol}).`,
      });
    }
  }

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", margin: "0 auto" }}>
      <Header title="Risk & Volatility Analytics" subtitle="Real-Time Risk Scoring, Dynamic Diversification & Portfolio Beta Analysis" />

      {/* Overview Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Risk Score Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: isDark ? "#1F2A40" : "#ffffff",
              borderRadius: "16px",
              border: isDark ? "1px solid rgba(76, 206, 172, 0.35)" : "1px solid #cbd5e1",
              boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.08)",
              p: 2,
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="subtitle2" sx={{ color: isDark ? "#a3a3a3" : "#64748b", fontWeight: "bold" }}>
                  PORTFOLIO RISK SCORE
                </Typography>
                <ShieldOutlinedIcon sx={{ color: "#4cceac" }} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: "900", color: "#4cceac", mb: 1 }}>
                {riskScore} <span style={{ fontSize: "16px", color: isDark ? "#a3a3a3" : "#64748b" }}>/ 100</span>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={riskScore}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: isDark ? "#141b2d" : "#e2e8f0",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#4cceac" },
                  mb: 1,
                }}
              />
              <Chip label={riskCategory} size="small" sx={{ backgroundColor: "rgba(76, 206, 172, 0.15)", color: "#4cceac", fontWeight: "bold" }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Diversification Score Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: isDark ? "#1F2A40" : "#ffffff",
              borderRadius: "16px",
              border: isDark ? "1px solid rgba(76, 206, 172, 0.35)" : "1px solid #cbd5e1",
              boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.08)",
              p: 2,
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="subtitle2" sx={{ color: isDark ? "#a3a3a3" : "#64748b", fontWeight: "bold" }}>
                  DIVERSIFICATION INDEX
                </Typography>
                <PieChartOutlineIcon sx={{ color: "#60a5fa" }} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: "900", color: "#60a5fa", mb: 1 }}>
                {diversificationScore}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={diversificationScore}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: isDark ? "#141b2d" : "#e2e8f0",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#60a5fa" },
                  mb: 1,
                }}
              />
              <Typography variant="caption" sx={{ color: isDark ? "#a3a3a3" : "#64748b", fontWeight: 600 }}>
                {hasHoldings ? `Spread across ${numSectors} sectors` : "No active holdings"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Portfolio Beta Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: isDark ? "#1F2A40" : "#ffffff",
              borderRadius: "16px",
              border: isDark ? "1px solid rgba(76, 206, 172, 0.35)" : "1px solid #cbd5e1",
              boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.08)",
              p: 2,
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="subtitle2" sx={{ color: isDark ? "#a3a3a3" : "#64748b", fontWeight: "bold" }}>
                  BENCHMARK BETA (β)
                </Typography>
                <ShowChartIcon sx={{ color: "#f59e0b" }} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: "900", color: "#ffffff", mb: 1 }}>
                {portfolioBeta.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? "#a3a3a3" : "#64748b" }}>
                Holdings Count: <span style={{ color: "#f59e0b", fontWeight: "bold" }}>{holdings.length} Assets</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Most Volatile Asset Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: isDark ? "#1F2A40" : "#ffffff",
              borderRadius: "16px",
              border: isDark ? "1px solid rgba(76, 206, 172, 0.35)" : "1px solid #cbd5e1",
              boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.08)",
              p: 2,
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="subtitle2" sx={{ color: isDark ? "#a3a3a3" : "#64748b", fontWeight: "bold" }}>
                  HIGHEST VOLATILITY
                </Typography>
                <WarningAmberIcon sx={{ color: "#f87171" }} />
              </Box>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: "#f87171", mb: 1 }}>
                {hasHoldings ? `${highestVolStock.symbol} (β ${highestVolStock.beta})` : "No Positions"}
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#a3a3a3" : "#64748b" }}>
                {hasHoldings ? `30D Volatility: ${highestVolStock.vol}` : "Buy stocks to analyze asset risk"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Breakdown & Rule Alerts Section */}
      <Grid container spacing={3}>
        {/* Sector Allocation Breakdown */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: isDark ? "#1F2A40" : "#ffffff",
              borderRadius: "16px",
              border: isDark ? "1px solid rgba(76, 206, 172, 0.35)" : "1px solid #cbd5e1",
              boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.08)",
              p: 3,
              height: "100%",
            }}
          >
            <Typography variant="h5" sx={{ color: isDark ? "#ffffff" : "#0f172a", fontWeight: "bold", mb: 3 }}>
              Sector Concentration Breakdown
            </Typography>

            {!hasHoldings ? (
              <Box sx={{ py: 6, textAlign: "center" }}>
                <Typography variant="body1" sx={{ color: isDark ? "#a3a3a3" : "#64748b", fontWeight: 600 }}>
                  📊 No active stock holdings in portfolio.
                </Typography>
                <Typography variant="body2" sx={{ color: isDark ? "#64748b" : "#94a3b8", mt: 1 }}>
                  Buy shares from Stock Listings to view your live sector concentration.
                </Typography>
              </Box>
            ) : (
              sectorBreakdown.map((item, index) => (
                <Box sx={{ mb: 2.5 }} key={index}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                    <Typography variant="body2" sx={{ color: isDark ? "#ffffff" : "#0f172a", fontWeight: "bold" }}>
                      {item.sector}
                    </Typography>
                    <Typography variant="body2" sx={{ color: item.color, fontWeight: "bold" }}>
                      {item.allocation}% (${item.amount.toFixed(2)})
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={item.allocation}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: isDark ? "#141b2d" : "#e2e8f0",
                      "& .MuiLinearProgress-bar": { backgroundColor: item.color },
                    }}
                  />
                </Box>
              ))
            )}
          </Card>
        </Grid>

        {/* Rule-Based Risk Alerts */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: isDark ? "#1F2A40" : "#ffffff",
              borderRadius: "16px",
              border: isDark ? "1px solid rgba(76, 206, 172, 0.35)" : "1px solid #cbd5e1",
              boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.08)",
              p: 3,
              height: "100%",
            }}
          >
            <Typography variant="h5" sx={{ color: isDark ? "#ffffff" : "#0f172a", fontWeight: "bold", mb: 3 }}>
              Automated Risk Rule Evaluation
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {ruleAlerts.map((alert, index) => (
                <Alert
                  key={index}
                  severity={alert.severity}
                  sx={{
                    borderRadius: "12px",
                    border: "1px solid",
                    borderColor: alert.severity === "success" ? "#4cceac" : alert.severity === "warning" ? "#f59e0b" : "#60a5fa",
                    backgroundColor: isDark ? "#141b2d" : "#f8fafc",
                    color: isDark ? "#ffffff" : "#0f172a",
                  }}
                >
                  <AlertTitle sx={{ fontWeight: "bold" }}>{alert.title}</AlertTitle>
                  {alert.message}
                </Alert>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RiskDashboard;
