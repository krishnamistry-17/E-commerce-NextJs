import { NextRequest, NextResponse } from "next/server";
import { computeAggregate, listApprovedByProduct } from "../data";

export async function GET(
  _req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const productId = params.productId;
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
