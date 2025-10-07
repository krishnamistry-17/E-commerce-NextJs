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

// Create a noop storage for SSR
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// Use noop storage for SSR, localStorage for client
const storage =
  typeof window !== "undefined"
    ? // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("redux-persist/lib/storage").default
    : createNoopStorage();

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
