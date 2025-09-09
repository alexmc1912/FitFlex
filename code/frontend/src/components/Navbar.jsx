import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // Importing authentication.
import "./Navbar.css"; // Importing CSS styling.

const Navbar = () => {
    // Here we extract authentication status and logout functionality from context.
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="nav-links-container">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>

                    {!isAuthenticated ? (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/workouts">Workout Tracking</Link></li>
                            <li><Link to="/nutrition-tracking">Nutrition Tracking</Link></li>
                            <li><Link to="/recovery-work">Recovery Work</Link></li>
                        </>
                    )}
                </ul>
            </div>

            {isAuthenticated && (
                <div className="profile-logout-container">
                    <Link to="/edit-profile" className="edit-profile">Edit Profile</Link>
                    <button className="logout-btn" onClick={logout}>Logout</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
