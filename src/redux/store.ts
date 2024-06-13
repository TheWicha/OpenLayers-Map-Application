import { configureStore } from "@reduxjs/toolkit";
import geometrySlice from "./slices/geometrySlice";

export const store = configureStore({
  reducer: {
    geometry: geometrySlice,
  },
});
