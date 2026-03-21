"use client";

import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: any;
    authTokens: any;
    loginUser: (e: any) => Promise<void>;
    logoutUser: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Initialize state from local storage securely (handling SSR)
    const [authTokens, setAuthTokens] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const API_URL = 'http://127.0.0.1:8000';

    // Load tokens on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTokens = localStorage.getItem('authTokens');
            if (storedTokens) {
                try {
                    const parsedTokens = JSON.parse(storedTokens);
                    setAuthTokens(parsedTokens);
                    setUser(jwtDecode(parsedTokens.access));
                } catch (error) {
                    console.error("Failed to parse tokens", error);
                }
            }
        }
        setLoading(false);
    }, []);

    const loginUser = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/token/`, {
                username: e.target.username.value,
                password: e.target.password.value
            });

            if (response.status === 200) {
                setAuthTokens(response.data);
                setUser(jwtDecode(response.data.access));
                if (typeof window !== 'undefined') {
                    localStorage.setItem('authTokens', JSON.stringify(response.data));
                }
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
        if (typeof window !== 'undefined') {
            localStorage.removeItem('authTokens');
        }
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
                if (typeof window !== 'undefined') {
                    localStorage.setItem('authTokens', JSON.stringify(response.data));
                }
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

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
