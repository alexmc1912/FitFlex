import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Profile from "./components/CreateProfile";
import EditProfile from "./components/EditProfile";
import Workout from "./components/WorkoutTracking";
import Nutrition from "./components/NutritionTracking";
import Recovery from "./components/Recovery";
import { AuthProvider } from "./context/AuthContext";


// This function enables routing within the application.
function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/create-profile" element={<Profile />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/workouts" element={<Workout />} />
                    <Route path="/nutrition-tracking" element={<Nutrition />} />
                    <Route path="/recovery-work" element={<Recovery />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
