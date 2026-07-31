import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../theme";

import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountBalanceSharpIcon from "@mui/icons-material/AccountBalanceSharp";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';

const HamburgerMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { collapseSidebar } = useProSidebar();

  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "{}"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const userName = user?.name || user?.firstNameSaved || user?.firstName || user?.email?.split('@')[0] || "User";
  const userTitle = user?.title || "Elite Investor";

  return (
    <Box
      sx={{
        position: "fixed !important",
        top: "0 !important",
        left: "0 !important",
        height: "100vh !important",
        width: isCollapsed ? "80px !important" : "250px !important",
        zIndex: 9999,
        backgroundColor: "#1F2A40 !important",
        borderRight: "1px solid #2d3748 !important",
        overflowY: "auto !important",
        transition: "width 0.2s ease",
        "& .ps-sidebar-container": {
          backgroundColor: "#1F2A40 !important",
          borderRight: "none !important",
          height: "100vh !important",
          width: "100% !important",
        },
        "& .ps-menu-button": {
          backgroundColor: "transparent !important",
          "&:hover": {
            backgroundColor: "#2a3754 !important",
            color: "#4cceac !important",
          },
        },
        "& .ps-menuitem-root": {
          color: "#e0e0e0 !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed} rootStyles={{ border: 'none' }}>
        <Box isCollapsed sx={{ backgroundColor: "#1F2A40", height: "100%" }}>
          <Menu iconshape="square">
            {/* Logo and menu toggle */}
            <MenuItem
              onClick={() => { collapseSidebar(); setIsCollapsed(!isCollapsed); }}
              icon={isCollapsed ? <MenuOutlinedIcon style={{ color: "#4cceac" }} /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: "#4cceac",
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                    Menu
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon style={{ color: "#4cceac" }} />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {/* USER PROFILE SUMMARY - CLICKABLE TO PROFILE PAGE */}
            {!isCollapsed && (
              <Box 
                mb="25px" 
                onClick={() => navigate("/profile")}
                sx={{ 
                  cursor: "pointer", 
                  p: 1, 
                  borderRadius: "12px",
                  transition: "all 0.2s ease",
                  "&:hover": { backgroundColor: "rgba(76, 206, 172, 0.08)" }
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="90px"
                    height="90px"
                    src="https://thumbs.dreamstime.com/b/man-business-suit-icon-illustration-98773345.jpg"
                    style={{ borderRadius: "50%", border: "2px solid #4cceac" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ color: "#ffffff", m: "10px 0 0 0", fontSize: "20px" }}
                  >
                    {userName}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#4cceac", fontWeight: 600 }}>
                    {userTitle}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "1%"}>
              <MenuItem
                title="Dashboard"
                routerLink={<Link to="/home"></Link>}
                icon={<HomeOutlinedIcon style={{ color: "#e0e0e0" }} />}
                selected={selected}
                setSelected={setSelected}
              >
                <Typography sx={{ color: "#e0e0e0", fontWeight: 500 }}>
                  Stock Listings
                </Typography>
              </MenuItem>

              <Typography
                variant="h6"
                sx={{ color: "#4cceac", fontWeight: "bold", m: "15px 0 5px 20px" }}
              >
                Data
              </Typography>

              <MenuItem
                title="Watchlist"
                routerLink={<Link to="/watchlist"></Link>}
                icon={<AccountBalanceSharpIcon style={{ color: "#e0e0e0" }} />}
                selected={selected}
                setSelected={setSelected}
              >
                <Typography sx={{ color: "#e0e0e0", fontWeight: 500 }}>
                  Watchlist
                </Typography>
              </MenuItem>

              <MenuItem
                title="Portfolio"
                routerLink={<Link to="/portfolio"></Link>}
                icon={<ContactsOutlinedIcon style={{ color: "#e0e0e0" }} />}
                selected={selected}
                setSelected={setSelected}
              >
                <Typography sx={{ color: "#e0e0e0", fontWeight: 500 }}>
                  Portfolio
                </Typography>
              </MenuItem>

              <MenuItem
                title="Orders"
                routerLink={<Link to="/orders"></Link>}
                icon={<ReceiptLongOutlinedIcon style={{ color: "#e0e0e0" }} />}
                selected={selected}
                setSelected={setSelected}
              >
                <Typography sx={{ color: "#e0e0e0", fontWeight: 500 }}>
                  Orders
                </Typography>
              </MenuItem>

              <Typography
                variant="h6"
                sx={{ color: "#4cceac", fontWeight: "bold", m: "15px 0 5px 20px" }}
              >
                Pages
              </Typography>

              <MenuItem
                title="Profile"
                routerLink={<Link to="/profile"></Link>}
                icon={<PersonOutlinedIcon style={{ color: "#e0e0e0" }} />}
                selected={selected}
                setSelected={setSelected}
              >
                <Typography sx={{ color: "#e0e0e0", fontWeight: 500 }}>
                  Profile
                </Typography>
              </MenuItem>

              <MenuItem
                title="News"
                routerLink={<Link to="/news"></Link>}
                icon={<NewspaperOutlinedIcon style={{ color: "#e0e0e0" }} />}
                selected={selected}
                setSelected={setSelected}
              >
                <Typography sx={{ color: "#e0e0e0", fontWeight: 500 }}>
                  News
                </Typography>
              </MenuItem>

              <MenuItem
                title="IPO"
                routerLink={<Link to="/ipo"></Link>}
                icon={<CandlestickChartOutlinedIcon style={{ color: "#e0e0e0" }} />}
                selected={selected}
                setSelected={setSelected}
              >
                <Typography sx={{ color: "#e0e0e0", fontWeight: 500 }}>
                  IPO
                </Typography>
              </MenuItem>

              <MenuItem
                title="Reviews"
                routerLink={<Link to="/testimonials"></Link>}
                icon={<RateReviewOutlinedIcon style={{ color: "#e0e0e0" }} />}
                selected={selected}
                setSelected={setSelected}
              >
                <Typography sx={{ color: "#e0e0e0", fontWeight: 500 }}>
                  Reviews
                </Typography>
              </MenuItem>
            </Box>
          </Menu>
        </Box>
      </Sidebar>
    </Box>
  );
};

export default HamburgerMenu;
