import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { cake } from "../database/SupabaseLogic";
interface cartItem {
  cake: cake;
  quantity: number;
}
const cartItems: cartItem[] = [];
export const cartStore = createSlice({
  name: "cart",
  initialState: { cartItems },
  reducers: {
    addToCart: (state, action: PayloadAction<cake>) => {
      if (cartItems.some((c) => c.cake.cake_id === action.payload.cake_id)) {
        return;
      }
      state.cartItems.push({ cake: action.payload, quantity: 1 });
    },
    removeFromCart: (state, action: PayloadAction<cake>) => {
      if (cartItems.some((c) => c.cake.cake_id === action.payload.cake_id)) {
        state.cartItems.filter(
          (c) => c.cake.cake_id !== action.payload.cake_id,
        );
        return;
      }
      return;
    },
    addQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(
        (c) => c.cake.cake_id === action.payload,
      );

      if (item) {
        item.quantity += 1;
        return;
      }
      return;
    },
    reduceQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(
        (c) => c.cake.cake_id === action.payload,
      );

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
