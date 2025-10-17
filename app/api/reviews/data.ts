export type Review = {
  _id: string;
  productId: string;
  userId: string;
  rating: number; // 1-5
  title?: string;
  body?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string; // ISO date
  user?: { email?: string };
};

// In-memory store (resets on server restart). Replace with DB when backend is ready.
const reviewsStore: Review[] = [];

export function listApprovedByProduct(productId: string): Review[] {
  return reviewsStore.filter(
    (r) => r.productId === productId && r.status === "approved"
  );
}

export function listByProductAll(productId: string): Review[] {
  return reviewsStore.filter((r) => r.productId === productId);
}

export function createReview(
  input: Omit<Review, "_id" | "status" | "createdAt"> & {
    status?: Review["status"];
  }
): Review {
  const exists = reviewsStore.find(
    (r) => r.productId === input.productId && r.userId === input.userId
  );
  if (exists) {
    throw new Error("DUPLICATE_REVIEW");
  }
  const now = new Date().toISOString();
  const review: Review = {
    _id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: now,
    status: input.status ?? "pending",
    ...input,
  };
  reviewsStore.push(review);
  return review;
}

export function moderateReview(
  reviewId: string,
  status: "approved" | "rejected"
): Review | null {
  const idx = reviewsStore.findIndex((r) => r._id === reviewId);
  if (idx === -1) return null;
  reviewsStore[idx].status = status;
  return reviewsStore[idx];
}

export function computeAggregate(list: Review[]): {
  avgRating: number;
  reviewCount: number;
} {
  const approved = list.filter((r) => r.status === "approved");
  const reviewCount = approved.length;
  const avgRating =
    reviewCount === 0
      ? 0
      : approved.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewCount;
  return { avgRating, reviewCount };
}
