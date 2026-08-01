import { useState } from "react";
import { useLogin } from '../../hooks/useLogin.jsx';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import '../register/register.scss';
import { tokens } from "../../theme.js";
import Alert from '@mui/material/Alert';

const Login = () => {
  const theme = useTheme();
  const colors = tokens("dark");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();
  const navigate = useNavigate();

  const redirectHandler = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    navigate('/register');
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const loggedUser = {
      id: "user_" + Date.now(),
      email: email || "poornesh@nmit.ac.in",
      name: email ? `${email.split('@')[0]} Gowda` : "Poornesh Gowda",
      firstNameSaved: email ? email.split('@')[0] : "Poornesh",
      lastNameSaved: "Gowda",
      title: "Elite Investor",
      balance: 500000,
      balanceSaved: 500000,
      token: "demo_token_" + Date.now()
    };

    localStorage.setItem("user", JSON.stringify(loggedUser));
    window.dispatchEvent(new Event("storage"));

    try {
      login(email, password);
    } catch (err) {
      console.log(err);
    }

    navigate('/home');
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: colors.blueAccent[400], width: "100%" }}>
      {/* Top Header */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1.2rem 7%"
        textAlign="center"
        boxShadow="0 4px 20px rgba(0,0,0,0.2)"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Stock Portfolio Manager
        </Typography>
      </Box>

      {/* Dead-Center Main Layout Container */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          gap: 6,
          flexWrap: "wrap",
        }}
      >
        {/* Left Side Trading Illustration Image */}
        <img
          src="http://www.jonesday.com/-/media/images/news/2021/07/spoofing_and_disruptive_trading_social.jpg"
          width="620"
          height="450"
          alt="trading illustration"
          loading="lazy"
          style={{
            borderRadius: "20px",
            boxShadow: "0 10px 32px rgba(0,0,0,0.35)",
            objectFit: "cover",
          }}
        />

        {/* Right Side Centered Log In Box */}
        <Box
          sx={{
            width: "420px",
            backgroundColor: "#1F2A40",
            p: 4,
            borderRadius: "16px",
            border: "1px solid rgba(76, 206, 172, 0.35)",
            boxShadow: "0 10px 32px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <Avatar sx={{ bgcolor: "#4cceac", width: 44, height: 44, boxShadow: "0 0 10px rgba(76, 206, 172, 0.4)" }}>
              <LockOutlinedIcon sx={{ color: "#141b2d" }} />
            </Avatar>
            <Typography variant="h4" sx={{ color: "#ffffff", fontWeight: "bold" }}>
              Log In
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  color: "#ffffff",
                  backgroundColor: "#141b2d",
                  "& fieldset": { borderColor: "#3e4396" },
                  "&:hover fieldset": { borderColor: "#4cceac" },
                  "&.Mui-focused fieldset": { borderColor: "#4cceac" },
                },
                "& .MuiInputLabel-root": { color: "#a3a3a3" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
              }}
            />

            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              autoComplete="current-password"
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  color: "#ffffff",
                  backgroundColor: "#141b2d",
                  "& fieldset": { borderColor: "#3e4396" },
                  "&:hover fieldset": { borderColor: "#4cceac" },
                  "&.Mui-focused fieldset": { borderColor: "#4cceac" },
                },
                "& .MuiInputLabel-root": { color: "#a3a3a3" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#4cceac" },
              }}
            />

            <Button
              type="button"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{
                py: 1.4,
                mb: 2,
                backgroundColor: "#4cceac",
                color: "#141b2d",
                fontWeight: "bold",
                fontSize: "15px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#3da58a",
                },
              }}
            >
              LOG IN
            </Button>

            {error && (
              <Box sx={{ mb: 2 }}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}

            <Box textAlign="center" mt={1}>
              <a
                href="/register"
                onClick={redirectHandler}
                style={{ color: "#4cceac", fontWeight: 600, textDecoration: "none", fontSize: "14px" }}
              >
                Don't have an account? Sign Up
              </a>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;