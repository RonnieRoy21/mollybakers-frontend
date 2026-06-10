import { createSlice } from "@reduxjs/toolkit";
import { getSession, signIn, signUp } from "../database/SupabaseLogic";

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
        state.message = "Creating ...";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isCreated = true;
        state.message = "Account created.Time to login";
        state.userId = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isCreated = false;
        state.message = action.payload!;
      })
      .addCase(signIn.pending, (state) => {
        state.message = "Logging in ...";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userId = action.payload;
        state.message = "Success";
      })
      .addCase(signIn.rejected, (state, action) => {
        state.message = action.payload!;
      })
      .addCase(getSession.pending, (state) => {
        state.message = "Refreshing...";
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.message = "Session restored";
        state.userId = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(getSession.rejected, (state, action) => {
        state.message = action.payload as string;
      });
  },
});
export default authStore.reducer;
