import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "../database/SupabaseLogic";

export const authStore = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    isCreated: false,
    userId: "",
    message: "",
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
        state.message = action.error.message!.toString();
      })
      .addCase(signIn.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoggedIn = false;
      });
  },
});
export default authStore.reducer;
