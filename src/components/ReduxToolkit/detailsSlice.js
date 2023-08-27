import { createSlice } from "@reduxjs/toolkit";

const detailsSlice = createSlice({
  name: "details",
  initialState: {
    data: {
      mileage: "",
      fuelConsumption: "",
      province: "",
      district: "",
      ward: "",
      street: "",
      description: "",
      additionalFunctions: [],
      images: [],
    },
  },
  reducers: {
    updateDetailsData: (state, action) => {
        state.data = action.payload;
    }
  }
});

export const { updateDetailsData } = detailsSlice.actions;
export default detailsSlice.reducer;
