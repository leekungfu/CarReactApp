import { createSlice } from "@reduxjs/toolkit";

const pricingSlice = createSlice({
  name: "pricing",
  initialState: {
    data: {
      price: "",
      deposit: "",
      terms: [],
    },
  },
  reducers: {
    updatePricingData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updatePricingData } = pricingSlice.actions;
export default pricingSlice.reducer;
