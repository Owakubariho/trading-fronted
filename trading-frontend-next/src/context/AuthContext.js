"use client";
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true);

    const router = useRouter();

    // COMMAND: Update this URL to match your backend
    const API_URL = 'http://127.0.0.1:8000';

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/token/`, {
                username: e.target.username.value,
                password: e.target.password.value
            });

            if (response.status === 200) {
                setAuthTokens(response.data);
                setUser(jwtDecode(response.data.access));
                localStorage.setItem('authTokens', JSON.stringify(response.data));
                router.push('/');
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed! Check your credentials.');
        }
    };

    const logoutUser = useCallback(() => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        router.push('/login');
    }, [router]);

    const updateToken = useCallback(async () => {
        if (!authTokens) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/token/refresh/`, {
                refresh: authTokens?.refresh
            });

            if (response.status === 200) {
                setAuthTokens(response.data);
                setUser(jwtDecode(response.data.access));
                localStorage.setItem('authTokens', JSON.stringify(response.data));
            } else {
                logoutUser();
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }
    }, [authTokens, loading, logoutUser]);

    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const fourMinutes = 1000 * 60 * 4;
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes);

        return () => clearInterval(interval);

    }, [authTokens, loading, updateToken]);

    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        loading: loading,
    };

    // Prevent rendering properly until initial check is done
    // if (loading) return null; // Or a loading spinner

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
