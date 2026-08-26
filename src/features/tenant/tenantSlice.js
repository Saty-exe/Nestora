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
  },
});

export const {
  addTenant,
  removeTenant,
  updateTenant,
} = tenantSlice.actions;

export default tenantSlice.reducer;