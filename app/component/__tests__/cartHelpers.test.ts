import { handleCart, clearCartAfterPayment } from "@/utils/cartHelpers";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { addToCart } from "@/app/pages/slice/cartSlice";

// Mock dependencies
jest.mock("@/lib/axios");
jest.mock("@/app/api/apiRoutes", () => ({
  apiRoutes: {
    ADD_TO_CART: jest.fn((id: string) => `/api/product/add-item/${id}`),
    GET_CART: "/api/product/cart",
    REMOVE_FROM_CART: jest.fn((id: string) => `/api/product/remove-item/${id}`),
  },
}));
jest.mock("react-toastify", () => ({
  toast: {
    info: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock("@/app/pages/slice/cartSlice", () => ({
  addToCart: jest.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock window.dispatchEvent
const mockDispatchEvent = jest.fn();
Object.defineProperty(window, "dispatchEvent", {
  value: mockDispatchEvent,
});

describe("cartHelpers", () => {
  const mockDispatch = jest.fn();
  const mockProduct = {
    _id: "product-123",
    productName: "Test Product",
    price: 100,
    image: "test-image.jpg",
    stock: 10,
    quantity: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatchEvent.mockClear();
  });

  describe("handleCart", () => {
    it("should show info toast if product already exists in cart", async () => {
      const clickedCartIds = ["product-123", "product-456"];

      await handleCart(
        mockProduct,
        clickedCartIds,
        mockDispatch,
        "product-123"
      );

      expect(toast.info).toHaveBeenCalledWith("Product already exists in cart");
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("should show login prompt if no access token", async () => {
      localStorageMock.getItem.mockReturnValue(null);

      await handleCart(mockProduct, [], mockDispatch, "product-123");

      expect(toast.info).toHaveBeenCalledWith(
        "Please Login to add product in cart"
      );
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("should successfully add product to cart", async () => {
      localStorageMock.getItem.mockReturnValue("mock-token");
      const mockAxiosResponse = {
        status: 200,
        data: { success: true },
      };
      (axiosInstance.post as jest.Mock).mockResolvedValue(mockAxiosResponse);

      await handleCart(mockProduct, [], mockDispatch, "product-123");

      expect(axiosInstance.post).toHaveBeenCalledWith(
        "/api/product/add-item/product-123"
      );
      expect(toast.success).toHaveBeenCalledWith("Added to cart successfully!");
      expect(addToCart).toHaveBeenCalledWith({
        id: "product-123",
        productName: "Test Product",
        price: "100",
        quantity: 1,
        image: "test-image.jpg",
        stock: 10,
      });
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "cartUpdated",
          detail: {
            action: "add",
            productId: "product-123",
          },
        })
      );
    });

    it("should handle 409 conflict error and add to local cart", async () => {
      localStorageMock.getItem.mockReturnValue("mock-token");
      const conflictError = {
        response: { status: 409 },
      };
      (axiosInstance.post as jest.Mock).mockRejectedValue(conflictError);

      await handleCart(mockProduct, [], mockDispatch, "product-123");

      expect(toast.info).toHaveBeenCalledWith(
        "Product already exists in cart."
      );
      expect(addToCart).toHaveBeenCalledWith({
        id: "product-123",
        productName: "Test Product",
        price: "100",
        quantity: 1,
        image: "test-image.jpg",
        stock: 10,
      });
    });

    it("should handle other errors and show error toast", async () => {
      localStorageMock.getItem.mockReturnValue("mock-token");
      const error = {
        response: { status: 500, data: { message: "Server error" } },
      };
      (axiosInstance.post as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      await handleCart(mockProduct, [], mockDispatch, "product-123");

      expect(consoleSpy).toHaveBeenCalledWith("Error adding to cart:", error);
      expect(toast.error).toHaveBeenCalledWith("Failed to add product to cart");

      consoleSpy.mockRestore();
    });

    it("should use default quantity of 1 if not provided", async () => {
      localStorageMock.getItem.mockReturnValue("mock-token");
      const productWithoutQuantity = { ...mockProduct };

      const mockAxiosResponse = {
        status: 200,
        data: { success: true },
      };
      (axiosInstance.post as jest.Mock).mockResolvedValue(mockAxiosResponse);

      await handleCart(productWithoutQuantity, [], mockDispatch, "product-123");

      expect(addToCart).toHaveBeenCalledWith(
        expect.objectContaining({
          quantity: 1,
        })
      );
    });
  });

  describe("clearCartAfterPayment", () => {
    const mockClearCartAction = { type: "cart/clearCart" };
    const mockClearCart = jest.fn(() => mockClearCartAction);
    const mockCartResponse = {
      data: {
        cart: {
          cartItems: [{ productId: "item-1" }, { productId: "item-2" }],
        },
      },
    };

    it("should successfully clear cart after payment", async () => {
      (axiosInstance.get as jest.Mock).mockResolvedValue(mockCartResponse);
      (axiosInstance.delete as jest.Mock).mockResolvedValue({ status: 200 });

      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      await clearCartAfterPayment(mockDispatch, mockClearCart, "order-123");

      expect(axiosInstance.get).toHaveBeenCalledWith("/api/product/cart");
      expect(axiosInstance.delete).toHaveBeenCalledWith(
        "/api/product/remove-item/item-1"
      );
      expect(axiosInstance.delete).toHaveBeenCalledWith(
        "/api/product/remove-item/item-2"
      );
      expect(mockDispatch).toHaveBeenCalledWith(mockClearCartAction);
      expect(toast.success).toHaveBeenCalledWith("Cart cleared successfully!");
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "cartUpdated",
        })
      );

      consoleSpy.mockRestore();
    });

    it("should handle empty cart gracefully", async () => {
      const emptyCartResponse = {
        data: {
          cart: {
            cartItems: [],
          },
        },
      };
      (axiosInstance.get as jest.Mock).mockResolvedValue(emptyCartResponse);

      await clearCartAfterPayment(mockDispatch, mockClearCart, "order-123");

      expect(axiosInstance.delete).not.toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith(mockClearCartAction);
      expect(toast.success).toHaveBeenCalledWith("Cart cleared successfully!");
    });

    it("should handle backend errors but still clear local cart", async () => {
      (axiosInstance.get as jest.Mock).mockRejectedValue(
        new Error("Network error")
      );

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      await clearCartAfterPayment(mockDispatch, mockClearCart, "order-123");

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error clearing cart after payment:",
        expect.any(Error)
      );
      expect(mockDispatch).toHaveBeenCalledWith(mockClearCartAction);
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "cartUpdated",
        })
      );

      consoleSpy.mockRestore();
    });

    it("should handle individual item removal failures", async () => {
      (axiosInstance.get as jest.Mock).mockResolvedValue(mockCartResponse);
      (axiosInstance.delete as jest.Mock)
        .mockResolvedValueOnce({ status: 200 }) // First item succeeds
        .mockRejectedValueOnce(new Error("Failed to remove item")); // Second item fails

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      await clearCartAfterPayment(mockDispatch, mockClearCart, "order-123");

      expect(axiosInstance.delete).toHaveBeenCalledTimes(2);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to remove item item-2:",
        expect.any(Error)
      );
      expect(mockDispatch).toHaveBeenCalledWith(mockClearCartAction);

      consoleSpy.mockRestore();
    });

    it("should work without orderId parameter", async () => {
      (axiosInstance.get as jest.Mock).mockResolvedValue(mockCartResponse);
      (axiosInstance.delete as jest.Mock).mockResolvedValue({ status: 200 });

      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      await clearCartAfterPayment(mockDispatch, mockClearCart);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Clearing cart after payment for order:",
        undefined
      );
      expect(toast.success).toHaveBeenCalledWith("Cart cleared successfully!");

      consoleSpy.mockRestore();
    });
  });
});
