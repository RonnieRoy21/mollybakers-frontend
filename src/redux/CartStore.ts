import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CakeModel } from "../models/ItemModel";

const cartItems: CakeModel[] = [];
export const cartStore = createSlice({
  name: "cart",
  initialState: { cartItems },
  reducers: {
    addToCart: (state, action: PayloadAction<CakeModel>) => {
      if (cartItems.some((c) => c.id === action.payload.id)) {
        return;
      }
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<CakeModel>) => {
      if (cartItems.some((c) => c.id === action.payload.id)) {
        state.cartItems.filter((c) => c.id !== action.payload.id);
        return;
      }
      return;
    },
    addQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find((c) => c.id === action.payload);

      if (item) {
        item.quantity += 1;
        return;
      }
      return;
    },
    reduceQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find((c) => c.id === action.payload);

      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          item.quantity = 1;
          return;
        }
        return;
      }
      return;
    },
  },
});

export default cartStore.reducer;
export const { addToCart, removeFromCart, addQuantity, reduceQuantity } =
  cartStore.actions;
