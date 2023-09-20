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
    updateBookingStatus: (state, action) => {
      const { bookingId, newStatus } = action.payload;
      const bookingToUpdate = state.bookings.find(
        (booking) => booking.id === bookingId
      );
      if (bookingToUpdate) {
        bookingToUpdate.bookingStatus = newStatus;
      }
    },
  },
});

export const { setBookings, addBooking, updateBookingStatus } = bookingDataSlice.actions;
export default bookingDataSlice.reducer;
