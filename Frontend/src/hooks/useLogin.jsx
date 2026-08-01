import { useState } from 'react';
import { useAuthContext } from './useAuthContext.jsx';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const cleanEmail = email.toLowerCase().trim();

        // === STEP 1: Always check localStorage registry first ===
        // This works whether backend is online or offline.
        const registry = JSON.parse(localStorage.getItem("registered_users") || "[]");
        const foundUser = registry.find(u => u.email === cleanEmail);

        if (!foundUser) {
            // Not in local registry — also try the backend
            const API_BASE = process.env.REACT_APP_API_URL ||
                (window.location.origin.includes('localhost') ? 'http://localhost:8080' : '');
            const url = `${API_BASE}/user/login/`;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: cleanEmail, password })
                });
                if (response.ok) {
                    const json = await response.json();
                    localStorage.setItem('user', JSON.stringify(json));
                    window.dispatchEvent(new Event("storage"));
                    dispatch({ type: 'LOGIN', payload: json });
                    setIsLoading(false);
                    return { success: true, user: json };
                }
            } catch (err) {
                console.log("Backend offline:", err);
            }
            // Not in local registry AND backend failed/rejected → account doesn't exist
            const msg = "Account not found. Please sign up first.";
            setError(msg);
            setIsLoading(false);
            return { success: false, error: msg };
        }

        // === STEP 2: Account found in local registry — validate password ===
        if (foundUser.password !== password) {
            const msg = "Incorrect password. Please try again.";
            setError(msg);
            setIsLoading(false);
            return { success: false, error: msg };
        }

        // === STEP 3: Credentials match — create session ===
        // Also try to sync with backend (fire and forget — don't block login)
        const API_BASE = process.env.REACT_APP_API_URL ||
            (window.location.origin.includes('localhost') ? 'http://localhost:8080' : '');
        try {
            const response = await fetch(`${API_BASE}/user/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: cleanEmail, password })
            });
            if (response.ok) {
                const json = await response.json();
                // Merge backend user data with local data
                const mergedUser = { ...json, balance: foundUser.balance || json.balance || 500000 };
                localStorage.setItem('user', JSON.stringify(mergedUser));
                window.dispatchEvent(new Event("storage"));
                dispatch({ type: 'LOGIN', payload: mergedUser });
                setIsLoading(false);
                return { success: true, user: mergedUser };
            }
        } catch (err) {
            console.log("Backend offline, using local session:", err);
        }

        // Backend unreachable or rejected — use local session (credentials already verified above)
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
