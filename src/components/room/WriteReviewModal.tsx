"use client";

import { useState } from "react";
import { Modal, Label, TextArea } from "@heroui/react";
import { X, PencilLine, Loader2 } from "lucide-react";
import { submitReview } from "@/lib/actions/review";
import StarRating from "@/components/room/StarRating";
import { Review } from "@/types/review";

interface WriteReviewModalProps {
  listingId: string;
  tenantId: string;
  tenantName: string;
  existingReview: Review | null;
}

export default function WriteReviewModal({
  listingId,
  tenantId,
  tenantName,
  existingReview,
}: WriteReviewModalProps) {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [comment, setComment] = useState(existingReview?.comment ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (close: () => void) => {
    setError(null);

    if (rating < 1) {
      setError("Please select a star rating.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitReview({
        listingId,
        tenantId,
        tenantName,
        rating,
        comment: comment.trim() || undefined,
      });
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal>
      <Modal.Trigger className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
        <PencilLine className="h-4 w-4" />
        {existingReview ? "Edit your review" : "Write a review"}
      </Modal.Trigger>

      <Modal.Backdrop className="bg-slate-900/50">
        <Modal.Container placement="center" scroll="inside" size="md">
          <Modal.Dialog className="w-full max-w-md rounded-2xl border border-gray-100 bg-white shadow-xl">
            {({ close }) => (
              <>
                <Modal.Header className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                  <Modal.Heading className="text-lg font-bold text-slate-900">
                    {existingReview ? "Edit your review" : "Write a review"}
                  </Modal.Heading>
                  <button
                    onClick={close}
                    aria-label="Close"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 hover:rotate-90"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Modal.Header>

                <Modal.Body className="space-y-4 p-6">
                  {error && (
                    <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <div>
                    <Label className="mb-2 block text-sm font-medium text-slate-700">Your rating</Label>
                    <StarRating value={rating} onChange={setRating} size={28} />
                  </div>

                  <div>
                    <Label htmlFor="review-comment" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Comment <span className="font-normal text-slate-400">(optional)</span>
                    </Label>
                    <TextArea
                      id="review-comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      placeholder="How was your experience with this room?"
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors focus-visible:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-100"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSubmit(close)}
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Submitting…" : existingReview ? "Update Review" : "Submit Review"}
                  </button>
                </Modal.Body>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}