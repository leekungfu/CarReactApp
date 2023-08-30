import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const carAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const carsSelectors = carAdapter.getSelectors((state) => state.cars);

const carSlice = createSlice({
  name: "cars",
  initialState: carAdapter.getInitialState(),
  reducers: {
    carAdded: (state, action) => {
      carAdapter.addOne(state, action.payload);
    },
    carUpdated: carAdapter.updateOne,
    carRemoved: carAdapter.removeOne,
    carSelectedAll: carsSelectors.selectAll,
    carSelected: carsSelectors.selectById,
  },
});

export const { carAdded, carUpdated, carRemoved, carSelectedAll, carSelected } =
  carSlice.actions;
export default carSlice.reducer;
