import { createSlice } from "@reduxjs/toolkit";
import staffData from "./staffData";

const initialState = {
   staff: [...staffData]
};

const staffSlice = createSlice({
  name: "staff",
  initialState,

  reducers: {
     addStaff(state,action) {
        state.staff.push(action.payload)
     }, 
     removeStaff(state,action) {
        state.staff = state.staff.filter((staff)=> staff.id !== action.payload.id)
     },
     

  },
});

export const {
  addStaff,removeStaff
} = staffSlice.actions;

export default staffSlice.reducer;