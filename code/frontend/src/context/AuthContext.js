import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext(); // This line creates authentication context.

export const AuthProvider = ({ children }) => {
    // Here we have the states to track whether the user is authenticated.
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true" // Initially check with localStorage.
    );
    // This state stores the authentication token.
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    // This function runs to check the authentication status and listens for storage and authentication changes.
    useEffect(() => {
        const checkAuth = () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setIsAuthenticated(true);
                setToken(storedToken);
            } else {
                setIsAuthenticated(false);
                setToken(null);
            }
        };

        checkAuth(); // Initial auth check.

        // Listen for any authentication events accross all tabs.
        window.addEventListener("storage", checkAuth);
        window.addEventListener("authChange", checkAuth);
        return () => {
            window.removeEventListener("storage", checkAuth);
            window.removeEventListener("authChange", checkAuth);
        };
    }, []);

    // This function logs a user in by saving the token and setting authentication state.
    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("isAuthenticated", "true");
        setToken(newToken);
        setIsAuthenticated(true);
        window.dispatchEvent(new Event("authChange"));
    };

    // This function removes authentication data and redirects to the home page, logging them out.
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        setToken(null);
        setIsAuthenticated(false);
        window.dispatchEvent(new Event("authChange")); // This line notifies other components.
        window.location.href = "/"; //Navigate to home.
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
