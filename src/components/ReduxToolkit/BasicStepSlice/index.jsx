import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "basicStep",
  initialState: [
    {
      plateNmber: "",
      color: "",
      brand: "",
      type: "",
      productionYear: "",
      numberOfSeat: "",
      transmission: "",
      fuel: "",
      documents: [],
    },
  ],
  reducers: {
    addNewChange: (state, action) => {
      state.push(action.payload);
    },
  },
});
