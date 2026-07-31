import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import StorageIcon from "@mui/icons-material/Storage";
import ApiIcon from "@mui/icons-material/Api";
import SecurityIcon from "@mui/icons-material/Security";
import Header from "../../components/Header";

const AdminDashboard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const infraMetrics = {
    serverStatus: "Operational (99.98% Uptime)",
    redisHitRatio: "94.2%",
    activeSockets: "1,248 Connections",
    apiCallsPerMin: "142 req/min",
    avgResponseTime: "38 ms",
    finnhubLimit: "28/60 call/min (Within Limits)",
  };

  const auditLogs = [
    { id: 101, timestamp: "2026-07-31 16:40:12", actor: "Poornesh Gowda", action: "PROFILE_UPDATE", target: "User KYC Details", details: "Updated PAN & Aadhaar details" },
    { id: 102, timestamp: "2026-07-31 16:25:40", actor: "System Engine", action: "ORDER_EXECUTE", target: "Market Order #9421", details: "Executed 100 shares of AAPL @ $224.20" },
    { id: 103, timestamp: "2026-07-31 16:10:05", actor: "Admin Operator", action: "CACHE_PURGE", target: "Redis Stock Cache", details: "Cache invalidation executed cleanly" },
    { id: 104, timestamp: "2026-07-31 15:45:22", actor: "Security Daemon", action: "AUTH_ROTATE", target: "JWT Refresh Tokens", details: "Rotated authorization token secret" },
  ];

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", margin: "0 auto" }}>
      <Header title="Admin & Infrastructure Control" subtitle="Server Health, Redis Cache Hit Rates, Rate Limiting & Financial Audit Logs" />

      {/* Infra Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
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
                  SERVER UPTIME
                </Typography>
                <SpeedIcon sx={{ color: "#4cceac" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "900", color: "#4cceac", mb: 1 }}>
                99.98%
              </Typography>
              <Chip label="Healthy" size="small" sx={{ backgroundColor: "rgba(76, 206, 172, 0.2)", color: "#4cceac", fontWeight: "bold" }} />
            </CardContent>
          </Card>
        </Grid>

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
                  REDIS CACHE HIT RATIO
                </Typography>
                <StorageIcon sx={{ color: "#60a5fa" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "900", color: "#60a5fa", mb: 1 }}>
                {infraMetrics.redisHitRatio}
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#a3a3a3" : "#64748b" }}>
                Cache-Aside Pattern (~5s TTL)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

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
                  AVG RESPONSE TIME
                </Typography>
                <ApiIcon sx={{ color: "#f59e0b" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "900", color: "#ffffff", mb: 1 }}>
                {infraMetrics.avgResponseTime}
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#a3a3a3" : "#64748b" }}>
                API Rate: {infraMetrics.apiCallsPerMin}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

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
                  SECURITY & RATE LIMIT
                </Typography>
                <SecurityIcon sx={{ color: "#a855f7" }} />
              </Box>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: "#a855f7", mb: 1 }}>
                {infraMetrics.finnhubLimit}
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#a3a3a3" : "#64748b" }}>
                Token-Bucket Algorithm Active
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Security Audit Action Logs */}
      <Card
        sx={{
          backgroundColor: isDark ? "#1F2A40" : "#ffffff",
          borderRadius: "16px",
          border: isDark ? "1px solid rgba(76, 206, 172, 0.35)" : "1px solid #cbd5e1",
          boxShadow: isDark ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 4px 20px rgba(0, 0, 0, 0.08)",
          p: 3,
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <SecurityIcon sx={{ color: "#4cceac", fontSize: "28px" }} />
            <Typography variant="h5" sx={{ color: isDark ? "#ffffff" : "#0f172a", fontWeight: "bold" }}>
              Financial & Security Audit Logs
            </Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: isDark ? "#141b2d" : "#f8fafc" }}>
                  <TableCell sx={{ color: "#4cceac", fontWeight: "bold" }}>Timestamp</TableCell>
                  <TableCell sx={{ color: "#4cceac", fontWeight: "bold" }}>Actor / User</TableCell>
                  <TableCell sx={{ color: "#4cceac", fontWeight: "bold" }}>Action Type</TableCell>
                  <TableCell sx={{ color: "#4cceac", fontWeight: "bold" }}>Target Entity</TableCell>
                  <TableCell sx={{ color: "#4cceac", fontWeight: "bold" }}>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id} sx={{ "&:hover": { backgroundColor: isDark ? "rgba(76, 206, 172, 0.08)" : "#f1f5f9" } }}>
                    <TableCell sx={{ color: isDark ? "#ffffff" : "#0f172a", fontSize: "13px" }}>{log.timestamp}</TableCell>
                    <TableCell sx={{ color: isDark ? "#ffffff" : "#0f172a", fontWeight: "bold" }}>{log.actor}</TableCell>
                    <TableCell>
                      <Chip label={log.action} size="small" sx={{ backgroundColor: "rgba(96, 165, 250, 0.2)", color: "#60a5fa", fontWeight: "bold" }} />
                    </TableCell>
                    <TableCell sx={{ color: isDark ? "#a3a3a3" : "#64748b" }}>{log.target}</TableCell>
                    <TableCell sx={{ color: isDark ? "#ffffff" : "#0f172a" }}>{log.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
