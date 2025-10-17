import { NextRequest, NextResponse } from "next/server";
import { createReview, computeAggregate, listApprovedByProduct } from "./data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  if (!productId) {
    return NextResponse.json(
      { message: "productId is required" },
      { status: 400 }
    );
  }
  const list = listApprovedByProduct(productId);
  const agg = computeAggregate(list);
  return NextResponse.json({ reviews: list, ...agg }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, userId, rating, title, body: text, user } = body || {};
    if (!productId || !userId || !rating) {
      return NextResponse.json(
        { message: "productId, userId and rating are required" },
        { status: 400 }
      );
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "rating must be 1-5" },
        { status: 400 }
      );
    }
    const review = createReview({
      productId,
      userId,
      rating,
      title,
      body: text,
      user,
      status: "pending",
    });
    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (e: any) {
    if (e?.message === "DUPLICATE_REVIEW") {
      return NextResponse.json(
        { message: "You have already submitted a review for this product" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Failed to create review" },
      { status: 500 }
    );
  }
}
