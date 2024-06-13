import { configureStore } from "@reduxjs/toolkit";
import geometrySlice from "./slices/geometrySlice";
import drawSlice from "./slices/drawSlice";
import wtkSlice from "./slices/wtkSlice";

export const store = configureStore({
  reducer: {
    geometry: geometrySlice,
    draw: drawSlice,
    wtk: wtkSlice,
  },
});

export type GeometryState = ReturnType<typeof store.getState>["geometry"];
export type DrawState = ReturnType<typeof store.getState>["draw"];
export type WtkState = ReturnType<typeof store.getState>["wtk"];

export type RootState = {
  geometry: GeometryState;
  draw: DrawState;
  wtk: WtkState;
};
