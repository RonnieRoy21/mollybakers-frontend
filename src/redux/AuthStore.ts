import { createSlice } from "@reduxjs/toolkit";
import {
  addItemToCart,
  getSession,
  logoutUser,
  signIn,
  signUp,
} from "../database/SupabaseLogic";

export const authStore = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    isCreated: false,
    userId: "",
    message: "",
    cartItems: [] as number[],
    likedItems: [] as number[],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.message = "Signing Out...";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.userId = "";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.message = action.payload as string;
      })
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
        state.userId = action.payload.customer_id;
        state.cartItems = action.payload.cart_items;
        state.likedItems = action.payload.liked_items!;
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
      })
      .addCase(addItemToCart.fulfilled, (state) => {
        state.message = "Done";
      })
      .addCase(addItemToCart.rejected, (state) => {
        state.message = "Unable to Add to cart";
      });
  },
});
export default authStore.reducer;
