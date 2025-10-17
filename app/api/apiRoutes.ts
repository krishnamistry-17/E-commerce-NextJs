export const apiRoutes = {
  GET_SIGNIN: "/api/auth/login",
  GET_SIGNUP: "/api/auth/signup",
  FORGOT_PASSWORD: "/api/auth/forgetpassword",
  VERIFY_OTP: "/api/auth/verifyotp",
  RESET_PASSWORD: "/api/auth/resetPassword",
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
  ADD_FAVORITES_TO_CART: "/api/product/add-favourite-to-cart",
  SEARCH_PRODUCT: "/api/product/search?q=ap",
  SEND_OTP: "/api/auth/send-otp",
  // VERIFY_OTP: "/api/auth/verify-otp",
  CREATE_PAYMENT: "/api/paypal/create-payment",
  RETURN_URL: (newOrder: { _id: string }) =>
    `/payment-success?orderId=${newOrder._id}`,
  CANCEL_URL: (newOrder: { _id: string }) =>
    `/payment-cancel?orderId=${newOrder._id}`,
  CREATE_ORDER: "/api/product/create-order",
  GET_ORDERS: "/api/users/orders",
  REMOVE_ORDERS: "/api/product/cancel-order",
  GET_ORDER_BY_ID: (orderId: string) => `/api/product/order/${orderId}`,
  CHANGE_ORDER_STATUS: (orderId: string) =>
    `api/product/order/${orderId}/status`,
  CREATE_ALL_PAYMENT: "/api/pay/create-payment",
  CLEAR_CART: "/api/product/remove-item",
  // Reviews
  GET_REVIEWS: (productId: string) => `/api/reviews/${productId}`,
  CREATE_REVIEW: "/api/reviews",
  MODERATE_REVIEW: (reviewId: string) => `/api/reviews/${reviewId}`,
  GET_PENDING_REVIEWS: "/api/reviews/pending",
};
