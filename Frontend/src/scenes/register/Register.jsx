import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup.jsx';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, Alert } from "@mui/material";
import './register.scss';
import { tokens } from "../../theme.js";

const Register = () => {
  const theme = useTheme();
  const colors = tokens("dark");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { signup, isLoading } = useSignup();
  const navigate = useNavigate();

  const redirectHandler = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    navigate('/login');
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setFormError('');

    if (!email || !password || !firstName) {
      setFormError('Please fill out all required fields.');
      return;
    }

    const cleanEmail = email.toLowerCase().trim();

    // Store in registered users registry
    let registry = JSON.parse(localStorage.getItem("registered_users") || "[]");
    const existingIndex = registry.findIndex(u => u.email === cleanEmail);
    const userAcc = {
      email: cleanEmail,
      password: password,
      firstName: firstName,
      lastName: lastName,
      name: `${firstName} ${lastName}`.trim(),
      balance: 500000
    };

    if (existingIndex >= 0) {
      registry[existingIndex] = userAcc;
    } else {
      registry.push(userAcc);
    }
    localStorage.setItem("registered_users", JSON.stringify(registry));

    // Create active user session
    const activeUser = {
      id: "user_" + Date.now(),
      email: cleanEmail,
      name: `${firstName} ${lastName}`.trim(),
      firstNameSaved: firstName,
      lastNameSaved: lastName,
      title: "Elite Investor",
      balance: 500000,
      balanceSaved: 500000,
      token: "demo_token_" + Date.now()
    };

    localStorage.setItem("user", JSON.stringify(activeUser));
    window.dispatchEvent(new Event("storage"));

    try {
      signup(firstName, lastName, email, password);
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
        p={{ xs: "1rem 4%", sm: "1.2rem 7%" }}
        textAlign="center"
        boxShadow="0 4px 20px rgba(0,0,0,0.2)"
      >
        <Typography fontWeight="bold" fontSize={{ xs: "22px", sm: "32px" }} color="primary">
          Stock Portfolio Manager
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
        {/* Left Side Trading Illustration Image (Hidden on Mobile) */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: { md: "500px", lg: "620px" },
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 32px rgba(0,0,0,0.35)",
          }}
        >
          <img
            src="http://www.jonesday.com/-/media/images/news/2021/07/spoofing_and_disruptive_trading_social.jpg"
            width="100%"
            height="450"
            alt="trading illustration"
            loading="lazy"
            style={{
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>

        {/* Right Side Responsive Sign Up Box */}
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
            <Avatar sx={{ bgcolor: "#4cceac", width: 44, height: 44, boxShadow: "0 0 10px rgba(76, 206, 172, 0.4)" }}>
              <LockOutlinedIcon sx={{ color: "#141b2d" }} />
            </Avatar>
            <Typography variant="h4" sx={{ color: "#ffffff", fontWeight: "bold" }}>
              Sign Up
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
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
              id="lastName"
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
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
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
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
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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
              type="submit"
              disabled={isLoading}
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
              SIGN UP
            </Button>

            {formError && (
              <Box sx={{ mb: 2 }}>
                <Alert severity="error">{formError}</Alert>
              </Box>
            )}

            <Box textAlign="center" mt={1}>
              <a
                href="/login"
                onClick={redirectHandler}
                style={{ color: "#4cceac", fontWeight: 600, textDecoration: "none", fontSize: "14px" }}
              >
                Already have an account? Log In
              </a>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;