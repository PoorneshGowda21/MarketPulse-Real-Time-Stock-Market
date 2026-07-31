import * as React from 'react';
import './LandingPage.scss';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Copyright from './Copyright';

export default function ButtonAppBar() {
  let navigate = useNavigate();

  async function loginHandler(event) {
    event.preventDefault();
    navigate("../login");
  }

  async function registerHandler(event) {
    event.preventDefault();
    navigate("../register");
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        flexGrow: 1,
        background: "linear-gradient(135deg, #0a0d14 0%, #1c0818 45%, #081120 100%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Stylish Glassmorphism AppBar */}
      <AppBar
        position="static"
        sx={{
          background: "rgba(10, 13, 20, 0.75)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          borderBottom: "1px solid rgba(76, 206, 172, 0.2)",
          px: 2,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1.5, color: "#4cceac" }}
            >
              <EqualizerIcon sx={{ fontSize: "32px" }} />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "20px" }}>
              <a href='/' style={{ color: '#ffffff', textDecoration: 'none', letterSpacing: "0.5px" }}>
                Stock Portfolio Management
              </a>
            </Typography>
          </Box>

          {/* Ultra Stylish Top Right Buttons with Extra Glowing Borders */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button
              onClick={loginHandler}
              sx={{
                color: "#4cceac",
                fontWeight: "bold",
                fontSize: "14px",
                px: 3,
                py: 0.8,
                borderRadius: "30px",
                border: "2px solid #4cceac",
                backgroundColor: "transparent",
                boxShadow: "0 0 12px rgba(76, 206, 172, 0.25)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(76, 206, 172, 0.15)",
                  borderColor: "#3da58a",
                  boxShadow: "0 0 20px rgba(76, 206, 172, 0.6)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              LOGIN
            </Button>

            <Button
              onClick={registerHandler}
              sx={{
                color: "#0f172a",
                fontWeight: "bold",
                fontSize: "14px",
                px: 3.5,
                py: 0.9,
                borderRadius: "30px",
                background: "linear-gradient(135deg, #4cceac 0%, #0d9488 100%)",
                border: "2px solid #ffffff",
                boxShadow: "0 0 18px rgba(76, 206, 172, 0.45)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  background: "linear-gradient(135deg, #3da58a 0%, #0f766e 100%)",
                  borderColor: "#4cceac",
                  boxShadow: "0 0 26px rgba(76, 206, 172, 0.8)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              SIGNUP
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Dynamic Text & Image Tiles - Untouched Text Logic */}
      <Typography
        sx={{
          marginTop: "1%",
          paddingTop: "8%",
          paddingBottom: "19%",
          marginLeft: "10%",
          fontSize: 70,
          color: "white",
        }}
        className="stocksTransform"
        display="flex"
        component="div"
        variant="h2"
      >
        <div>
          <p>
            Invest in
            <span>US Stocks</span>
            <span>IPO</span>
            <span>Future</span>
            <span>Indian Stocks</span>
            <span>Options</span>
          </p>
        </div>

        <div className="Tile1">
          <a target="_blank" rel="noopener noreferrer nofollow">
            <div className="lazyload-wrapper">
              <img
                className="tradeImage1"
                src="https://media.istockphoto.com/id/943292690/photo/financial-and-technical-data-analysis-graph-showing-stock-market-trends.jpg?s=612x612&w=0&k=20&c=pPx6ScJIqxo60fAExwJRIzYNQ_Jd-l-L78yUIJEzfAY="
                width="250"
                height="180"
                alt="ios"
                loading="lazy"
              />
            </div>
          </a>
        </div>

        <div className="Tile2">
          <a target="_blank" rel="noopener noreferrer nofollow">
            <div className="lazyload-wrapper">
              <img
                className="tradeImage1"
                src="https://media.istockphoto.com/photos/close-up-image-of-a-stock-market-graph-picture-id1213574690?b=1&k=20&m=1213574690&s=612x612&w=0&h=N2lNvavpoTFOjBHIVbKd2BmFj9Q3wjqEpxT5AASB50M="
                width="250"
                height="180"
                alt="ios"
                loading="lazy"
              />
            </div>
          </a>
        </div>

        <div className="Tile3">
          <a target="_blank" rel="noopener noreferrer nofollow">
            <div className="lazyload-wrapper">
              <img
                className="tradeImage1"
                src="https://wallpaperaccess.com/full/1393720.jpg"
                width="250"
                height="180"
                alt="ios"
                loading="lazy"
              />
            </div>
          </a>
        </div>

        <div className="Tile4">
          <a target="_blank" rel="noopener noreferrer nofollow">
            <div className="lazyload-wrapper">
              <img
                className="tradeImage1"
                src="https://the-tech-trend.com/wp-content/uploads/2021/02/How-to-read-Candlestick-Trading-Charts-A-Complete-Guide-for-Beginners.jpg"
                width="250"
                height="180"
                alt="ios"
                loading="lazy"
              />
            </div>
          </a>
        </div>

        <Typography sx={{ fontSize: "large", position: "absolute", mt: "13%", color: "rgba(255, 255, 255, 0.8)" }}>
          Learn trading with our virtual platform
        </Typography>

        <Copyright sx={{ position: "absolute", mt: "35%", ml: "35%", color: "white" }} />
      </Typography>
    </Box>
  );
}