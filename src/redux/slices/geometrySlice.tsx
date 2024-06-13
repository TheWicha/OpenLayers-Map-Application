import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeometryType } from "@/src/types";

interface GeometryState {
  type: GeometryType;
}

const initialState: GeometryState = {
  type: "Point",
};

const geometrySlice = createSlice({
  name: "geometry",
  initialState,
  reducers: {
    updateGeometry: (state, action: PayloadAction<GeometryType>) => {
      state.type = action.payload;
    },
  },
});

export const { updateGeometry } = geometrySlice.actions;

export default geometrySlice.reducer;
