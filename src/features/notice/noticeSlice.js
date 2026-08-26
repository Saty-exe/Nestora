import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },

    removeItem(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addItem, removeItem } = itemSlice.actions;
export default itemSlice.reducer;