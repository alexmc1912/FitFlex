import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Workout.css"; //Importing CSS styles from workout.css

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Base URL for fetching workouts.

const WorkoutTracking = () => {
    // Here we have a state to store fetched workout data.
    const [workouts, setWorkouts] = useState([]);

    // States for tracking user-selected muscle groups for all days.
    const [certainMuscles, setcertainMuscles] = useState({
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: "",
        Sunday: ""
    });

    // State for storing any user notes.
    const [notes, setNotes] = useState("");

    // LocalStorage authentication token retrived using next line.
    const getAuthToken = () => localStorage.getItem("token");

    // This function fetches user workouts for an authenticated user. It runs when the component mounts and whenever the workouts are updated.
    const fetchUserWorkouts = useCallback(async () => {
        const authToken = getAuthToken();
        if (!authToken) return; // If there is no token we exit the function.

        try {
            // GET requests sent to fetch our workouts.
            const response = await axios.get(`${API_BASE_URL}/workouts/`, {
                headers: { Authorization: `Token ${authToken}` },
            });

            // Should data exist, we update the workouts state.
            if (response.data && response.data.workouts) {
                setWorkouts(response.data.workouts);
            } else {
                setWorkouts([]); // If we get an empty list and no workouts, reset the state.
            }
        } catch (error) {
            console.error("Couldn't fetch workouts:", error.response?.data || error.message);
        }
    }, []);

    // This function handles the muscle group selection change for each day.
    const handleMuscChange = (day, value) => {
        setcertainMuscles((prev) => ({ ...prev, [day]: value }));
    };

    // This function saves the workout plan for the user.
    const saveWorkout = async (e) => {
        e.preventDefault(); // No default form submission allowed.
        const workoutData = {
            muscle_groups: Object.values(certainMuscles).join(", "), // Muscle selection turned into a string.
            workout_plan: certainMuscles, // Structed plan saved.
            notes, // Additional user notes can go here.
        };

        try {
          // Here we try to save the workout to the user.
            const response = await axios.post(`${API_BASE_URL}/workouts/`, workoutData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${getAuthToken()}`,
                },
            });

            if (response.data) {
                alert("Good news! Your workout was saved successfully!");
                fetchUserWorkouts(); // We use the fetchUserWorkouts function to refresh workout after saving.
            }
        } catch (error) {
            console.error("Error saving workout:", error.response?.data || error.message);
            alert("Failed to save your workout.");
        }
    };

    // This function deletes a selected workout, should the user decide to.
    const deleteWorkout = async (workoutId) => {
        if (!window.confirm("Are you sure you want to delete this workout?")) return; // User must confirm they are sure before deleting.

        try {
            await axios.delete(`${API_BASE_URL}/workouts/${workoutId}/`, {
                headers: { Authorization: `Token ${getAuthToken()}` },
            });

            alert("The workout has been deleted for you!");
            setWorkouts(workouts.filter(workout => workout.id !== workoutId)); // This line removes the workout from the state.
        } catch (error) {
            console.error("Error deleting workout:", error.response?.data || error.message);
            alert("Failed to delete your workout.");
        }
    };

    // Runs fetchUserWorkouts when the component mounts.
    useEffect(() => {
        fetchUserWorkouts();
    }, [fetchUserWorkouts]);

    // Order of days for displaying saved workouts as handled randomly before.
    const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="workout-background">
          <div className="workout-container">
              <h1 className="workout-title">Workout Tracker</h1>
              <h2 className="sub-title">Select Muscle Groups for Each Day</h2>

              <form onSubmit={saveWorkout} className="workout-form">
                  <div className="form-layout">
                      <div className="day-selector-container">
                          {dayOrder.map((day) => (
                              <div key={day} className="day-selector">
                                  <label>{day}:</label>
                                  <select value={certainMuscles[day]} onChange={(e) => handleMuscChange(day, e.target.value)}>
                                      <option value="">Select Muscle Group</option>
                                      <option value="Arms">Arms</option>
                                      <option value="Back">Back</option>
                                      <option value="Chest">Chest</option>
                                      <option value="Legs">Legs</option>
                                      <option value="Shoulders">Shoulders</option>
                                      <option value="Rest">Rest</option>
                                  </select>
                              </div>
                          ))}
                      </div>
                      <div className="notes-section">
                          <label>Notes:</label>
                          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                          <button type="submit" className="save-button">Generate & Save Workout</button>
                      </div>
                  </div>
              </form>

              <h2 className="saved-title">Saved Workouts</h2>
              {!workouts || workouts.length === 0 ? (
                  <p className="no-workouts">No workouts found.</p>
              ) : (
                  <div className="workout-list">
                      {workouts.map((workout) => (
                          <div key={workout.id} className="workout-entry">
                              <h3 className="workout-summary">{workout.muscle_groups}</h3>
                              <p className="workout-date">Date: {new Date(workout.created_at).toLocaleDateString()}</p>

                              <table className="workout-table">
                                  <thead>
                                      <tr>
                                          <th>Day</th>
                                          <th>Muscle Group</th>
                                          <th>Exercises</th>
                                          <th>Sets & Reps</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {dayOrder.map((day) => {
                                          const data = workout.workout_plan[day];
                                          return (
                                              <tr key={day}>
                                                  <td>{day}</td>
                                                  <td>{data?.muscle || "Rest"}</td>
                                                  <td>
                                                      {data?.exercises?.length > 0 ? (
                                                          data.exercises.map((ex, i) => (
                                                              <p key={i}><strong>{ex.name}</strong></p>
                                                          ))
                                                      ) : (
                                                          <p>Rest Day</p>
                                                      )}
                                                  </td>
                                                  <td>
                                                      {data?.exercises?.length > 0 ? (
                                                          data.exercises.map((ex, i) => (
                                                              <p key={i}>{ex.sets}</p>
                                                          ))
                                                      ) : (
                                                          "-"
                                                      )}
                                                  </td>
                                              </tr>
                                          );
                                      })}
                                  </tbody>
                              </table>

                              {workout.notes && (
                                  <div className="workout-notes">
                                      <h4>Notes:</h4>
                                      <p>{workout.notes}</p>
                                  </div>
                              )}


                              <button className="delete-button" onClick={() => deleteWorkout(workout.id)}>
                                  Delete Workout
                              </button>
                          </div>
                      ))}
                  </div>
              )}
          </div>
        </div>
    );
};

export default WorkoutTracking;
