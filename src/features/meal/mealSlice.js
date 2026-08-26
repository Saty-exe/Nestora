import { createSlice } from "@reduxjs/toolkit";
import mealData from "./mealData";

const initialState = {
  meal: mealData,
};

const mealSlice = createSlice({
  name: "meal",
  initialState,

  reducers: {
    updateMeal(state, action) {
      const { id, mealType, mealTime, updatedMeal } = action.payload;

      const day = state.meal.find((item) => item.id === id);

      if (!day) return;

      const meal = day.meals.find(
        (item) => item.type.toLowerCase() === mealType.toLowerCase()
      );

      if (!meal) return;

      meal.time = mealTime;
      meal.items = updatedMeal;
    },
  },
});

export const { updateMeal } = mealSlice.actions;

export default mealSlice.reducer;