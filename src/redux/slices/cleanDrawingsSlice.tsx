import { createSlice } from "@reduxjs/toolkit";

interface CleanState {
  shouldCleanDrawing: boolean;
}

const initialState: CleanState = {
  shouldCleanDrawing: false,
};

const cleanSlice = createSlice({
  name: "drawing",
  initialState,
  reducers: {
    cleanDrawings: (state) => {
      state.shouldCleanDrawing = true;
    },
    startDrawings: (state) => {
      state.shouldCleanDrawing = false;
    },
  },
});

export const { cleanDrawings, startDrawings } = cleanSlice.actions;

export default cleanSlice.reducer;
