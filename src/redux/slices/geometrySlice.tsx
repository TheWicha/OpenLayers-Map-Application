import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  geometry: "Point" | "LineString" | "Polygon";
}

const initialState: initialStateType = {
  geometry: "Point",
};

const geometrySlice = createSlice({
  name: "geometry",
  initialState,
  reducers: {
    updateGeometry: (state, action: PayloadAction<initialStateType>) => {
      state.geometry = action.payload.geometry;
    },
  },
});

export const { updateGeometry } = geometrySlice.actions;

export default geometrySlice.reducer;
