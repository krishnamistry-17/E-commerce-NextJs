import { NextRequest, NextResponse } from "next/server";
import { moderateReview } from "../data";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { reviewId: string } }
) {
  try {
    const reviewId = params.reviewId;
    const body = await _req.json();
    const status = body?.status as "approved" | "rejected";
    if (!reviewId || !status || !["approved", "rejected"].includes(status)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
    const updated = moderateReview(reviewId, status);
    if (!updated)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(
      { success: true, review: updated },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to moderate review" },
      { status: 500 }
    );
  }
}
