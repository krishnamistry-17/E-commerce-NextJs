import { NextRequest, NextResponse } from "next/server";
import { Order, OrderResponse, UpdateOrderStatusRequest } from "@/types/order";
import axiosInstance from "@/lib/axios";

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authorization token required" },
        { status: 401 }
      );
    }

    const { orderId } = params;

    // TODO: Replace with actual backend API call
    // For now, return null - implement actual order fetching
    // const response = await axiosInstance.get(`/api/product/order/${orderId}`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });

    // Mock data for testing - replace with actual API call
    const order: Order | undefined = undefined;

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const orderResponse: OrderResponse = {
      success: true,
      message: "Order fetched successfully",
      order,
    };

    return NextResponse.json(orderResponse);
  } catch (error: any) {
    console.error("Get order error:", error);

    const errorMessage =
      error.response?.data?.message || "Failed to fetch order";

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authorization token required" },
        { status: 401 }
      );
    }

    const { orderId } = params;
    const body: UpdateOrderStatusRequest = await request.json();

    // Update order status in backend
    const response = await axiosInstance.patch(
      `/api/product/order/${orderId}`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const order: Order = response.data?.order;

    const orderResponse: OrderResponse = {
      success: true,
      message: "Order updated successfully",
      order,
    };

    return NextResponse.json(orderResponse);
  } catch (error: any) {
    console.error("Update order error:", error);

    const errorMessage =
      error.response?.data?.message || "Failed to update order";

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: error.response?.status || 500 }
    );
  }
}
