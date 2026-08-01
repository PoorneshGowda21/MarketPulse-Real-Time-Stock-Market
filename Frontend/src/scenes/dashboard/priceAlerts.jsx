import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  Chip,
  useTheme,
} from "@mui/material";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";

const PriceAlerts = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Load persisted alerts from localStorage, default to empty
  const [alerts, setAlerts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("price_alerts") || "[]");
    } catch { return []; }
  });

  const [form, setForm] = useState({
    symbol: "AAPL",
    targetPrice: "",
    condition: "Above",
    notificationType: "Email & Browser",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleCreateAlert = (e) => {
    e.preventDefault();
    if (!form.targetPrice) return;

    const newAlert = {
      id: Date.now(),
      symbol: form.symbol.toUpperCase(),
      company: form.symbol === "AAPL" ? "Apple Inc." : form.symbol === "TSLA" ? "Tesla Inc." : form.symbol === "NVDA" ? "NVIDIA Corp." : form.symbol === "RELIANCE" ? "Reliance Industries" : form.symbol === "TCS" ? "Tata Consultancy" : form.symbol.toUpperCase(),
      targetPrice: parseFloat(form.targetPrice),
      condition: form.condition,
      currentPrice: 0,
      status: "Active",
    };

    const updated = [newAlert, ...alerts];
    setAlerts(updated);
    localStorage.setItem("price_alerts", JSON.stringify(updated));
    setForm({ symbol: "AAPL", targetPrice: "", condition: "Above", notificationType: "Email & Browser" });
    setSnackbar({ open: true, message: `🎉 Price alert set for ${newAlert.symbol} — ${newAlert.condition} $${newAlert.targetPrice.toFixed(2)}!`, severity: "success" });
  };

  const handleDeleteAlert = (id) => {
    const updated = alerts.filter((alert) => alert.id !== id);
    setAlerts(updated);
    localStorage.setItem("price_alerts", JSON.stringify(updated));
    setSnackbar({ open: true, message: "Alert removed successfully", severity: "info" });
  };

  return (
    <Box sx={{ p: 3, maxWidth: "1100px", margin: "0 auto" }}>
      <Header title="Price Alerts System" subtitle="Configure Real-Time Price Target Triggers & Browser/Email Notifications" />

      {/* Set Alert Form Box */}
      <Card
        sx={{
          backgroundColor: isDark ? "#1F2A40" : "#ffffff",
          borderRadius: "16px",
          border: isDark ? "2px solid #4cceac" : "2px solid #0d9488",
          boxShadow: isDark ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 4px 20px rgba(0, 0, 0, 0.08)",
          p: 3,
          mb: 4,
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <AddAlertIcon sx={{ color: "#4cceac", fontSize: "28px" }} />
            <Typography variant="h5" sx={{ color: isDark ? "#ffffff" : "#0f172a", fontWeight: "bold" }}>
              Create New Price Trigger
            </Typography>
          </Box>

          <form onSubmit={handleCreateAlert}>
            <Grid container spacing={2.5} alignItems="center">
              <Grid item xs={12} sm={3}>
                <TextField
                  select
                  fullWidth
                  label="Stock Symbol"
                  value={form.symbol}
                  onChange={(e) => setForm({ ...form, symbol: e.target.value })}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: isDark ? "#ffffff" : "#0f172a",
                      backgroundColor: isDark ? "#141b2d" : "#f8fafc",
                      "& fieldset": { borderColor: isDark ? "#3e4396" : "#cbd5e1" },
                      "&:hover fieldset": { borderColor: "#4cceac" },
                      "&.Mui-focused fieldset": { borderColor: "#4cceac" },
                    },
                    "& .MuiInputLabel-root": { color: isDark ? "#a3a3a3" : "#64748b" },
                  }}
                >
                  <MenuItem value="AAPL">AAPL (Apple Inc.)</MenuItem>
                  <MenuItem value="TSLA">TSLA (Tesla Inc.)</MenuItem>
                  <MenuItem value="NVDA">NVDA (NVIDIA Corp.)</MenuItem>
                  <MenuItem value="RELIANCE">RELIANCE (Reliance Ind.)</MenuItem>
                  <MenuItem value="TCS">TCS (Tata Consultancy)</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  select
                  fullWidth
                  label="Trigger Condition"
                  value={form.condition}
                  onChange={(e) => setForm({ ...form, condition: e.target.value })}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: isDark ? "#ffffff" : "#0f172a",
                      backgroundColor: isDark ? "#141b2d" : "#f8fafc",
                      "& fieldset": { borderColor: isDark ? "#3e4396" : "#cbd5e1" },
                      "&:hover fieldset": { borderColor: "#4cceac" },
                      "&.Mui-focused fieldset": { borderColor: "#4cceac" },
                    },
                    "& .MuiInputLabel-root": { color: isDark ? "#a3a3a3" : "#64748b" },
                  }}
                >
                  <MenuItem value="Above">Price Rises Above (≥)</MenuItem>
                  <MenuItem value="Below">Price Drops Below (≤)</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="number"
                  label="Target Price ($)"
                  value={form.targetPrice}
                  onChange={(e) => setForm({ ...form, targetPrice: e.target.value })}
                  variant="outlined"
                  placeholder="e.g. 230.00"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: isDark ? "#ffffff" : "#0f172a",
                      backgroundColor: isDark ? "#141b2d" : "#f8fafc",
                      "& fieldset": { borderColor: isDark ? "#3e4396" : "#cbd5e1" },
                      "&:hover fieldset": { borderColor: "#4cceac" },
                      "&.Mui-focused fieldset": { borderColor: "#4cceac" },
                    },
                    "& .MuiInputLabel-root": { color: isDark ? "#a3a3a3" : "#64748b" },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1.8,
                    backgroundColor: "#4cceac",
                    color: "#141b2d",
                    fontWeight: "bold",
                    fontSize: "15px",
                    borderRadius: "10px",
                    "&:hover": { backgroundColor: "#3da58a" },
                  }}
                >
                  SET PRICE ALERT
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Active Price Alerts Queue */}
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
            <NotificationsActiveIcon sx={{ color: "#60a5fa", fontSize: "28px" }} />
            <Typography variant="h5" sx={{ color: isDark ? "#ffffff" : "#0f172a", fontWeight: "bold" }}>
              Active Target Price Alerts Queue
            </Typography>
          </Box>

          {alerts.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 6,
                color: isDark ? "#a3a3a3" : "#64748b",
              }}
            >
              <NotificationsActiveIcon sx={{ fontSize: 52, opacity: 0.3, mb: 1.5 }} />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>No active alerts</Typography>
              <Typography variant="body2">Create a price trigger above to get notified when a stock hits your target.</Typography>
            </Box>
          ) : (
          <Grid container spacing={2}>
            {alerts.map((alert) => (
              <Grid item xs={12} key={alert.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderRadius: "12px",
                    backgroundColor: isDark ? "#141b2d" : "#f8fafc",
                    border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ color: isDark ? "#ffffff" : "#0f172a", fontWeight: "bold" }}>
                      {alert.symbol} <span style={{ fontSize: "14px", color: isDark ? "#a3a3a3" : "#64748b" }}>({alert.company})</span>
                    </Typography>
                    <Typography variant="body2" sx={{ color: isDark ? "#a3a3a3" : "#64748b" }}>
                      Trigger when price goes <strong>{alert.condition}</strong> ${alert.targetPrice.toFixed(2)} (Current: ${alert.currentPrice.toFixed(2)})
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Chip
                      label={alert.status}
                      sx={{
                        backgroundColor: alert.status === "Triggered" ? "rgba(76, 206, 172, 0.2)" : "rgba(96, 165, 250, 0.2)",
                        color: alert.status === "Triggered" ? "#4cceac" : "#60a5fa",
                        fontWeight: "bold",
                      }}
                    />
                    <Button onClick={() => handleDeleteAlert(alert.id)} sx={{ minWidth: "40px", color: "#f87171" }}>
                      <DeleteIcon />
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%", backgroundColor: "#4cceac", color: "#141b2d", fontWeight: "bold" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PriceAlerts;
