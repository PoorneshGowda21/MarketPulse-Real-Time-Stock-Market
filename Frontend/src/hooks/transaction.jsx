import { useState } from 'react';

export const useTransaction = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const transaction = async (user, value) => {
        setIsLoading(true);
        setError(null);

        const userId = user?.id || user?._id || "demo_user";
        const API_BASE = process.env.REACT_APP_API_URL || (window.location.origin.includes('localhost') ? 'http://localhost:8080' : '');
        const url = `${API_BASE}/trade/${userId}`;

        // Create transaction record
        const newOrder = {
            id: "trade_" + Date.now(),
            _id: "trade_" + Date.now(),
            name: value.name || value.symbol || "Stock Asset",
            symbol: (value.symbol || "STK").toUpperCase(),
            tradeType: (value.tradeType || "BUY").toUpperCase(),
            price: parseFloat(value.price) || 100,
            shares: parseInt(value.shares) || 1,
            invAmount: (parseFloat(value.price) || 100) * (parseInt(value.shares) || 1),
            date: new Date().toISOString(),
        };

        // === 1. Always record order in localStorage user_orders (Offline & Live persistence) ===
        try {
            const ordersKey = `user_orders_${userId}`;
            const existingOrders = JSON.parse(localStorage.getItem(ordersKey) || "[]");
            existingOrders.unshift(newOrder);
            localStorage.setItem(ordersKey, JSON.stringify(existingOrders));

            // Also update user portfolio holdings in localStorage
            const portfolioKey = `user_portfolio_${userId}`;
            let existingPortfolio = JSON.parse(localStorage.getItem(portfolioKey) || "[]");
            const posIndex = existingPortfolio.findIndex(p => p.symbol === newOrder.symbol);

            if (newOrder.tradeType === "BUY") {
                if (posIndex >= 0) {
                    existingPortfolio[posIndex].shares += newOrder.shares;
                } else {
                    existingPortfolio.push({
                        _id: "port_" + Date.now(),
                        name: newOrder.name,
                        symbol: newOrder.symbol,
                        price: newOrder.price,
                        shares: newOrder.shares,
                    });
                }
            } else if (newOrder.tradeType === "SELL") {
                if (posIndex >= 0) {
                    existingPortfolio[posIndex].shares -= newOrder.shares;
                    if (existingPortfolio[posIndex].shares <= 0) {
                        existingPortfolio.splice(posIndex, 1);
                    }
                }
            }
            localStorage.setItem(portfolioKey, JSON.stringify(existingPortfolio));

            // Update user balance
            const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
            const currentBal = storedUser.balanceSaved ?? storedUser.balance ?? 500000;
            const tradeCost = newOrder.invAmount;
            const newBal = newOrder.tradeType === "BUY" ? currentBal - tradeCost : currentBal + tradeCost;
            storedUser.balance = newBal;
            storedUser.balanceSaved = newBal;
            localStorage.setItem("user", JSON.stringify(storedUser));
            window.dispatchEvent(new Event("storage"));
        } catch (e) {
            console.log("Local transaction storage error:", e);
        }

        // === 2. Try posting to backend if available ===
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(value)
            });

            if (response.ok) {
                setIsLoading(false);
                return true;
            }
        } catch (err) {
            console.log("Backend offline, recorded trade locally:", err);
        }

        setIsLoading(false);
        return true;
    };

    return ({ transaction, error, isLoading });
};