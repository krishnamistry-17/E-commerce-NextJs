export const apiRoutes = {
  GET_SIGNIN: "/api/auth/login",
  GET_SIGNUP: "/api/auth/signup",
  GET_ALL_CATEGORY: "/api/product/category-list",
  GET_ALL_PRODUCT: "/admin/productlist",
  VIEW_PRODUCT_DETAILS: (productId: string) =>
    `/api/product/details/${productId}`,
  ADD_TO_CART: (productId: string) => `/api/product/add-item/${productId}`,
  UPDATE_CART: "/api/product/update-item",
  GET_CART: "/api/product/search?q=ap",
  REMOVE_FROM_CART: (productId: string) =>
    `/api/product/remove-item/${productId}`,
};
