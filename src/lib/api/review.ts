// import { serverFetch } from "@/lib/fetch";
import { ReviewsResponse } from "@/types/review";
import { serverFetch } from "../core/server";

export async function getListingReviews(listingId: string): Promise<ReviewsResponse> {
  try {
    return await serverFetch<ReviewsResponse>(`/api/reviews/listing/${listingId}`);
  } catch {
    return { reviews: [], average: 0, count: 0 };
  }
}