import { createSlice } from "@reduxjs/toolkit";

const backendDataSlice = createSlice({
  name: "backendDataReducer",
  initialState: [],
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setData } = backendDataSlice.actions;
export default backendDataSlice.reducer;
