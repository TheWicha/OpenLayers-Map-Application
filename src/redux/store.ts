import { configureStore } from "@reduxjs/toolkit";
import geometrySlice from "./slices/geometrySlice";
import drawSlice from "./slices/drawSlice";
import wtkSlice from "./slices/wtkSlice";
import formSlice from "./slices/formSlice";

export const store = configureStore({
  reducer: {
    geometry: geometrySlice,
    draw: drawSlice,
    wtk: wtkSlice,
    form: formSlice,
  },
});

export type GeometryState = ReturnType<typeof store.getState>["geometry"];
export type DrawState = ReturnType<typeof store.getState>["draw"];
export type WtkState = ReturnType<typeof store.getState>["wtk"];
export type FormState = ReturnType<typeof store.getState>["form"];

export type RootState = {
  geometry: GeometryState;
  draw: DrawState;
  wtk: WtkState;
  form: FormState;
};

export type AppDispatch = typeof store.dispatch;
