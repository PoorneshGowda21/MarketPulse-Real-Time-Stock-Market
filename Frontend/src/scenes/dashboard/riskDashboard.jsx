import React, { useState } from "react";
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

const RiskDashboard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Statistical & Rule-Based Metrics
  const riskMetrics = {
    riskScore: 32, // Out of 100 (Lower is safer)
    riskCategory: "Low to Moderate Risk",
    diversificationScore: 88, // Out of 100
    portfolioBeta: 0.94, // Volatility vs S&P 500 benchmark
    volatility30D: "14.2%", // Standard deviation over 30 days
    mostVolatileStock: "TSLA (Tesla Inc.) - Beta 1.82",
    bestRiskReward: "AAPL (Apple Inc.) - Sharpe 2.1",
    sectorBreakdown: [
      { sector: "Technology", allocation: 38, color: "#60a5fa" },
      { sector: "Financial Services", allocation: 24, color: "#4cceac" },
      { sector: "Consumer Cyclical", allocation: 18, color: "#f59e0b" },
      { sector: "Healthcare", allocation: 12, color: "#ec4899" },
      { sector: "Energy & Utilities", allocation: 8, color: "#a855f7" },
    ],
    ruleAlerts: [
      {
        severity: "success",
        title: "Diversification Rule Passed",
        message: "No single sector exceeds the 45% maximum concentration threshold.",
      },
      {
        severity: "info",
        title: "Beta Benchmark Check",
        message: "Portfolio Beta of 0.94 indicates your holdings move slightly less volatile than the broader market.",
      },
      {
        severity: "warning",
        title: "Single Stock Volatility Alert",
        message: "TSLA accounts for 18% of portfolio equity and has 30D volatility > 28%. Consider rebalancing.",
      },
    ],
  };

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", margin: "0 auto" }}>
      <Header title="Risk & Volatility Analytics" subtitle="Statistical Risk Scoring, Sector Diversification & Benchmark Beta Analysis" />

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
                {riskMetrics.riskScore} <span style={{ fontSize: "16px", color: isDark ? "#a3a3a3" : "#64748b" }}>/ 100</span>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={riskMetrics.riskScore}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: isDark ? "#141b2d" : "#e2e8f0",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#4cceac" },
                  mb: 1,
                }}
              />
              <Chip label={riskMetrics.riskCategory} size="small" sx={{ backgroundColor: "rgba(76, 206, 172, 0.15)", color: "#4cceac", fontWeight: "bold" }} />
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
                {riskMetrics.diversificationScore}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={riskMetrics.diversificationScore}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: isDark ? "#141b2d" : "#e2e8f0",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#60a5fa" },
                  mb: 1,
                }}
              />
              <Typography variant="caption" sx={{ color: isDark ? "#a3a3a3" : "#64748b", fontWeight: 600 }}>
                Well balanced across 5 sectors
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
                {riskMetrics.portfolioBeta}
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? "#a3a3a3" : "#64748b" }}>
                30D Volatility: <span style={{ color: "#f59e0b", fontWeight: "bold" }}>{riskMetrics.volatility30D}</span>
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
                {riskMetrics.mostVolatileStock}
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#a3a3a3" : "#64748b" }}>
                Best Risk/Reward: {riskMetrics.bestRiskReward}
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

            {riskMetrics.sectorBreakdown.map((item, index) => (
              <Box sx={{ mb: 2.5 }} key={index}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                  <Typography variant="body2" sx={{ color: isDark ? "#ffffff" : "#0f172a", fontWeight: "bold" }}>
                    {item.sector}
                  </Typography>
                  <Typography variant="body2" sx={{ color: item.color, fontWeight: "bold" }}>
                    {item.allocation}%
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
            ))}
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
              Rule-Based Risk Guards
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {riskMetrics.ruleAlerts.map((alert, index) => (
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
