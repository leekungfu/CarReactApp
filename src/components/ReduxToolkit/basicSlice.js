import { createSlice } from "@reduxjs/toolkit";

const basicSlice = createSlice({
  name: 'basic',
  initialState: {
    data: {
      plateNumber: '',
      color: '',
      brand: '',
      type: '',
      productionYear: '',
      numberOfSeat: '',
      transmission: '',
      fuel: '',
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
