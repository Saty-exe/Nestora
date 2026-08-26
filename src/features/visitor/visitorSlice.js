import { createSlice } from "@reduxjs/toolkit";
import { visitorRequestsData } from "./visitorData";

const initialState = {
  visitors: visitorRequestsData,
};

const visitorSlice = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    addVisitor(state, action) {
      state.visitors.push(action.payload);
    },

    removeVisitor(state, action) {
      state.visitor = state.visitors.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addVisitor, removeVisitor } = visitorSlice.actions;
export default visitorSlice.reducer;