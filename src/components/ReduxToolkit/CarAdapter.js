import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const carAdapter = createEntityAdapter({
  
});

const carsSelectors = carAdapter.getSelectors((state) => state.cars);

const carSlice = createSlice({
  name: "cars",
  initialState: carAdapter.getInitialState(),
  reducers: {
    carAdded: (state, action) => {
      carAdapter.addOne(state, action.payload);
    },
    carsAdded: (state, action) => {
      carAdapter.addMany(state, action.payload);
    },
    carUpdated: carAdapter.updateOne,
    carRemoved: carAdapter.removeOne,
    carSelectedAll: carsSelectors.selectAll,
    carSelected: carsSelectors.selectById,
  },
});

export const { carAdded, carsAdded, carUpdated, carRemoved, carSelectedAll, carSelected } =
  carSlice.actions;
export default carSlice.reducer;
