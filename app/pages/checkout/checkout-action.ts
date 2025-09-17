"use server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "../slice/cartSlice";
import { redirect } from "next/navigation";

export const chekoutaction = async (formData: FormData): Promise<void> => {
  const itemJson = formData.get("item") as string;
  const paymentMethod = formData.get("paymentMethod") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;

  if (!itemJson || !paymentMethod || !firstName || !lastName || !email) {
    throw new Error("Missing required fields");
  }

  const items: CartItem[] = JSON.parse(itemJson);

  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: "usd",
      unit_amount: Math.round(item.newPrice * 100),
      product_data: {
        name: item.title,
      },
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${process.env.NEXT_URL}/`,
    cancel_url: `${process.env.NEXT_URL}/`,
  });

  redirect(session.url!);
};
