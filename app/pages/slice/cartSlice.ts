// store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  productName: string;
  price: string;
  quantity: number;
  image: string;
  stock: number;
}

interface CartState {
  items: CartItem[];
  clickedCartIds: string[];
  setClickedCartIds: string[];
}

const initialState: CartState = {
  items: [],
  clickedCartIds: [],
  setClickedCartIds: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      if (!state.clickedCartIds?.includes(action.payload.id)) {
        state.clickedCartIds?.push(action.payload.id);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.clickedCartIds = state.clickedCartIds.filter(
        (id) => id !== action.payload
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && action.payload.quantity >= 1) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.clickedCartIds = [];
    },
    addToClickedCartIds(state, action: PayloadAction<string>) {
      if (!state.clickedCartIds.includes(action.payload)) {
        state.clickedCartIds.push(action.payload);
      }
    },
    setClickedCartIds(state, action: PayloadAction<string[]>) {
      state.clickedCartIds = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  addToClickedCartIds,
  setClickedCartIds,
} = cartSlice.actions;

export default cartSlice.reducer;
