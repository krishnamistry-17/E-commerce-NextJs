import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "../../apiRoutes";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, Products } = body;

    if (!userId || !Products || Products.length === 0) {
      return NextResponse.json(
        { error: "Missing required order parameters" },
        { status: 400 }
      );
    }

    // Calculate total amount
    const totalAmount = Products.reduce((sum: number, item: any) => {
      return sum + item.price * item.quantity;
    }, 0);

    // Get the base URL for return URLs
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    // Prepare the payment payload with return URLs
    const paymentPayload = {
      userId,
      Products,
      totalAmount,
      returnUrl: `${baseUrl}/pages/paypal/success`,
      cancelUrl: `${baseUrl}/pages/paypal/cancel`,
      currency: "USD", // or 'INR' based on your preference
      description: `Order payment for ${Products.length} item(s)`,
    };

    // Call your existing backend API that creates PayPal payment
    const response = await axiosInstance.post(
      apiRoutes.CREATE_PAYMENT,
      paymentPayload
    );

    if (response.data.approvalUrl) {
      return NextResponse.json({
        success: true,
        approvalUrl: response.data.approvalUrl,
        paymentId: response.data.paymentId,
      });
    } else {
      return NextResponse.json(
        { error: "Failed to create PayPal payment" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("PayPal payment creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
