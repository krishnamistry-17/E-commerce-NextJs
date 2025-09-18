// app/api/create-payment-intent/route.ts
import { NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
