import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTransaction } from '../../hooks/transaction';

const theme = createTheme();

export default function BuyStock() {
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const location = useLocation();
    const [tradeStatus, setTradeStatus] = useState(true);
    const [orderType, setOrderType] = useState('Market');
    const [targetPrice, setTargetPrice] = useState(location.state?.today || '');
    const { transaction, error, isLoading } = useTransaction();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    async function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const values = {
            userId: user.id,
            symbol: location.state?.symbol || "AAPL",
            name: location.state?.name || "Apple Inc.",
            price: orderType === 'Market' ? location.state?.today : parseFloat(targetPrice),
            shares: data.get('quantity'),
            tradeType: "BUY",
            orderType: orderType,
        };

        const transactionStatus = await transaction(user, values);
        if (transactionStatus) {
            setTradeStatus(true);
            history("/portfolio");
        } else {
            setTradeStatus(false);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1579226905180-636b76d96082?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ backgroundColor: "#141b2d" }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#4cceac' }}>
                            <LockOutlinedIcon sx={{ color: "#141b2d" }} />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                            BUY STOCK
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2, width: "100%" }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Company Name"
                                name="name"
                                value={location.state?.name || "Apple Inc."}
                                InputProps={{ readOnly: true }}
                                sx={{
                                    "& .MuiOutlinedInput-root": { color: "#ffffff", backgroundColor: "#1F2A40" },
                                    "& .MuiInputLabel-root": { color: "#a3a3a3" }
                                }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="value"
                                label="Market Price ($)"
                                type="number"
                                id="value"
                                value={location.state?.today || 224.20}
                                InputProps={{ readOnly: true }}
                                sx={{
                                    "& .MuiOutlinedInput-root": { color: "#ffffff", backgroundColor: "#1F2A40" },
                                    "& .MuiInputLabel-root": { color: "#a3a3a3" }
                                }}
                            />

                            {/* Order Type Selection */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="order-type-label" sx={{ color: "#a3a3a3" }}>Order Type</InputLabel>
                                <Select
                                    labelId="order-type-label"
                                    id="orderType"
                                    value={orderType}
                                    label="Order Type"
                                    onChange={(e) => setOrderType(e.target.value)}
                                    sx={{
                                        color: "#4cceac",
                                        fontWeight: "bold",
                                        backgroundColor: "#1F2A40",
                                        "& .MuiSvgIcon-root": { color: "#4cceac" }
                                    }}
                                >
                                    <MenuItem value="Market">Market Order (Instant Execution)</MenuItem>
                                    <MenuItem value="Limit">Limit Order (Pending Target Price)</MenuItem>
                                    <MenuItem value="Stop-Loss">Stop-Loss Order (Risk Protection)</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Target Price for Limit & Stop-Loss */}
                            {orderType !== 'Market' && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="targetPrice"
                                    label={`${orderType} Target Price ($)`}
                                    type="number"
                                    id="targetPrice"
                                    value={targetPrice}
                                    onChange={(e) => setTargetPrice(e.target.value)}
                                    sx={{
                                        "& .MuiOutlinedInput-root": { color: "#ffffff", backgroundColor: "#1F2A40" },
                                        "& .MuiInputLabel-root": { color: "#4cceac" }
                                    }}
                                />
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="quantity"
                                label="Shares Quantity"
                                type="number"
                                id="quantity"
                                autoComplete="quantity"
                                autoFocus
                                sx={{
                                    "& .MuiOutlinedInput-root": { color: "#ffffff", backgroundColor: "#1F2A40" },
                                    "& .MuiInputLabel-root": { color: "#a3a3a3" }
                                }}
                            />

                            <Button
                                type="submit"
                                disabled={isLoading}
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.5,
                                    backgroundColor: "#4cceac",
                                    color: "#141b2d",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    "&:hover": { backgroundColor: "#3da58a" }
                                }}
                            >
                                Submit {orderType} Buy Order
                            </Button>

                            {!tradeStatus && <Alert severity="error">Trade execution failed. Check balance.</Alert>}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}