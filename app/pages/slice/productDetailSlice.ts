import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

export interface ProductDetails {
  id: string;
  title: string;
  newPrice: number;
  image: StaticImageData;
  ratingimage: StaticImageData;
  rating: string;
  oldPrice: number;
  category: string;
}

interface ProductDetailState {
  items: ProductDetails[];
}

const initialState: ProductDetailState = {
  items: [],
};

const productDetailSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    showDetails(state, action: PayloadAction<ProductDetails>) {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
  },
});

export const { showDetails } = productDetailSlice.actions;

export default productDetailSlice.reducer;
