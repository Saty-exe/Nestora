import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateMeal } from "../../features/meal/mealSlice";
export default function Meal() {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.meal.meal);

  const [mealDay, setMealDay] = useState("monday");

  const selectedDay = meals.find((item) => item.day.toLowerCase() === mealDay);

  const [mealType, setMealType] = useState("");
  const [mealTime, setMealTime] = useState("");
  const [updatedMeal, setUpdatedMeal] = useState([]);

  const handleChange = () => {
    const editedMeal = {
      id: selectedDay.id,
      mealTime,
      mealType,
      updatedMeal,
    };

    dispatch(updateMeal(editedMeal));
  };
  return (
    <div className="meal-page">
      <div className="edit-meal">
        <h2>Update Meal</h2>

        <label>
          Enter meal type
          <input type="text" onChange={(e) => setMealType(e.target.value)} />
        </label>

        <label>
          Enter meal timing
          <input type="text" onChange={(e) => setMealTime(e.target.value)} />
        </label>

        <label>
          Enter updated meal
          <input
            type="text"
            placeholder="Dal, Rice, Roti, Salad"
            onChange={(e) =>
              setUpdatedMeal(
                e.target.value.split(",").map((item) => item.trim()),
              )
            }
          />
        </label>

        <button onClick={() => handleChange(selectedDay.id)}>
          Update Meal
        </button>
      </div>

      <div className="meal-selector">
        <label htmlFor="mealDay">Select Day</label>

        <select
          id="mealDay"
          value={mealDay}
          onChange={(e) => setMealDay(e.target.value)}
        >
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
      </div>

      <div className="meal-display">
        <h2>{selectedDay?.day} Menu</h2>

        <div className="meal-grid">
          {selectedDay?.meals.map((meal) => (
            <div className="meal-card" key={meal.type}>
              <div className="meal-card-header">
                <h3>{meal.type}</h3>
                <span>{meal.time}</span>
              </div>

              <ul>
                {meal.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
