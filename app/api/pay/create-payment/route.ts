import { NextRequest, NextResponse } from "next/server";
import { Order, OrderResponse } from "@/types/order";

export async function POST(request: NextRequest) {
  try {
    console.log("CREATE PAYMENT API CALLED");

    const body = await request.json();
    console.log("Request body:", body);

    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    console.log("Token present:", !!token);

    if (!token) {
      console.log("No token found");
      return NextResponse.json(
        { success: false, message: "Authorization token required" },
        { status: 401 }
      );
    }

    // Validate required fields
    if (
      !body.Products ||
      !Array.isArray(body.Products) ||
      body.Products.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Products are required" },
        { status: 400 }
      );
    }

    // Calculate totals from the provided products
    const subtotal = body.Products.reduce(
      (total: number, item: { price: number; quantity: number }) =>
        total + Number(item.price) * item.quantity,
      0
    );

    const shippingFee = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + shippingFee + tax;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;

    // Create order data
    const order: Order = {
      _id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      orderNumber,
      userId: "temp_user_id", // You should get this from the token
      items: body.Products.map(
        (item: {
          ProductId: string;
          productName?: string;
          price: number;
          quantity: number;
          image?: string;
        }) => ({
          productId: item.ProductId,
          productName: item.productName || `Product ${item.ProductId}`,
          price: Number(item.price),
          quantity: item.quantity,
          image: item.image || "",
          totalPrice: Number(item.price) * item.quantity,
        })
      ),
      shippingAddress: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        address1: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      paymentMethod: "cod",
      paymentStatus: "pending",
      orderStatus: "pending",
      subtotal,
      shippingFee,
      tax,
      total,
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: "",
    };

    console.log("Order created successfully:", order);

    const response: OrderResponse = {
      success: true,
      message: "Order created successfully",
      order,
    };

    console.log("Returning response:", response);
    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    console.error("Create payment error:", error);

    const errorMessage =
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response &&
      error.response.data &&
      typeof error.response.data === "object" &&
      "message" in error.response.data
        ? String(error.response.data.message)
        : error instanceof Error
        ? error.message
        : "Failed to create payment";

    return NextResponse.json(
      { success: false, message: errorMessage },
      {
        status:
          error &&
          typeof error === "object" &&
          "response" in error &&
          error.response &&
          typeof error.response === "object" &&
          "status" in error.response
            ? Number(error.response.status)
            : 500,
      }
    );
  }
}
