import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type cake } from "../database/SupabaseLogic";
export interface cartItem {
  cake: cake;
  quantity: number;
  isChecked: boolean;
}

const cartItems: cartItem[] = [];

const handlePriceTotals = (items: cartItem[]) => {
  return items.reduce((total, item) => {
    if (!item.isChecked) return total;

    return total + (item.cake.cake_price ?? 0) * item.quantity;
  }, 0);
};
export const cartStore = createSlice({
  name: "cart",
  initialState: { cartItems, totalCost: 0 },
  reducers: {
    addToCart: (state, action: PayloadAction<cake>) => {
      state.cartItems.push({
        cake: action.payload,
        quantity: 1,
        isChecked: false,
      });

      state.totalCost = handlePriceTotals(state.cartItems);
    },
    removeFromCart: (state, action: PayloadAction<cake>) => {
      state.cartItems = state.cartItems.filter(
        (c) => c.cake.cake_id !== action.payload.cake_id,
      );

      state.totalCost = handlePriceTotals(state.cartItems);
    },
    addQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(
        (c) => c.cake.cake_id === action.payload,
      );

      if (item) {
        item.quantity += 1;
        state.totalCost = handlePriceTotals(state.cartItems);
      }
    },
    reduceQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(
        (c) => c.cake.cake_id === action.payload,
      );

      if (item) {
        item.quantity -= 1;

        if (item.quantity <= 0) {
          item.quantity = 1;
        }

        state.totalCost = handlePriceTotals(state.cartItems);
      }
    },
    checkOutCart: (state, action: PayloadAction<cartItem>) => {
      const item = state.cartItems.find(
        (c) => c.cake.cake_id === action.payload.cake.cake_id,
      );

      if (item) {
        item.isChecked = action.payload.isChecked;
      }

      state.totalCost = handlePriceTotals(state.cartItems);
    },
  },
});

export default cartStore.reducer;
export const {
  addToCart,
  removeFromCart,
  addQuantity,
  reduceQuantity,
  checkOutCart,
} = cartStore.actions;
