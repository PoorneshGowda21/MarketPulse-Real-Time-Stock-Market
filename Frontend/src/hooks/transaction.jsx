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
            console.log("Backend offline or mixed-content blocked, recording trade locally:", err);
        }

        // Fallback local transaction updates
        try {
            const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
            const currentBal = storedUser.balanceSaved ?? storedUser.balance ?? 500000;
            const tradeCost = (value.price || 100) * (value.shares || 1);
            const newBal = value.tradeType === "BUY" ? currentBal - tradeCost : currentBal + tradeCost;
            
            storedUser.balance = newBal;
            storedUser.balanceSaved = newBal;
            localStorage.setItem("user", JSON.stringify(storedUser));
            window.dispatchEvent(new Event("storage"));
        } catch (e) {
            console.log(e);
        }

        setIsLoading(false);
        return true;
    };

    return ({ transaction, error, isLoading });
};