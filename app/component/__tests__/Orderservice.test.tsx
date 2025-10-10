import { OrderService } from "@/services/orderService";
import { CreateOrderRequest, OrderResponse } from "@/types/order";

// Mock axios instance
jest.mock("@/lib/axios", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
  },
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

describe("OrderService", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Mock localStorage to return a token
    localStorageMock.getItem.mockReturnValue("mock-access-token");
  });

  test("should create an order", async () => {
    const orderData: CreateOrderRequest = {
      Products: [
        {
          ProductId: "1",
          quantity: 1,
          price: 100,
          total: 100,
        },
      ],
    };

    const mockResponse: OrderResponse = {
      success: true,
      message: "Order created successfully",
      order: {
        _id: "order-123",
        orderNumber: "ORD-001",
        userId: "user-123",
        items: [],
        shippingAddress: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "1234567890",
          address: "123 Main St",
          address1: "",
          city: "City",
          state: "State",
          zipCode: "12345",
          country: "Country",
        },
        paymentMethod: "cod",
        paymentStatus: "pending",
        orderStatus: "pending",
        subtotal: 100,
        shippingFee: 0,
        tax: 0,
        total: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    const axiosInstance = require("@/lib/axios").default;
    axiosInstance.post.mockResolvedValue({ data: mockResponse });

    const result = await OrderService.createOrder(orderData);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      expect.any(String), // API route
      orderData
    );
    expect(result).toEqual(mockResponse);
  });

  test("should get all orders", async () => {
    const mockResponse: OrderResponse = {
      success: true,
      message: "Orders fetched successfully",
      orders: [],
      totalOrders: 0,
      page: 1,
      limit: 10,
    };

    const axiosInstance = require("@/lib/axios").default;
    axiosInstance.get.mockResolvedValue({ data: mockResponse });

    const result = await OrderService.getOrders();

    expect(axiosInstance.get).toHaveBeenCalledWith(
      expect.stringContaining("/api/users/orders"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer mock-access-token",
        }),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  test("should get an order by id", async () => {
    const mockOrder = {
      _id: "order-123",
      orderNumber: "ORD-001",
      userId: "user-123",
      items: [],
      shippingAddress: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "1234567890",
        address: "123 Main St",
        address1: "",
        city: "City",
        state: "State",
        zipCode: "12345",
        country: "Country",
      },
      paymentMethod: "cod" as const,
      paymentStatus: "pending" as const,
      orderStatus: "pending" as const,
      subtotal: 100,
      shippingFee: 0,
      tax: 0,
      total: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockResponse: OrderResponse = {
      success: true,
      message: "Order fetched successfully",
      order: mockOrder,
    };

    const axiosInstance = require("@/lib/axios").default;
    axiosInstance.get.mockResolvedValue({ data: mockResponse });

    const result = await OrderService.getOrderById("order-123");

    expect(axiosInstance.get).toHaveBeenCalledWith(
      expect.stringContaining("/api/product/order/order-123"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer mock-access-token",
        }),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  test("should handle create order error", async () => {
    const orderData: CreateOrderRequest = {
      Products: [
        {
          ProductId: "1",
          quantity: 1,
          price: 100,
          total: 100,
        },
      ],
    };

    const axiosInstance = require("@/lib/axios").default;
    axiosInstance.post.mockRejectedValue({
      response: {
        data: {
          message: "Insufficient stock",
        },
      },
    });

    await expect(OrderService.createOrder(orderData)).rejects.toThrow(
      "Insufficient stock"
    );
  });

  test("should handle missing access token", async () => {
    localStorageMock.getItem.mockReturnValue(null);

    const orderData: CreateOrderRequest = {
      Products: [
        {
          ProductId: "1",
          quantity: 1,
          price: 100,
          total: 100,
        },
      ],
    };

    await expect(OrderService.createOrder(orderData)).rejects.toThrow(
      "Failed to create order"
    );
  });

  test("should handle network error", async () => {
    const orderData: CreateOrderRequest = {
      Products: [
        {
          ProductId: "1",
          quantity: 1,
          price: 100,
          total: 100,
        },
      ],
    };

    const axiosInstance = require("@/lib/axios").default;
    axiosInstance.post.mockRejectedValue({
      response: {
        data: {
          message: "Network error",
        },
      },
    });

    await expect(OrderService.createOrder(orderData)).rejects.toThrow(
      "Network error"
    );
  });
});
