import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../pages/slice/cartSlice";
import productDetailReducer from "../pages/slice/productDetailSlice";
import wishReducer from "../pages/slice/wishListSlice";
import BlogDetailReducer from "../pages/slice/blogDetailSlice";
import authReducer from "./authSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // localStorage for web

//  Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  wish: wishReducer,
  productDetails: productDetailReducer,
  product: BlogDetailReducer,
  auth: authReducer,
});

//  Persist config (only cart)
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "productDetails"], // only persist the cart slice
};

//  Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//  Create store with middleware fix for redux-persist
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

//  Export persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
