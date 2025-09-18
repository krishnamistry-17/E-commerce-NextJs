import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../pages/slice/cartSlice";
import productDetailReducer from "../pages/slice/productDetailSlice";
import wishReducer from "../pages/slice/wishListSlice";
import BlogDetailReducer from "../pages/slice/blogDetailSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wish: wishReducer,
    productDetails: productDetailReducer,
    product: BlogDetailReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
