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
    initiateDrawings: (state) => {
      state.shouldCleanDrawing = false;
    },
  },
});

export const { cleanDrawings, initiateDrawings } = cleanSlice.actions;

export default cleanSlice.reducer;
