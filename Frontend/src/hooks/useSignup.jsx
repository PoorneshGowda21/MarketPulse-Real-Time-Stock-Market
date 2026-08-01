import { useState } from 'react';
import { useAuthContext } from './useAuthContext.jsx';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (firstName, lastName, email, password) => {
        setIsLoading(true);
        setError(null);

        const API_BASE = process.env.REACT_APP_API_URL || (window.location.origin.includes('localhost') ? 'http://localhost:8080' : '');
        const url = `${API_BASE}/user/signup/`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            if (response.ok) {
                const json = await response.json();
                localStorage.setItem('user', JSON.stringify(json));
                window.dispatchEvent(new Event("storage"));
                dispatch({ type: 'LOGIN', payload: json });
                setIsLoading(false);
                return true;
            } else {
                const json = await response.json().catch(() => ({}));
                if (json.error) {
                    setIsLoading(false);
                    setError(json.error);
                    return false;
                }
            }
        } catch (err) {
            console.log("Backend offline or mixed-content blocked, initializing local session:", err);
        }

        // Fallback user session for client-side demo / static deployment
        const fallbackUser = {
            id: Date.now().toString(),
            _id: Date.now().toString(),
            email: email || "user@marketpulse.com",
            firstNameSaved: firstName || "Investor",
            lastNameSaved: lastName || "User",
            name: `${firstName || "Investor"} ${lastName || "User"}`.trim(),
            title: "Elite Trader",
            balance: 500000,
            balanceSaved: 500000,
            token: "demo_jwt_token_" + Date.now()
        };

        localStorage.setItem('user', JSON.stringify(fallbackUser));
        window.dispatchEvent(new Event("storage"));
        dispatch({ type: 'LOGIN', payload: fallbackUser });
        setIsLoading(false);
        return true;
    };

    return ({ signup, error, isLoading });
};
