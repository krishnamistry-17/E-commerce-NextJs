import Order from "@/app/api/orders";
import { NextApiRequest, NextApiResponse } from "next";

// Mock response object
const createMockResponse = (): NextApiResponse => {
  const res = {
    statusCode: 200,
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis(),
    writeHead: jest.fn().mockReturnThis(),
    getHeader: jest.fn(),
    setHeader: jest.fn().mockReturnThis(),
    getHeaders: jest.fn(),
    setHeaders: jest.fn().mockReturnThis(),
    getHeaderNames: jest.fn(),
    statusMessage: "",
    strictContentLength: false,
    assignSocket: jest.fn(),
    detachSocket: jest.fn(),
  } as any;
  return res;
};

describe("Order API", () => {
  it("should create an order", async () => {
    const req: NextApiRequest = {
      method: "POST",
      body: {
        fname: "John",
        lname: "Doe",
        email: "john@example.com",
        phone: "1234567890",
        country: "USA",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipcode: "10001",
        cartItems: [
          {
            productId: "1",
            quantity: 2,
            newPrice: 100,
            title: "Test Product",
          },
        ],
        paymentMethod: "cod",
      },
    } as NextApiRequest;

    const res = createMockResponse();

    await Order(req, res);

    expect(res.json).toHaveBeenCalledWith({
      order: expect.objectContaining({
        id: expect.any(String),
        fname: "John",
        lname: "Doe",
        email: "john@example.com",
        phone: "1234567890",
        address: expect.objectContaining({
          country: "USA",
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipcode: "10001",
        }),
        items: expect.arrayContaining([
          expect.objectContaining({
            productId: "1",
            quantity: 2,
            newPrice: 100,
            title: "Test Product",
          }),
        ]),
        payment_method: "cod",
        payment_status: "pending",
        order_status: "processing",
        created_at: expect.any(String),
      }),
    });
  });

  it("should return 405 for non-POST methods", async () => {
    const req: NextApiRequest = {
      method: "GET",
    } as NextApiRequest;

    const res = createMockResponse();

    await Order(req, res);

    expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
  });

  it("should return 400 for missing required fields", async () => {
    const req: NextApiRequest = {
      method: "POST",
      body: {
        fname: "John",
        // Missing other required fields
      },
    } as NextApiRequest;

    const res = createMockResponse();

    await Order(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: "Missing field lname",
    });
  });
});
