import { configureStore } from "@reduxjs/toolkit";
import geometrySlice from "./slices/geometrySlice";
import drawSlice from "./slices/drawSlice";

export const store = configureStore({
  reducer: {
    geometry: geometrySlice,
    draw: drawSlice,
  },
});

export type GeometryState = ReturnType<typeof store.getState>["geometry"];
export type DrawState = ReturnType<typeof store.getState>["draw"];

export type RootState = {
  geometry: GeometryState;
  draw: DrawState;
};
