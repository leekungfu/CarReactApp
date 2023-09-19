import { createSlice } from "@reduxjs/toolkit";

const bookingDataSlice = createSlice({
  name: "bookingData",
  initialState: {
    bookings: [],
  },
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
  },
});

export const { setBookings, addBooking } = bookingDataSlice.actions;
export default bookingDataSlice.reducer;
