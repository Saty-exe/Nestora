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
      state.visitors.unshift({
        status: "Pending",
        ...action.payload,
      });
    },

    removeVisitor(state, action) {
      state.visitors = state.visitors.filter(
        (item) => item.id !== action.payload.id
      );
    },

    updateVisitorStatus(state, action) {
      const visitor = state.visitors.find((item) => item.id === action.payload.id);

      if (visitor) {
        visitor.status = action.payload.status;
      }
    },
  },
});

export const { addVisitor, removeVisitor, updateVisitorStatus } = visitorSlice.actions;
export default visitorSlice.reducer;
