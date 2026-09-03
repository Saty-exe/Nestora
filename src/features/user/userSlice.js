
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: null,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },

    clearLoggedInUser: (state) => {
      state.loggedInUser = null;
    },

    updateLoggedInUser: (state, action) => {
      if (!state.loggedInUser) {
        return;
      }

      state.loggedInUser = {
        ...state.loggedInUser,
        ...action.payload,
      };
    },
  },
});

export const {
  setLoggedInUser,
  clearLoggedInUser,
  updateLoggedInUser,
} = userSlice.actions;

export default userSlice.reducer;

