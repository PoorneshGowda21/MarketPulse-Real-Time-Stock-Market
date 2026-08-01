import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  Snackbar,
  Alert,
  Divider,
  useTheme,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Header from "../../components/Header";

const Profile = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Load existing profile details from localStorage
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    name: savedUser.name || savedUser.firstName || savedUser.username || "",
    email: savedUser.email || "",
    phone: savedUser.phone || "",
    pan: savedUser.pan || "",
    aadhaar: savedUser.aadhaar || "",
    accountNumber: savedUser.accountNumber || "",
    bankName: savedUser.bankName || "",
    ifsc: savedUser.ifsc || "",
    title: savedUser.title || "Elite Investor",
    address: savedUser.address || "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Persist permanently in localStorage
    const updatedUser = {
      ...savedUser,
      ...formData,
      firstName: formData.name.split(" ")[0],
      firstNameSaved: formData.name.split(" ")[0],
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    // Trigger custom storage event for header / sidebar state updates
    window.dispatchEvent(new Event("storage"));
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ p: 3, maxWidth: "1100px", margin: "0 auto" }}>
      <Header title="My Profile" subtitle="Manage your personal investor profile & bank KYC details" />

      {/* Main Profile Box Container */}
      <Card
        sx={{
          backgroundColor: isDark ? "#1F2A40" : "#ffffff",
          borderRadius: "16px",
          border: isDark ? "2px solid #4cceac" : "2px solid #0d9488",
          boxShadow: isDark
            ? "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(76, 206, 172, 0.2)"
            : "0 4px 20px rgba(0, 0, 0, 0.08)",
          p: 3,
          mb: 4,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <CardContent>
          {/* Header Avatar & Title Summary */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
            <Avatar
              src="https://thumbs.dreamstime.com/b/man-business-suit-icon-illustration-98773345.jpg"
              alt={formData.name}
              sx={{
                width: 90,
                height: 90,
                border: "3px solid #4cceac",
                boxShadow: "0 0 15px rgba(76, 206, 172, 0.4)",
              }}
            />
            <Box>
              <Typography variant="h4" sx={{ color: isDark ? "#ffffff" : "#0f172a", fontWeight: "900" }}>
                {formData.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#4cceac", fontWeight: 700 }}>
                {formData.title}
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? "#a3a3a3" : "#64748b" }}>
                {formData.email} • {formData.phone}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4, borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0" }} />

          <form onSubmit={handleSave}>
            {/* Section 1: Basic Information */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                <PersonIcon sx={{ color: "#4cceac" }} />
                <Typography variant="h6" sx={{ color: isDark ? "#ffffff" : "#0f172a", fontWeight: "bold" }}>
                  Basic Personal Details
                </Typography>
              </Box>

              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                      "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
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
                      "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
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
                      "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Investor Title / Designation"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
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
                      "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ mb: 4, borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0" }} />

            {/* Section 2: Identification & KYC */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                <BadgeIcon sx={{ color: "#4cceac" }} />
                <Typography variant="h6" sx={{ color: isDark ? "#ffffff" : "#0f172a", fontWeight: "bold" }}>
                  KYC & Identification Details
                </Typography>
              </Box>

              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="PAN Card Number"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
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
                      "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Aadhaar Card Number"
                    name="aadhaar"
                    value={formData.aadhaar}
                    onChange={handleChange}
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
                      "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ mb: 4, borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0" }} />

            {/* Section 3: Banking & Payout Details */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                <AccountBalanceIcon sx={{ color: "#4cceac" }} />
                <Typography variant="h6" sx={{ color: isDark ? "#ffffff" : "#0f172a", fontWeight: "bold" }}>
                  Banking & Account Details
                </Typography>
              </Box>

              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Bank Name"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
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
                      "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Account Number"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
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
                      "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="IFSC Code"
                    name="ifsc"
                    value={formData.ifsc}
                    onChange={handleChange}
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
                      "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Residential Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
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
                      "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Save Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  backgroundColor: "#4cceac",
                  color: "#141b2d",
                  fontWeight: "bold",
                  fontSize: "16px",
                  px: 5,
                  py: 1.4,
                  borderRadius: "10px",
                  boxShadow: "0 4px 14px rgba(76, 206, 172, 0.4)",
                  "&:hover": {
                    backgroundColor: "#3da58a",
                    boxShadow: "0 6px 20px rgba(76, 206, 172, 0.6)",
                  },
                }}
              >
                Save Profile Changes
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%", backgroundColor: "#4cceac", color: "#141b2d", fontWeight: "bold" }}>
          🎉 Profile details updated & saved permanently!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
