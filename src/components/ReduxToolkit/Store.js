import { configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit";
import userDataSlice from "./UserSlice.js";
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
import thunkMiddleware from "redux-thunk";

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
    userData: userDataSlice,
    cars: carSlice,
  },
  middleware: [
    ...getDefaultMiddleware({
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
          "basic/updateBasicData",
        ],
        ignoredPaths: [
          "basic.data.registrationPaper",
          "basic.data.certificate",
          "basic.data.insurance",
          "details.data.images.frontImage",
          "details.data.images.backImage",
          "details.data.images.leftImage",
          "details.data.images.rightImage",
          "basic.data.documents.registrationPaper",
          "basic.data.documents.certificate",
          "basic.data.documents.insurance",
        ],
      },
    }),
    thunkMiddleware,
  ],
});

export const persistor = persistStore(store);
export default store;
