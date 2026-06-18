import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type cake } from "../database/SupabaseLogic";
export interface cartItem {
  cake: cake;
  quantity: number;
  isChecked: boolean;
}

const cartItems: cartItem[] = [];
const checkoutItems: cartItem[] = [];

const handlePriceTotals = (lst: cartItem[]) => {
  var totalCost: number = 0;
  if (lst.length === 0) {
    return totalCost;
  }

  for (var i = 0; i < lst.length; i++) {
    totalCost = totalCost + lst[i].cake.cake_price! * lst[i].quantity;
  }

  return totalCost;
};
export const cartStore = createSlice({
  name: "cart",
  initialState: { cartItems, checkoutItems, totalCost: 0 },
  reducers: {
    addToCart: (state, action: PayloadAction<cake>) => {
      if (cartItems.some((c) => c.cake.cake_id === action.payload.cake_id)) {
        return;
      }
      state.cartItems.push({
        cake: action.payload,
        quantity: 1,
        isChecked: false,
      });
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
      state.totalCost = 0;
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
      state.totalCost = 0;
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
    checkOutCart: (state, action: PayloadAction<cartItem>) => {
      if (
        action.payload.isChecked === true &&
        !state.checkoutItems.some(
          (c) => c.cake.cake_id === action.payload.cake.cake_id,
        ) //should be checked and not existing in list
      ) {
        state.checkoutItems.push(action.payload);

        state.totalCost = handlePriceTotals(state.checkoutItems);
      } else {
        state.checkoutItems = state.checkoutItems.filter(
          (c) => c.cake.cake_id !== action.payload.cake.cake_id,
        );

        state.totalCost = handlePriceTotals(state.checkoutItems);
      }
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
