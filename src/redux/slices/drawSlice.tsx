import { createSlice } from "@reduxjs/toolkit";

interface DrawingState {
  shouldStartDrawing: boolean;
}

const initialState: DrawingState = {
  shouldStartDrawing: false,
};

const drawSlice = createSlice({
  name: "drawing",
  initialState,
  reducers: {
    startDrawing: (state) => {
      state.shouldStartDrawing = true;
    },
    stopDrawing: (state) => {
      state.shouldStartDrawing = false;
    },
  },
});

export const { startDrawing, stopDrawing } = drawSlice.actions;

export default drawSlice.reducer;
