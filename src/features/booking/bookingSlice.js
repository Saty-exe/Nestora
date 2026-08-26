import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: [],
};

const bookingSlice = createSlice({
  name: "booking",

  initialState,

  reducers: {
    addBooking(state, action) {
      state.booking.push(action.payload);
    },

    deleteBooking(state, action) {
      state.booking = state.booking.filter(
        (booking) => booking.id !== action.payload
      );
    },
    updateBooking: (state, action) => {
  const booking = state.booking.find(
    (item) => item.id === action.payload.id
  );

  if (booking) {
    Object.assign(booking, action.payload);
  }
},
  },
});

export const { addBooking, deleteBooking,updateBooking } =
  bookingSlice.actions;

export default bookingSlice.reducer;