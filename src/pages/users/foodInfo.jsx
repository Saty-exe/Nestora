import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function FoodInfo() {
  const navigate = useNavigate(null);
  const meal = useSelector((state) => state.meal?.meal ?? []);

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const today = meal.find((item) => item.day === currentDay);

  const [selectedID, setSelectedID] = useState(today?.id ?? null);

  const handleClick = (id) => {
    setSelectedID(id);
  };

  const selectedDay = meal.find((item) => item.id === selectedID);

  return (
    <div className="food-info">
      <div className="meal-cards">
        <div className="upcoming-meal"></div>
        {meal.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={
              selectedID === item.id ? "day-button active" : "day-button"
            }
          >
            {item.day}
          </button>
        ))}
      </div>

      <div className="mealByDay">
        {selectedDay?.meals?.map((item) => (
          <div className="food-meal" key={item.type}>
            <div className="food-meal-header">
              <div>
                <p>{item.type}</p>
                <span>{item.time}</span>
              </div>
            </div>

            <div className="food-items">
              {item.items?.map((food, index) => (
                <span className="food-item" key={index}>
                  {food}
                </span>
              ))}
            </div>
          </div>
        ))}

        <button onClick={() => navigate("/user/foodFeedback")}>
          Submit a Feedback
        </button>
      </div>
    </div>
  );
}
