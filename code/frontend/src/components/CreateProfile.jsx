import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileForm.css"; // This imports CSS styles.

const CreateProfile = () => {

    // This creates a state for form inputs.
    const [formData, setFormData] = useState({
        full_name: "",
        age: "",
        weight: "",
        profile_picture: null,
    });

    const [message, setMessage] = useState(""); // Stores sucess and error messages.
    const [loading, setLoading] = useState(true); // This line handles the loading state.
    const [profilePicPreview, setProfilePicPreview] = useState(""); // This line stores a simple profile preview.
    const navigate = useNavigate(); // Here we use naivation hook to redirect users in this file.

    // Here we fetch existing profile data when components mount.
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/create-profile/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    if (data.message === "No profile found, please create one.") {
                        console.log("User has no profile yet, showing empty form.");
                    } else {
                        setFormData(data); // Populate the form with exisisting profile data.
                    }
                } else {
                    setMessage("Profile not created yet, input your information below!");
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

    // Here we handle text input changes.
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file input changes, specifically for profile picture upload.
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profile_picture: file });

        // Preview the uploaded image here.
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePicPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Here we handle the profile creation form by submitting it.
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("full_name", formData.full_name);
        formDataToSend.append("age", formData.age);
        formDataToSend.append("weight", formData.weight);
        if (formData.profile_picture) {
            formDataToSend.append("profile_picture", formData.profile_picture);
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/create-profile/", {
                method: "POST",
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
                body: formDataToSend,
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Profile created successfully!");

                window.dispatchEvent(new Event("authChange")); // This line notifies other components about profile creation.

                setTimeout(() => navigate("/"), 2000); // Here we navigate back to the home page.
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Profile creation error:", error);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="profiles-container">
            <div className="profile-container">
                <h2>Create Profile</h2>
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

                    <button type="submit" disabled={loading}>Create Profile</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProfile;
