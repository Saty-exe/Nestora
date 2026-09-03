import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  referrals: [
    {
      id: 1,
      tenantId: 1,
      name: "Nikhil Jain",
      phone: "9876501234",
      email: "nikhil@example.com",
      status: "Pending",
      reward: 3000,
      createdAt: "2026-09-01",
    },
  ],
};

const referralSlice = createSlice({
  name: "referral",
  initialState,
  reducers: {
    addReferral(state, action) {
      state.referrals.unshift({
        id: Date.now(),
        status: "Pending",
        reward: 3000,
        createdAt: new Date().toISOString().split("T")[0],
        ...action.payload,
      });
    },

    updateReferralStatus(state, action) {
      const referral = state.referrals.find((item) => item.id === action.payload.id);

      if (referral) {
        referral.status = action.payload.status;
      }
    },
  },
});

export const { addReferral, updateReferralStatus } = referralSlice.actions;
export default referralSlice.reducer;
