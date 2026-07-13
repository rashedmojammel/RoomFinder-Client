export interface Review {
  _id: string;
  listingId: string;
  tenantId: string;
  tenantName: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewInput {
  listingId: string;
  tenantId: string;
  tenantName: string;
  rating: number;
  comment?: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  average: number;
  count: number;
}