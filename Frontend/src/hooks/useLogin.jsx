import { useState } from 'react';
import { useAuthContext } from './useAuthContext.jsx';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const API_BASE = process.env.REACT_APP_API_URL || (window.location.origin.includes('localhost') ? 'http://localhost:8080' : '');
        const url = `${API_BASE}/user/login/`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const json = await response.json();
                localStorage.setItem('user', JSON.stringify(json));
                window.dispatchEvent(new Event("storage"));
                dispatch({ type: 'LOGIN', payload: json });
                setIsLoading(false);
                return { success: true, user: json };
            } else {
                const json = await response.json().catch(() => ({}));
                const msg = json.error || 'Invalid email or password.';
                setIsLoading(false);
                setError(msg);
                return { success: false, error: msg };
            }
        } catch (err) {
            // Backend is offline — fall back to localStorage registry validation
            console.log("Backend offline, using local registry:", err);
        }

        // === LOCAL REGISTRY FALLBACK ===
        // When the backend is unreachable, validate against locally registered accounts.
        const cleanEmail = email.toLowerCase().trim();
        const registry = JSON.parse(localStorage.getItem("registered_users") || "[]");
        const foundUser = registry.find(u => u.email === cleanEmail);

        if (!foundUser) {
            const msg = "Account not found. Please sign up first.";
            setError(msg);
            setIsLoading(false);
            return { success: false, error: msg };
        }

        if (foundUser.password !== password) {
            const msg = "Incorrect password. Please try again.";
            setError(msg);
            setIsLoading(false);
            return { success: false, error: msg };
        }

        // Credentials match — create session
        const localUser = {
            id: foundUser.id || "user_" + Date.now(),
            _id: foundUser.id || "user_" + Date.now(),
            email: cleanEmail,
            firstNameSaved: foundUser.firstName,
            lastNameSaved: foundUser.lastName,
            name: foundUser.name,
            title: "Elite Investor",
            balance: foundUser.balance || 500000,
            balanceSaved: foundUser.balance || 500000,
            token: "local_token_" + Date.now()
        };

        localStorage.setItem('user', JSON.stringify(localUser));
        window.dispatchEvent(new Event("storage"));
        dispatch({ type: 'LOGIN', payload: localUser });
        setIsLoading(false);
        return { success: true, user: localUser };
    };

    return ({ login, error, isLoading });
};
