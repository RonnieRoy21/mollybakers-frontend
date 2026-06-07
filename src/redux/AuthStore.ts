import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "../database/SupabaseLogic";

export const authStore = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    isCreated: false,
    userId: "",
    message: "Please wait...",
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state) => {
        state.isCreated = false;
        state.message = "Creating ...";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isCreated = true;
        state.message = "Success";
        state.userId = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isCreated = false;
        state.message = action.payload!;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userId = action.payload;
        state.message = "Success";
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.message = action.payload!;
      });
  },
});
export default authStore.reducer;
