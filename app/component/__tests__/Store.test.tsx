import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/store/authSlice";
import cartReducer from "@/app/pages/slice/cartSlice";
import wishReducer from "@/app/pages/slice/wishListSlice";
import productDetailReducer from "@/app/pages/slice/productDetailSlice";
import BlogDetailReducer from "@/app/pages/slice/blogDetailSlice";
import { store } from "@/app/store/store";

describe("Store", () => {
  it("should create a store", () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
        cart: cartReducer,
        wish: wishReducer,
        productDetails: productDetailReducer,
        product: BlogDetailReducer,
      },
    });
    expect(store).toBeDefined();
    expect(store.getState()).toBeDefined();
  });

  it("should have the correct reducers", () => {
    const state = store.getState();
    expect(state.auth).toBeDefined();
    expect(state.cart).toBeDefined();
    expect(state.wish).toBeDefined();
    expect(state.productDetails).toBeDefined();
    expect(state.product).toBeDefined();

    // Test that the state has the expected initial values
    expect(state.auth.accessToken).toBeNull();
    expect(state.auth.user).toBeNull();
    expect(state.auth.isLoading).toBe(false);
    expect(state.cart.items).toEqual([]);
    expect(state.wish.items).toEqual([]);
    expect(state.productDetails.items).toEqual([]);
    expect(state.product.item).toBeNull();
  });
});
