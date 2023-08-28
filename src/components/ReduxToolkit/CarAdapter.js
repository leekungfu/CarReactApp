import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";


const carAdapter = createEntityAdapter({
    sortComparer: (a,b) => a.id.localeCompare(b.id),
});

const carsSelectors = carAdapter.getSelectors((state) => state.cars).selectAll;

const carSlice = createSlice({
    name: "cars",
    initialState: carAdapter.getInitialState(),
    reducers: {
        carAdded: carAdapter.addOne,
        carUpdated: carAdapter.updateOne,
        carRemoved: carAdapter.removeOne,
        carSelected: carAdapter.selectId,
        carSelectedAll: carsSelectors,
    },
});

export const { carAdded, carUpdated, carRemoved, carSelected, carSelectedAll } = carSlice.actions;
export default carSlice.reducer;