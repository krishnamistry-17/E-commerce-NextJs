import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

export interface WishItem {
  id: string;
  title: string;
  newPrice: number;
  quantity: number;
  image: StaticImageData;
}
interface WishState {
  items: WishItem[];
}

const initialState: WishState = {
  items: [],
};

const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addToWishList(state, action: PayloadAction<WishItem>) {
      const itemIndex = state?.items?.findIndex(
        (item) => item?.id === action?.payload?.id
      );
      if (itemIndex >= 0) {
        //if item is already in cart, incarese quantiity
        state.items[itemIndex].quantity += action?.payload?.quantity; //add the quantity if already in cart
      } else {
        //add new item
        state?.items?.push(action?.payload);
      }
    },
    removeFromWishList(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWishList(state) {
      state.items = [];
    },
  },
});
export const { addToWishList, removeFromWishList, clearWishList } =
  wishSlice.actions;

export default wishSlice.reducer;
