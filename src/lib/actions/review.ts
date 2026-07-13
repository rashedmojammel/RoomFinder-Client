"use server";

import { revalidatePath } from "next/cache";
// import { serverMutation } from "@/lib/fetch";
import { Review, CreateReviewInput } from "@/types/review";
import { serverMutation } from "../core/server";

interface ReviewResponse {
  review: Review;
}

export async function submitReview(data: CreateReviewInput): Promise<Review> {
  const { review } = await serverMutation<ReviewResponse>("/api/reviews", data, "POST");
  revalidatePath(`/find-room/${data.listingId}`);
  return review;
}

export async function deleteReview(reviewId: string, actorId: string, isAdmin = false, listingId?: string) {
  const result = await serverMutation<{ message: string }>(
    `/api/reviews/${reviewId}`,
    { actorId, isAdmin },
    "DELETE"
  );
  if (listingId) revalidatePath(`/find-room/${listingId}`);
  return result.message;
}