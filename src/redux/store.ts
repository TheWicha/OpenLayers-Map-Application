import { configureStore } from "@reduxjs/toolkit";
import geometrySlice from "./slices/geometrySlice";
import drawSlice from "./slices/drawSlice";
import wtkSlice from "./slices/wtkSlice";
import formSlice from "./slices/formSlice";
import cleanDrawingsSlice from "./slices/cleanDrawingsSlice";

export const store = configureStore({
  reducer: {
    geometry: geometrySlice,
    draw: drawSlice,
    wtk: wtkSlice,
    form: formSlice,
    clean: cleanDrawingsSlice,
  },
});

export type GeometryState = ReturnType<typeof store.getState>["geometry"];
export type DrawState = ReturnType<typeof store.getState>["draw"];
export type WtkState = ReturnType<typeof store.getState>["wtk"];
export type FormState = ReturnType<typeof store.getState>["form"];
export type CleanState = ReturnType<typeof store.getState>["clean"];

export type RootState = {
  geometry: GeometryState;
  draw: DrawState;
  wtk: WtkState;
  form: FormState;
  clean: CleanState;
};

export type AppDispatch = typeof store.dispatch;
