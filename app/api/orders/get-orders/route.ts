import { NextRequest, NextResponse } from "next/server";
import { Order, OrderResponse } from "@/types/order";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authorization token required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    // Build query parameters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (status) {
      queryParams.append("status", status);
    }

    // TODO: Replace with actual backend API call
    // For now, return empty orders array
    // const response = await axiosInstance.get(
    //   `/admin/orders/list?${queryParams.toString()}`,
    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // );

    // Mock data for testing - replace with actual API call
    const orders: Order[] = [];
    const totalOrders = 0;

    const orderResponse: OrderResponse = {
      success: true,
      message: "Orders fetched successfully",
      orders,
      totalOrders,
      page,
      limit,
    };

    return NextResponse.json(orderResponse);
  } catch (error: unknown) {
    console.error("Get orders error:", error);

    const errorMessage =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || "Failed to fetch orders";

    return NextResponse.json(
      { success: false, message: errorMessage },
      {
        status:
          (error as { response?: { status?: number } })?.response?.status ||
          500,
      }
    );
  }
}
