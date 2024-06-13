import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WtkState {
  coordinates: string;
}

const initialState: WtkState = {
  coordinates: "",
};

const wtkSlice = createSlice({
  name: "wtk",
  initialState,
  reducers: {
    updateWtk: (state, action: PayloadAction<WtkState>) => {
      state.coordinates = action.payload.coordinates;
    },
  },
});

export const { updateWtk } = wtkSlice.actions;

export default wtkSlice.reducer;
