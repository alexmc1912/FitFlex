import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // Importing authentication context
import "./AuthForm.css"; // CSS styles implemented here.

const Login = () => {
    // Here are the states for storign the username and password input fields.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages.
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Function handles login form for submission.
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents default form submission. 
    
        try {
            const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }), // User information sent as JSON.
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token); // Authentication stored in localStorage.
                login(data.token); // Update authentication state for using context.
                navigate("/"); // Using navigate to redirect to home page.
            } else {
                setError("Invalid username or password. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="auth-background-container">
            <div className="auth-container">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form className="auth-form" onSubmit={handleLogin}>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Login</button>
                </form>

                <p className="switch-form">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
