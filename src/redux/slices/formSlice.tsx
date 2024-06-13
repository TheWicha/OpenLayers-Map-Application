import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface FormState {
  name: string;
  creationDate: string;
  wkt: string[];
}

const initialState: FormState = {
  name: "",
  creationDate: "",
  wkt: [],
};

type SubmitFormAction = {
  payload: {
    message: string;
    formState: FormState;
  };
};

export const submitForm = createAsyncThunk<
  SubmitFormAction,
  FormState,
  { rejectValue: string }
>("form/submitForm", async (formState: FormState, { rejectWithValue }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = {
    ok: true,
    json: () => ({
      payload: {
        message: "Form submitted successfully",
        formState,
      },
    }),
  };

  if (!response.ok) {
    return rejectWithValue("Network response was not ok");
  }

  return {
    payload: {
      message: "Form submitted successfully",
      formState,
    },
  };
});

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<FormState>) => {
      state.name = action.payload.name;
      state.creationDate = action.payload.creationDate;
      state.wkt = action.payload.wkt;
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(submitForm.fulfilled, (state, action) => {
      console.log("poszło!");
    });
  },
});

export const { resetForm } = formSlice.actions;

export default formSlice.reducer;
