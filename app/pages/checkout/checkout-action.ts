// checkout-action.ts (still a server action)
"use server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "../slice/cartSlice";

export const chekoutaction = async (formData: FormData): Promise<string> => {
  const itemJson = formData.get("item") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;

  if (!itemJson || !firstName || !lastName || !email) {
    throw new Error("Missing required fields");
  }

  const items: CartItem[] = JSON.parse(itemJson);

  const totalAmount = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalAmount * 100), // in cents
    currency: "usd",
    receipt_email: email,
    metadata: {
      customer_name: `${firstName} ${lastName}`,
    },
  });

  return paymentIntent.client_secret || "";
};
