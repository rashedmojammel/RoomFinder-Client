"use client";

import { useState, useTransition } from "react";
import { Trash2, User } from "lucide-react";
import StarRating from "@/components/room/StarRating";
import { deleteReview } from "@/lib/actions/review";
import { Review } from "@/types/review";

interface ReviewsListProps {
  reviews: Review[];
  currentUserId?: string;
  isAdmin?: boolean;
  listingId: string;
}

export default function ReviewsList({ reviews, currentUserId, isAdmin = false, listingId }: ReviewsListProps) {
  const [items, setItems] = useState(reviews);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (reviewId: string) => {
    startTransition(async () => {
      try {
        await deleteReview(reviewId, currentUserId ?? "", isAdmin, listingId);
        setItems((prev) => prev.filter((r) => r._id !== reviewId));
      } catch {
        // silently ignore — revalidatePath will correct state on next navigation
      }
    });
  };

  if (items.length === 0) {
    return <p className="text-sm text-slate-500">No reviews yet — be the first to share your experience.</p>;
  }

  return (
    <div className="space-y-5">
      {items.map((review) => {
        const canDelete = isAdmin || review.tenantId === currentUserId;

        return (
          <div key={review._id} className="border-b border-gray-100 pb-5 last:border-b-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{review.tenantName}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {canDelete && (
                <button
                  onClick={() => handleDelete(review._id)}
                  disabled={isPending}
                  aria-label="Delete review"
                  className="text-slate-300 transition hover:text-red-500 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="mt-2">
              <StarRating value={review.rating} readOnly size={16} />
            </div>

            {review.comment && <p className="mt-2 text-sm leading-relaxed text-slate-600">{review.comment}</p>}
          </div>
        );
      })}
    </div>
  );
}