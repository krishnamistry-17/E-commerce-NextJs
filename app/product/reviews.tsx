"use client";

import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "@/lib/axios";
import { apiRoutes } from "@/app/api/apiRoutes";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import mixpanelInstance from "@/lib/mixPanel";

type Review = {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  title?: string;
  body?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  user?: { email?: string };
};

export default function Reviews({ productId }: { productId: string }) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const canSubmit = useMemo(
    () => rating >= 1 && rating <= 5 && body.trim().length >= 5,
    [rating, body]
  );

  useEffect(() => {
    let mounted = true;
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get(apiRoutes.GET_REVIEWS(productId));
        if (!mounted) return;
        const {
          reviews: list = [],
          avgRating = 0,
          reviewCount = 0,
        } = res.data || {};
        setReviews(list);
        setAvgRating(avgRating);
        setReviewCount(reviewCount);
      } catch (e) {
        if (!mounted) return;
        setError("Failed to load reviews");
      }
    };
    fetchReviews();
    return () => {
      mounted = false;
    };
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("Please sign in to submit a review");
      return;
    }
    if (!canSubmit) return;
    setIsSubmitting(true);
    setError("");
    try {
      await axiosInstance.post(apiRoutes.CREATE_REVIEW, {
        productId,
        rating,
        title: title.trim(),
        body: body.trim(),
      });
      setRating(0);
      setTitle("");
      setBody("");
      try {
        mixpanelInstance.track("review_submit", { productId, rating });
      } catch {}
      // refetch
      const res = await axiosInstance.get(apiRoutes.GET_REVIEWS(productId));
      const {
        reviews: list = [],
        avgRating = 0,
        reviewCount = 0,
      } = res.data || {};
      setReviews(list);
      setAvgRating(avgRating);
      setReviewCount(reviewCount);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mt-8 border border-productborder rounded-[15px] p-5">
      <div className="flex items-center justify-between">
        <p className="text-[24px] font-quick-bold-700 text-regalblue">
          Customer Reviews
        </p>
        <p className="text-[14px] text-bgbrown">
          {avgRating.toFixed(1)} / 5 • {reviewCount} reviews
        </p>
      </div>

      <div className="mt-4 space-y-4">
        {reviews.length === 0 ? (
          <p className="text-bgbrown text-sm">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div
              key={r._id}
              className="border border-bggray rounded-[10px] p-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-shopbtn font-quick-bold-700">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(Math.max(0, 5 - r.rating))}
                </div>
                <div className="text-xs text-bgbrown">
                  {new Date(r.createdAt).toLocaleDateString()}
                </div>
              </div>
              {r.title && (
                <p className="text-regalblue font-semibold mt-1">{r.title}</p>
              )}
              {r.body && <p className="text-bgbrown text-sm mt-1">{r.body}</p>}
              {r.user?.email && (
                <p className="text-xs text-bgbrown mt-2">by {r.user.email}</p>
              )}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <p className="text-[18px] font-quick-bold-700 text-regalblue">
          Write a review
        </p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex items-center gap-2">
          <label className="text-sm text-bgbrown">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-regalblue bg-white"
          >
            <option value={0}>Select</option>
            <option value={5}>★★★★★</option>
            <option value={4}>★★★★☆</option>
            <option value={3}>★★★☆☆</option>
            <option value={2}>★★☆☆☆</option>
            <option value={1}>★☆☆☆☆</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-regalblue bg-white"
        />
        <textarea
          placeholder="Share your thoughts (min 5 chars)"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-regalblue bg-white"
        />
        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="text-sm text-white bg-shopbtn px-4 py-2 rounded-md disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit review"}
        </button>
        <p className="text-xs text-bgbrown">
          Reviews are published after approval.
        </p>
      </form>
    </div>
  );
}
