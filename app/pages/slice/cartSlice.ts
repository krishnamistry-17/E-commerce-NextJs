import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

export interface CartItem {
  id: string;
  title: string;
  newPrice: number;
  quantity: number;
  image: StaticImageData;
  size: string;
}
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const itemIndex = state?.items?.findIndex(
        (item) => item?.id === action?.payload?.id
      );
      if (itemIndex >= 0) {
        //if item is already in cart, incarese quantiity
        state.items[itemIndex].quantity += action?.payload?.quantity; //add the quantity if already in cart
        state.items[itemIndex].size += action?.payload?.size;
      } else {
        //add new item
        state?.items?.push(action?.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
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
    },
  },
});
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
