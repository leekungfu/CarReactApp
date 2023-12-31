import { createSlice } from "@reduxjs/toolkit";

const basicSlice = createSlice({
  name: 'basic',
  initialState: {
    data: {
      plateNumber: '',
      color: '',
      brand: '',
      model: '',
      productionYear: '',
      numberOfSeat: '',
      transmissionType: '',
      fuelType: '',
      documents: [],
    },
  },
  reducers: {
    updateBasicData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateBasicData } = basicSlice.actions;

export default basicSlice.reducer;
