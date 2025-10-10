import { apiRoutes } from "@/app/api/apiRoutes";

describe("apiRoutes", () => {
  it("should return the correct api routes", () => {
    expect(apiRoutes.GET_SIGNIN).toBe("/api/auth/login");
    expect(apiRoutes.GET_SIGNUP).toBe("/api/auth/signup");
    expect(apiRoutes.FORGOT_PASSWORD).toBe("/api/auth/forgetpassword");
    expect(apiRoutes.VERIFY_OTP).toBe("/api/auth/verifyotp");
    expect(apiRoutes.RESET_PASSWORD).toBe("/api/auth/resetPassword");
    expect(apiRoutes.GET_ALL_CATEGORY).toBe("/api/product/category-list");
    expect(apiRoutes.GET_ALL_PRODUCT).toBe("/admin/productlist");
    expect(apiRoutes.GET_CART).toBe("/api/product/cart");
    expect(apiRoutes.ADD_FAVORITES_TO_CART).toBe(
      "/api/product/add-favourite-to-cart"
    );
    expect(apiRoutes.SEARCH_PRODUCT).toBe("/api/product/search?q=ap");
    expect(apiRoutes.SEND_OTP).toBe("/api/auth/send-otp");
    expect(apiRoutes.CREATE_PAYMENT).toBe("/api/paypal/create-payment");
    expect(apiRoutes.CREATE_ORDER).toBe("/api/product/create-order");
    expect(apiRoutes.GET_ORDERS).toBe("/api/users/orders");
    expect(apiRoutes.REMOVE_ORDERS).toBe("/api/product/cancel-order");
    expect(apiRoutes.GET_ORDER_BY_ID("123")).toBe("/api/product/order/123");
    expect(apiRoutes.CHANGE_ORDER_STATUS("123")).toBe(
      "api/product/order/123/status"
    );
    expect(apiRoutes.CREATE_ALL_PAYMENT).toBe("/api/pay/create-payment");
    expect(apiRoutes.CLEAR_CART).toBe("/api/product/remove-item");
    expect(apiRoutes.VIEW_PRODUCT_DETAILS("123")).toBe(
      "/api/product/details/123"
    );
    expect(apiRoutes.ADD_TO_CART("123")).toBe("/api/product/add-item/123");
    expect(apiRoutes.UPDATE_CART("123")).toBe("/api/product/update-item/123");
    expect(apiRoutes.REMOVE_FROM_CART("123")).toBe(
      "/api/product/remove-item/123"
    );
    expect(apiRoutes.ADD_PRODUCT_FAVORITES("123")).toBe(
      "/api/product/add-favourite/123"
    );
    expect(apiRoutes.GET_FAVORITES_PRODUCTS).toBe(
      "/api/product/favourite-product"
    );
    expect(apiRoutes.REMOVE_FROM_FAVORITES("123")).toBe(
      "/api/product/remove-favourite/123"
    );
    expect(apiRoutes.RETURN_URL({ _id: "123" })).toBe(
      "/payment-success?orderId=123"
    );
    expect(apiRoutes.CANCEL_URL({ _id: "123" })).toBe(
      "/payment-cancel?orderId=123"
    );
  });
});
