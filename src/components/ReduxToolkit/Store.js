import { configureStore } from "@reduxjs/toolkit";
import backendDataSlice from "./slice.js";
import basicSlice from "./basicSlice.js";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import detailsSlice from "./detailsSlice.js";
import pricingSlice from "./pricingSlice.js";
import carSlice from "./CarAdapter.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, basicSlice);

const store = configureStore({
  reducer: {
    basic: persistedReducer,
    details: detailsSlice,
    pricing: pricingSlice,
    backendData: backendDataSlice,
    cars: carSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "basic/updateData",
          "details/updateDetailsData",
        ],
        ignoredPaths: [
          "basic.data.registrationPaper",
          "basic.data.certificate",
          "basic.data.insurance",
          "details.data.images.frontImage",
          "details.data.images.backImage",
          "details.data.images.leftImage",
          "details.data.images.rightImage",
        ],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
