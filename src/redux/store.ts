import { configureStore } from "@reduxjs/toolkit";
import geometrySlice from "./slices/geometrySlice";

export const store = configureStore({
  reducer: {
    geometry: geometrySlice,
  },
});

export type GeometryState = ReturnType<typeof store.getState>["geometry"];

export type RootState = {
  geometry: GeometryState;
};
