import { createSlice } from "@reduxjs/toolkit";

const bookingResult = createSlice({
  name: "bookingResult",
  initialState: {
    data: []
  },
  reducers: {
    addBookingResult: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addBookingResult } = bookingResult.actions;
export default bookingResult.reducer;
