import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [
    {
      id: 1,
      tenantId: 1,
      tenantName: "Aarav Sharma",
      roomNumber: "101",
      preferredDate: "2026-09-04",
      preferredTime: "10:00",
      notes: "Please clean the study table and bathroom.",
      status: "Requested",
      createdAt: "2026-09-02",
    },
  ],
};

const housekeepingSlice = createSlice({
  name: "housekeeping",
  initialState,
  reducers: {
    addHousekeepingRequest(state, action) {
      state.requests.unshift({
        id: Date.now(),
        status: "Requested",
        createdAt: new Date().toISOString().split("T")[0],
        ...action.payload,
      });
    },
                              
    updateHousekeepingStatus(state, action) {
      const request = state.requests.find((item) => item.id === action.payload.id);
      if (request) {
        request.status = action.payload.status;
      }
    },
  },
});

export const {
  addHousekeepingRequest,
  updateHousekeepingStatus,
} = housekeepingSlice.actions;

export default housekeepingSlice.reducer;
