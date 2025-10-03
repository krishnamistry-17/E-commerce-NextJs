import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/lib/axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentId, token, payerId } = body;

    if (!paymentId || !token || !payerId) {
      return NextResponse.json(
        { error: "Missing required payment parameters" },
        { status: 400 }
      );
    }

    // Call your backend API to execute the PayPal payment
    // This should be your existing backend that handles PayPal integration
    const response = await axiosInstance.post("/api/paypal/execute-payment", {
      paymentId,
      token,
      payerId,
    });

    if (response.data.success) {
      // Payment executed successfully
      return NextResponse.json({
        success: true,
        message: "Payment executed successfully",
        orderId: response.data.orderId,
        transactionId: response.data.transactionId,
      });
    } else {
      return NextResponse.json(
        { error: "Payment execution failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("PayPal payment execution error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
