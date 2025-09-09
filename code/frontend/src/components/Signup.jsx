import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css"; // Imported CSS styles here.

const Signup = () => {
    // States for haandling the user input fields.
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState(""); // Here we store the success and error messages.
    const navigate = useNavigate(); // Navigation hook here for redirecting to different pages.

    // This function handles the change of state when the user types in the input fields. 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // This function handles the submission form and sends user data to the backend for account creation.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // POST request sent to the signup API endpoint for signup.
            const response = await fetch("http://127.0.0.1:8000/api/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Form data here is converted to JSON.
            });

            if (response.ok) {
                const data = await response.json();
                setMessage("Account created! Redirecting...");
                
                // Authentication token is stored locally here if provided.
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("isAuthenticated", "true");
                }

                // Redirect to create-profile page as long as signup is successful.
                setTimeout(() => navigate("/create-profile"), 1500);
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            setMessage("Error: Unable to connect to the server");
        }
    };

    return (
        <div className="auth-background-container">
            <div className="auth-container">
                <h2>Sign Up</h2>
                {message && <p className="success-message">{message}</p>}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Sign Up</button>
                </form>

                <p className="switch-form">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
