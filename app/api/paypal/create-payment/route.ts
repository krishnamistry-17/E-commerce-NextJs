import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { Products } = body;

    if (!Products || Products.length === 0) {
      return NextResponse.json(
        { error: "Missing required order parameters" },
        { status: 400 }
      );
    }

    // Calculate total amount
    const totalAmount = Products.reduce(
      (sum: number, item: { price: number; quantity: number }) => {
        return sum + item.price * item.quantity;
      },
      0
    );

    // For demo purposes, we'll simulate PayPal payment creation
    // In a real implementation, you would integrate with PayPal SDK
    const paymentId = `paypal_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Generate approval URL (in real implementation, this comes from PayPal)
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const approvalUrl = `${baseUrl}/pages/paypal/success?paymentId=${paymentId}`;

    return NextResponse.json({
      success: true,
      approvalUrl,
      paymentId,
      totalAmount,
      currency: "INR",
    });
  } catch (error) {
    console.error("PayPal payment creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
