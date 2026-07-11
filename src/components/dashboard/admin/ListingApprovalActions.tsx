"use client";

import { useState, useTransition } from "react";
import { Check, X } from "lucide-react";
import { updateListingApproval } from "@/lib/actions/listing";

export default function ListingApprovalActions({ listingId }: { listingId: string }) {
  const [isPending, startTransition] = useTransition();
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  const approve = () => {
    startTransition(async () => {
      try {
        await updateListingApproval(listingId, "approved");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to approve");
      }
    });
  };

  const reject = () => {
    startTransition(async () => {
      try {
        await updateListingApproval(listingId, "rejected", reason.trim() || undefined);
        setShowReasonInput(false);
        setReason("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to reject");
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-2">
      {!showReasonInput ? (
        <div className="flex gap-2">
          <button
            onClick={approve}
            disabled={isPending}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:scale-[1.02] disabled:opacity-60"
          >
            <Check className="h-3.5 w-3.5" />
            Approve
          </button>
          <button
            onClick={() => setShowReasonInput(true)}
            disabled={isPending}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
          >
            <X className="h-3.5 w-3.5" />
            Reject
          </button>
        </div>
      ) : (
        <div className="w-64 space-y-2">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for rejection (optional)"
            rows={2}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowReasonInput(false)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={reject}
              disabled={isPending}
              className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
            >
              {isPending ? "Rejecting…" : "Confirm Reject"}
            </button>
          </div>
        </div>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}