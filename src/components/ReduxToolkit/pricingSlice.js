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
    clearPricingData: (state) => {
      state.data = {
        price: "",
        deposit: "",
        terms: [],
      };
    },
  },
});

export const { updatePricingData, clearPricingData } = pricingSlice.actions;
export default pricingSlice.reducer;
