import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface snackBarProps {
  message: string;
  isOpen: boolean;
}
export const snackBarStore = createSlice({
  name: "snackbar",
  initialState: {
    isOpen: false,
    message: "",
  },
  reducers: {
    showSnackBar: (state, action: PayloadAction<snackBarProps>) => {
      state.isOpen = action.payload.isOpen;
      state.message = action.payload.message;
    },
    hideSnackBar: (state) => {
      state.isOpen = false;
    },
  },
});

export default snackBarStore.reducer;
export const { showSnackBar, hideSnackBar } = snackBarStore.actions;
