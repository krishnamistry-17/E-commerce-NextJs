import { stripe } from "@/lib/stripe";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = "inr" } = body;

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Convert amount to cents for Stripe (Stripe expects amount in smallest currency unit)
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency.toLowerCase(),
      payment_method_types: ["card"],
      metadata: {
        // Add any additional metadata you need
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: unknown) {
    console.error("Stripe error:", error);

    // Return more specific error information
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    const errorDetails =
      error && typeof error === "object" && "type" in error
        ? String(error.type)
        : "unknown_error";

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}
