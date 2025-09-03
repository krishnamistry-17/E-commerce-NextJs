import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../pages/slice/cartSlice";
import productDetailReducer from "../pages/slice/productDetailSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    productDetails: productDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
