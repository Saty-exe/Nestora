import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [
    {
      id: 1,
      tenantId: 1,
      tenantName: "Aarav Sharma",
      roomNumber: "101",
      clothes: 8,
      pickupDate: "2026-09-04",
      instructions: "Separate whites if possible.",
      status: "Requested",
      createdAt: "2026-09-02",
    },
    {
      id: 2,
      tenantId: 2,
      tenantName: "Rohan Verma",
      roomNumber: "102",
      clothes: 12,
      pickupDate: "2026-09-03",
      instructions: "Express wash.",
      status: "Processing",
      createdAt: "2026-09-01",
    },
  ],
};

const laundrySlice = createSlice({
  name: "laundry",
  initialState,
  reducers: {
    addLaundryRequest(state, action) {
      state.requests.unshift({
        id: Date.now(),
        status: "Requested",
        createdAt: new Date().toISOString().split("T")[0],
        ...action.payload,
      });
    },

    updateLaundryStatus(state, action) {
      const request = state.requests.find((item) => item.id === action.payload.id);

      if (request) {
        request.status = action.payload.status;
      }
    },
  },
});

export const {
  addLaundryRequest,
  updateLaundryStatus,
} = laundrySlice.actions;

export default laundrySlice.reducer;
