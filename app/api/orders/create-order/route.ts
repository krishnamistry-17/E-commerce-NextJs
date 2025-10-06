import { NextRequest, NextResponse } from "next/server";
import { Order, CreateOrderRequest, OrderResponse } from "@/types/order";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "@/app/api/apiRoutes";

export async function POST(request: NextRequest) {
  try {
    console.log("CREATE ORDER API CALLED");

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
    if (!body.products || !Array.isArray(body.products) || body.products.length === 0) {
      return NextResponse.json(
        { success: false, message: "Products are required" },
        { status: 400 }
      );
    }

    if (!body.userID) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    // Calculate totals from the provided products
    const subtotal = body.products.reduce(
      (total: number, item: any) => total + Number(item.price) * item.quantity,
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
      userId: body.userID,
      items: body.products.map((item: any) => ({
        productId: item.ProductId,
        productName: item.productName || `Product ${item.ProductId}`,
        price: Number(item.price),
        quantity: item.quantity,
        image: item.image || "",
        totalPrice: Number(item.price) * item.quantity,
      })),
      shippingAddress: {
        firstName: body.shippingAddress?.firstName || "",
        lastName: body.shippingAddress?.lastName || "",
        email: body.shippingAddress?.email || "",
        phone: body.shippingAddress?.phone || "",
        address: body.address || "",
        address1: body.shippingAddress?.address1 || "",
        city: body.shippingAddress?.city || "",
        state: body.shippingAddress?.state || "",
        zipCode: body.shippingAddress?.zipCode || "",
        country: body.shippingAddress?.country || "",
      },
      paymentMethod: body.paymentMethod || "cod",
      paymentStatus: body.paymentMethod === "cod" ? "pending" : "pending",
      orderStatus: "pending",
      subtotal,
      shippingFee,
      tax,
      total,
      paymentIntentId: body.paymentIntentId,
      transactionId: body.transactionId,
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: body.notes || "",
    };

    console.log("Order created successfully:", order);

    const response: OrderResponse = {
      success: true,
      message: "Order created successfully",
      order,
    };

    console.log("Returning response:", response);
    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    console.error("Create order error:", error);

    const errorMessage =
      error.response?.data?.message || error.message || "Failed to create order";

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: error.response?.status || 500 }
    );
  }
}
