import { useState } from 'react';
import { useAuthContext } from './useAuthContext.jsx';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (firstName, lastName, email, password) => {
        setIsLoading(true);
        setError(null);

        const cleanEmail = email.toLowerCase().trim();

        // Always register into localStorage registry first (works offline + online)
        const registry = JSON.parse(localStorage.getItem("registered_users") || "[]");
        const exists = registry.find(u => u.email === cleanEmail);
        if (!exists) {
            const newEntry = {
                id: "user_" + Date.now(),
                email: cleanEmail,
                password: password,
                firstName: firstName,
                lastName: lastName,
                name: `${firstName} ${lastName}`.trim(),
                balance: 500000
            };
            registry.push(newEntry);
            localStorage.setItem("registered_users", JSON.stringify(registry));
        }

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
                return { success: true, user: json };
            } else {
                const json = await response.json().catch(() => ({}));
                if (json.error) {
                    setIsLoading(false);
                    setError(json.error);
                    return { success: false, error: json.error };
                }
            }
        } catch (err) {
            console.log("Backend offline, using local registry for signup:", err);
        }

        // Backend offline — use the locally registered entry
        const registeredEntry = JSON.parse(localStorage.getItem("registered_users") || "[]")
            .find(u => u.email === cleanEmail);

        const localUser = {
            id: registeredEntry?.id || "user_" + Date.now(),
            _id: registeredEntry?.id || "user_" + Date.now(),
            email: cleanEmail,
            firstNameSaved: firstName,
            lastNameSaved: lastName,
            name: `${firstName} ${lastName}`.trim(),
            title: "Elite Investor",
            balance: 500000,
            balanceSaved: 500000,
            token: "local_token_" + Date.now()
        };

        localStorage.setItem('user', JSON.stringify(localUser));
        window.dispatchEvent(new Event("storage"));
        dispatch({ type: 'LOGIN', payload: localUser });
        setIsLoading(false);
        return { success: true, user: localUser };
    };

    return ({ signup, error, isLoading });
};
