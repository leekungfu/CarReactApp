import { configureStore } from "@reduxjs/toolkit";
import backendDataSlice from "./slice.js";

const store = configureStore({
  reducer: {
    backendData: backendDataSlice,
  },
});

export default store;