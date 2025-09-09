import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileForm.css"; // Importing styles from profile form.css.

const EditProfile = () => {
    // State for the form inputs.
    const [formData, setFormData] = useState({
        full_name: "",
        age: "",
        weight: "",
        profile_picture: null,
    });

    const [message, setMessage] = useState(""); // Stores our success or error messages.
    const [loading, setLoading] = useState(true); // This sets our loading state while fetching our data.
    const [profilePicPreview, setProfilePicPreview] = useState(""); // Stores the preview of profile pictures.
    const navigate = useNavigate(); // Hook for navigation between pages.

    // Here we fetch the profile data when the component mounts.
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            const token = localStorage.getItem("token"); // This line retrieves the authentication token.

            if (!token) {
                setMessage("You are not authenticated. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://127.0.0.1:8000/api/profile/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`,
                    },
                });

                if (response.status === 403) {
                    setMessage("You are not authorized to access this page.");
                    setLoading(false);
                    return;
                }

                const data = await response.json();
                if (response.ok) {
                    setFormData({
                        full_name: data.full_name || "",
                        age: data.age || "",
                        weight: data.weight || "",
                        profile_picture: null, // Leave this null as our users may update this seperately at another time.
                    });

                    if (data.profile_picture) {
                        setProfilePicPreview(`http://127.0.0.1:8000${data.profile_picture}`);
                    }
                } else {
                    setMessage("Error fetching profile.");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                setMessage("Network error. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Here we handle any text input changes.
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // This handles file input changes, specifically profile picture upload.
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profile_picture: file });

        // This previews the uploaded image.
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePicPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // This function handles profule update submission.
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedFormData = new FormData();
        updatedFormData.append("full_name", formData.full_name);
        updatedFormData.append("age", formData.age);
        updatedFormData.append("weight", formData.weight);
    
        if (formData.profile_picture) {
            updatedFormData.append("profile_picture", formData.profile_picture);
        }
    
        try {
            const response = await fetch("http://127.0.0.1:8000/api/profile/", {
                method: "PUT",
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
                body: updatedFormData,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update profile.");
            }
    
            setMessage("Profile updated successfully!");
    
            setTimeout(() => navigate("/"), 2000); // Navigate back to home page.
    
        } catch (error) {
            console.error("Profile update error:", error);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="profiles-container">
            <div className="profile-container">
                <h2>Edit Profile</h2>
                {loading ? <p>Loading profile...</p> : null}
                {message && <p className="message">{message}</p>}

                <form className="profile-form" onSubmit={handleSubmit}>
                    {profilePicPreview && (
                        <div className="profile-picture-preview">
                            <img src={profilePicPreview} alt="Profile Preview" />
                        </div>
                    )}
                    <label>Profile Picture</label>
                    <input type="file" name="profile_picture" accept="image/*" onChange={handleFileChange} />

                    <label>Full Name</label>
                    <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} />

                    <label>Age</label>
                    <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />

                    <label>Weight</label>
                    <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} />

                    <button type="submit" disabled={loading}>Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
