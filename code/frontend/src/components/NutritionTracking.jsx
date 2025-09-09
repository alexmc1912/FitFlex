import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/Nutrition.css"; //Importing CSS styling here.

const NutritionTracking = () => {
  // States for tracking user inputs.
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // This line sets today's date as default.
  const [mealType, setMealType] = useState("breakfast"); // Stores the selected meal, breakfast as default.
  const [food, setFood] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("g"); // Stores measurement unit here, grams by default.
  const [error, setError] = useState("");
  const [mealData, setMealData] = useState({});
  const API_KEY = "HM+iqm9lodVE9JEYMyO62g==diLlbfRvqyQfAG97"; // API key stored locally in file for fetching nutrition data.

  // Unit conversaion table for different measurements.
  const unitConversion = {
    oz: 28.35,
    ml: 1,
    g: 1,
  };

  // Loads stored meal data from local storage when the component mounts.
  // An event listener here also clears data when the page is refreshed or closed.
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("mealData")) || {};
    console.log("Loaded meal data from localStorage:", storedData);
    setMealData(storedData); // This line loads data from local storage.

    const resetData = () => {
      localStorage.removeItem("mealData");
      setMealData({});
    };

    window.addEventListener("beforeunload", resetData); // This line clears the meal data on refresh.

    return () => {
      window.removeEventListener("beforeunload", resetData);
      resetData();
    };
  }, []);


  // This function saves meal data to local storage whenever it changes.
  useEffect(() => {
    if (mealData && Object.keys(mealData).length > 0) {
      console.log("Saving meal data to localStorage:", mealData); // Log the data before saving.
      localStorage.setItem("mealData", JSON.stringify(mealData));
    }
  }, [mealData]);

  // This function fetches nutritional data of the food that is entered from our external API.
  const fetchNutritionData = async () => {
    if (!food.trim() || !amount || amount <= 0) {
      setError("Please enter a valid food and amount.");
      return;
    }

    // This converts the amount of grams if we need to.
    const amountInGrams = parseFloat(amount) * unitConversion[unit];

    try {
      const response = await axios.get(
        `https://api.calorieninjas.com/v1/nutrition?query=${food} ${amountInGrams}g`,
        { headers: { "X-Api-Key": API_KEY } }
      );

      if (response.data.items.length > 0) {
        const newFoodData = response.data.items[0]; // This line extracts food details from response.
        const updatedMeals = { ...mealData };

        // This if statement initializes meal structure for the selected dates.
        if (!updatedMeals[date]) {
          updatedMeals[date] = { breakfast: [], lunch: [], dinner: [], snacks: [] };
        }

        // New food entrys under the selected meal types are added here.
        updatedMeals[date][mealType].push({ food, amount, unit, amountInGrams, ...newFoodData });

        setMealData(updatedMeals); // This line updates the state with new meal data.
        setFood(""); // This clears input fields.
        setAmount("");
        setError("");
      } else {
        setError("No nutrition data found.");
      }
    } catch (err) {
      console.error("Error fetching nutrition data:", err);
      setError("Error fetching data. Try again.");
    }
  };

  // This function computes the total nutritional values for a given meal.
  const getTotalNutrition = (meals) => {
    return meals.reduce(
      (totals, item) => {
        totals.calories += item.calories;
        totals.protein += item.protein_g;
        totals.carbs += item.carbohydrates_total_g;
        totals.fat += item.fat_total_g;
        return totals;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  // Here we retrieve data for daily meals for a selected date.
  const dailyMeals = mealData[date] || { breakfast: [], lunch: [], dinner: [], snacks: [] };
  const dailyTotals = getTotalNutrition(
    [...dailyMeals.breakfast, ...dailyMeals.lunch, ...dailyMeals.dinner, ...dailyMeals.snacks]
  );

  // Totals round themselves for display purposes.
  const roundedTotals = {
    calories: dailyTotals.calories.toFixed(1),
    protein: dailyTotals.protein.toFixed(1),
    carbs: dailyTotals.carbs.toFixed(1),
    fat: dailyTotals.fat.toFixed(1),
  };

  

  return (
    <div className="nutrition-container">
      <div className="nutrition-tracker">
        <h1 className="title">🥗 Nutrition Tracker</h1>

        <div className="input-container">
          <label>Select Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

          <label>Meal Type:</label>
          <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option value="breakfast">🍳 Breakfast</option>
            <option value="lunch">🥪 Lunch</option>
            <option value="dinner">🍽️ Dinner</option>
            <option value="snacks">🍏 Snacks</option>
          </select>

          <input type="text" placeholder="Enter food name" value={food} onChange={(e) => setFood(e.target.value)} />
          <div className="amount-input">
            <input type="number" placeholder="Amount" value={amount} min="1" onChange={(e) => setAmount(e.target.value)} />
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="g">g</option>
              <option value="oz">oz</option>
              <option value="ml">ml</option>
            </select>
          </div>
          <button onClick={fetchNutritionData}>Add Food</button>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="meal-summary">
          <h2>📅 {date} - Daily Summary</h2>

          {["breakfast", "lunch", "dinner", "snacks"].map((meal) => {
            const mealItems = dailyMeals[meal];
            const totals = getTotalNutrition(mealItems);

            return (
              <div key={meal} className="meal-section">
                <h3>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
                {mealItems.length === 0 ? (
                  <p>No food added yet.</p>
                ) : (
                  <ul>
                    {mealItems.map((item, index) => (
                      <li key={index}>
                        {item.food} ({item.amount}{item.unit}) - {item.calories} kcal, {item.protein_g}g protein,{" "}
                        {item.carbohydrates_total_g}g carbs, {item.fat_total_g}g fat
                      </li>
                    ))}
                  </ul>
                )}
                <p><strong>Total:</strong> {totals.calories.toFixed(1)} kcal, {totals.protein.toFixed(1)}g protein, {totals.carbs.toFixed(1)}g carbs, {totals.fat.toFixed(1)}g fat</p>
              </div>
            );
          })}

          <div className="daily-breakdown">
            <h3>📊 Daily Macros</h3>
            <p>🔥 Calories: {roundedTotals.calories} kcal</p>
            <p>💪 Protein: {roundedTotals.protein}g</p>
            <p>🍞 Carbs: {roundedTotals.carbs}g</p>
            <p>🛢 Fat: {roundedTotals.fat}g</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracking;
