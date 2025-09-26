// pages/api/orders.ts
import type { NextApiRequest, NextApiResponse } from "next";

type OrderItem = {
  productId: string;
  quantity: number;
  newPrice: number;
  title: string;
};

type OrderBody = {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  country: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  cartItems: OrderItem[];
  paymentMethod: "cod" | "bank" | "card";
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body: OrderBody = req.body;

    // Validate required fields
    const requiredFields = [
      "fname",
      "lname",
      "email",
      "phone",
      "country",
      "street",
      "city",
      "state",
      "zipcode",
      "cartItems",
      "paymentMethod",
    ];
    const bodyObj = body as Record<string, unknown>;

    for (const field of requiredFields) {
      if (!bodyObj[field]) {
        return res.status(400).json({ error: `Missing field ${field}` });
      }
    }

    // Prepare order object
    const newOrder = {
      id: Date.now().toString(), // or use UUID
      fname: body.fname,
      lname: body.lname,
      email: body.email,
      phone: body.phone,
      address: {
        country: body.country,
        street: body.street,
        city: body.city,
        state: body.state,
        zipcode: body.zipcode,
      },
      items: body.cartItems,
      payment_method: body.paymentMethod,
      payment_status:
        body.paymentMethod === "cod" ? "pending" : "requires_payment",
      order_status: "processing",
      created_at: new Date().toISOString(),
    };

    // TODO: Save newOrder to your DB here

    res.status(200).json({ order: newOrder });
  } catch (error) {
    console.error("Error in orders API:", error);

    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred." });
    }
  }
}
