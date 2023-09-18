import { createSlice } from "@reduxjs/toolkit";

const bookingData = createSlice({
  name: "bookingData",
  initialState: {
    data: {
      bookingID: "",
      startDate: "",
      endDate: "",
      car: null,
    },
  },
  reducers: {
    setBookingData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setBookingData } = bookingData.actions;
export default bookingData.reducer;
