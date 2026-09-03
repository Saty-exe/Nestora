import { createSlice } from "@reduxjs/toolkit";
import tenantData from "./tenantData";

const initialState = {
  tenant: tenantData,
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,

  reducers: {
    addTenant(state, action) {
      state.tenant.push(action.payload);
    },

    removeTenant(state, action) {
      state.tenant = state.tenant.filter(
        (tenant) => tenant.id !== action.payload.id
      );
    },

    updateTenant(state, action) {
      const tenant = state.tenant.find(
        (tenant) => tenant.id === action.payload.id
      );

      if (!tenant) return;

      Object.assign(tenant, action.payload);
    },
    payRent: (state, action) => {
  const tenantId =
    typeof action.payload === "object" ? action.payload.tenantId : action.payload;
  const tenant = state.tenant.find(
    (tenant) => tenant.id === tenantId
  );

  if (tenant) {
    const paymentDate = new Date().toISOString().split("T")[0];
    const paidMonth = action.payload?.month ?? tenant.payment.pendingMonth;
    const paidAmount = action.payload?.amount ?? tenant.payment.totalPending;

    tenant.payment.history = tenant.payment.history || [];
    tenant.payment.history.unshift({
      id: Date.now(),
      month: paidMonth,
      amount: paidAmount,
      paidOn: paymentDate,
      status: "Paid",
      mode: "Mock Payment",
    });
    tenant.payment.pendingRent = 0;
    tenant.payment.lateFee = 0;
    tenant.payment.totalPending = 0;
    tenant.payment.paymentStatus = "Paid";
    tenant.payment.lastPayment = paymentDate;
    tenant.payment.lastPaymentMonth = paidMonth;
  }
},
  },
});

export const {
  addTenant,
  removeTenant,
  updateTenant,
  payRent,
} = tenantSlice.actions;

export default tenantSlice.reducer;
