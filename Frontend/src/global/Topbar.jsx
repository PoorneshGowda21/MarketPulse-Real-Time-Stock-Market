import { Typography, Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { ColorModeContext, tokens } from "./../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useLogout } from './../hooks/useLogout';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const { logout } = useLogout();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.id || user?._id;
    const initialBal = user?.balanceSaved ?? user?.balance ?? 500000;
    const [userBal, setUserBal] = useState(initialBal);
    let navigate = useNavigate();

    useEffect(() => {
      if (!userId) return;
      const url = "http://localhost:8080/user/".concat(userId);
      fetch(url)
       .then((res) => res.json())
       .then((data) => {
        if (data && data.balance !== undefined) {
          setUserBal(data.balance);
        }
       })
       .catch((err) => {
        console.log(err.message);
       });
    }, [userId]);

    async function logoutHandler() {
      logout();
      navigate("../");
    }

    return (
      <Box sx={{ backgroundColor: "#0b1329", borderBottom: "1px solid #1e293b" }}>
        {/* Main Top Header Bar (Nexus Core Style) */}
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          sx={{ 
            px: 3, 
            py: 1.8, 
          }}
        >
          {/* Logo Badge + Brand Title */}
          <Box display="flex" alignItems="center" gap={1.8}>
            <Box 
              sx={{ 
                width: 44, 
                height: 44, 
                borderRadius: "12px", 
                background: "linear-gradient(135deg, #0d9488 0%, #4cceac 100%)",
                boxShadow: "0 0 20px rgba(76, 206, 172, 0.4)",
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center" 
              }}
            >
              <TrendingUpIcon sx={{ color: "#141b2d", fontSize: "26px" }} />
            </Box>

            <Typography
              variant="h5"
              sx={{ 
                fontWeight: 800, 
                color: "#ffffff", 
                letterSpacing: "0.8px",
                fontSize: "20px",
                display: "flex",
                alignItems: "center"
              }}
            >
              STOCKS &nbsp;<span style={{ color: "#3b82f6" }}>CORE PLATFORM</span>
            </Typography>
          </Box>

          {/* Right Side Action Controls */}
          <Box display="flex" alignItems="center" gap={1.5}>
            {/* Wallet Balance Badge */}
            <IconButton 
              sx={{ 
                border: "1px solid #3b82f6", 
                color: "#60a5fa", 
                borderRadius: "8px", 
                px: 2,
                py: 0.8,
                backgroundColor: "rgba(59, 130, 246, 0.1)"
              }}
            >
              <AccountBalanceWalletOutlinedIcon sx={{ mr: 1, fontSize: "20px" }} />
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#60a5fa" }}>
                ${userBal !== undefined && userBal !== null ? (typeof userBal === 'number' ? userBal.toFixed(2) : userBal) : '500000.00'}
              </Typography>
            </IconButton>

            {/* Theme Toggle */}
            <IconButton 
              onClick={colorMode.toggleColorMode}
              sx={{ 
                color: "#ffffff", 
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                p: 1
              }}
              title="Toggle Light/Dark Theme"
            >
              {theme.palette.mode === 'dark' ? (
                <DarkModeOutlinedIcon sx={{ color: "#60a5fa" }} />
              ) : (
                <LightModeOutlinedIcon sx={{ color: "#f59e0b" }} />
              )}
            </IconButton>

            {/* Logout Button */}
            <IconButton 
              onClick={logoutHandler}
              sx={{ 
                color: "#ef4444", 
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                border: "1px solid #ef4444",
                borderRadius: "8px",
                px: 1.8,
                py: 0.8,
                "&:hover": {
                  backgroundColor: "rgba(239, 68, 68, 0.25)",
                }
              }}
              title="Logout"
            >
              <LogoutIcon sx={{ mr: 0.8, fontSize: "18px" }} />
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#ef4444" }}>
                Logout
              </Typography>
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
}

export default Topbar;
