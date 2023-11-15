import { createSlice } from "@reduxjs/toolkit";

const driverSlice = createSlice({
  name: 'driver',
  initialState: {
    data: {
      email: '',
      fullName: '',
      birthDay: '',
      phone: '',
      nationalID: '',
      province: '',
      district: '',
      ward: '',
      street: '',
      drivingLicense: '',
    },
  },
  reducers: {
    updateDriverData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateDriverData } = driverSlice.actions;

export default driverSlice.reducer;
