"use client";

import { useState, useTransition } from "react";
import { X } from "lucide-react";
import { updateBookingStatus } from "@/lib/actions/bookings";

export default function CancelBookingButton({ bookingId, tenantId }: { bookingId: string; tenantId: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCancel = () => {
    startTransition(async () => {
      try {
        await updateBookingStatus(bookingId, "cancelled", tenantId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to cancel");
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleCancel}
        disabled={isPending}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
      >
        <X className="h-3.5 w-3.5" />
        {isPending ? "Cancelling…" : "Cancel"}
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}