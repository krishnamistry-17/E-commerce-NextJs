export const apiRoutes = {
  GET_SIGNIN: "/api/auth/login",
  GET_SIGNUP: "/api/auth/signup",
  GET_ALL_CATEGORY: "/api/product/category-list",
  GET_ALL_PRODUCT: "/admin/productlist",
  VIEW_PRODUCT_DETAILS: (productId: string) =>
    `/api/product/details/${productId}`,
  ADD_TO_CART: (productId: string) => `/api/product/add-item/${productId}`,
  UPDATE_CART: (productId: string) => `/api/product/update-item/${productId}`,
  GET_CART: "/api/product/cart",
  REMOVE_FROM_CART: (productId: string) =>
    `/api/product/remove-item/${productId}`,
  ADD_PRODUCT_FAVORITES: (productId: string) =>
    `/api/product/add-favourite/${productId}`,
  GET_FAVORITES_PRODUCTS: "/api/product/favourite-product",
  REMOVE_FROM_FAVORITES: (productId: string) =>
    `/api/product/remove-favourite/${productId}`,
  SEARCH_PRODUCT: "/api/product/search?q=ap",
  SEND_OTP: "/api/auth/send-otp",
  VERIFY_OTP: "/api/auth/verify-otp",
};
