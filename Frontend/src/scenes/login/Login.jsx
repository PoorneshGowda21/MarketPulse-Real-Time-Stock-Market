import { useState } from "react";
import { useLogin } from '../../hooks/useLogin.jsx';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, Alert } from "@mui/material";
import '../register/register.scss';
import { tokens } from "../../theme.js";

const Login = () => {
  const theme = useTheme();
  const colors = tokens("dark");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useLogin();
  const navigate = useNavigate();

  const redirectToSignup = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    navigate('/register');
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLocalError('');

    if (!email.trim() || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const result = await login(email.trim(), password);
    setLoading(false);

    if (result && result.success) {
      navigate('/home');
    } else {
      const msg = (result && result.error) || 'Login failed. Please check your credentials.';
      setLocalError(msg);
      // Do NOT navigate — stay on login page
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: colors.blueAccent[400], width: "100%" }}>
      {/* Top Header */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p={{ xs: "1rem 4%", sm: "1.2rem 7%" }}
        textAlign="center"
        boxShadow="0 4px 20px rgba(0,0,0,0.2)"
      >
        <Typography fontWeight="bold" fontSize={{ xs: "22px", sm: "32px" }} color="primary">
          MarketPulse — Stock Portfolio Manager
        </Typography>
      </Box>

      {/* Main Layout Container */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, sm: 4 },
          gap: { xs: 0, md: 6 },
          flexWrap: "wrap",
        }}
      >
        {/* Left Side Trading Image — hidden on mobile */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: { md: "500px", lg: "620px" },
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 32px rgba(0,0,0,0.35)",
            flexShrink: 0,
          }}
        >
          <img
            src="http://www.jonesday.com/-/media/images/news/2021/07/spoofing_and_disruptive_trading_social.jpg"
            width="100%"
            height="450"
            alt="trading illustration"
            loading="lazy"
            style={{ objectFit: "cover", display: "block" }}
          />
        </Box>

        {/* Login Card */}
        <Box
          sx={{
            width: { xs: "100%", sm: "420px" },
            maxWidth: "420px",
            backgroundColor: "#1F2A40",
            p: { xs: 3, sm: 4 },
            borderRadius: "16px",
            border: "1px solid rgba(76, 206, 172, 0.35)",
            boxShadow: "0 10px 32px rgba(0, 0, 0, 0.5)",
            mx: "auto"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <Avatar sx={{ bgcolor: "#4cceac", width: 44, height: 44 }}>
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
              id="login-email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setLocalError(''); }}
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
              onChange={(e) => { setPassword(e.target.value); setLocalError(''); }}
              id="login-password"
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

            {localError && (
              <Box sx={{ mb: 2 }}>
                <Alert
                  severity="error"
                  action={
                    localError.includes('sign up') || localError.includes('not found') ? (
                      <Button color="inherit" size="small" onClick={redirectToSignup}>
                        Sign Up
                      </Button>
                    ) : null
                  }
                >
                  {localError}
                </Alert>
              </Box>
            )}

            <Button
              type="submit"
              disabled={loading}
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
                "&:hover": { backgroundColor: "#3da58a" },
                "&:disabled": { backgroundColor: "#2a6b5a", color: "#7a9e9a" },
              }}
            >
              {loading ? "Logging In..." : "LOG IN"}
            </Button>

            <Box textAlign="center" mt={1}>
              <a
                href="/register"
                onClick={redirectToSignup}
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