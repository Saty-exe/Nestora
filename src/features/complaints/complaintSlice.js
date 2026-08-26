import { createSlice } from "@reduxjs/toolkit";
import complaintData from "./complaintData";

const initialState = {
  complaints: [...complaintData],
};

const complaintSlice = createSlice({
  name: "complaint",

  initialState,

  reducers: {
    addComplaint(state, action) {
      state.complaints.push(action.payload);
    },

    removeComplaint(state, action) {
      state.complaints = state.complaints.filter(
        (complaint) => complaint.id !== action.payload.id
      );
    },

    updateComplaint(state, action) {
      const complaint = state.complaints.find(
        (item) => item.id === action.payload.id
      );

      if (!complaint) return;

      Object.assign(complaint, action.payload);
    },
  },
});

export const {
  addComplaint,
  removeComplaint,
  updateComplaint,
} = complaintSlice.actions;

export default complaintSlice.reducer;