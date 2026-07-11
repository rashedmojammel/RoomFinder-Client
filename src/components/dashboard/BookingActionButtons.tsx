"use client";

import { useState, useTransition } from "react";
import { Check, X } from "lucide-react";
import { updateBookingStatus } from "@/lib/actions/bookings";

export default function BookingActionButtons({ bookingId, ownerId }: { bookingId: string; ownerId: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const act = (status: "approved" | "rejected") => {
    startTransition(async () => {
      try {
        await updateBookingStatus(bookingId, status, ownerId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update");
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex gap-2">
        <button
          onClick={() => act("approved")}
          disabled={isPending}
          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:scale-[1.02] disabled:opacity-60"
        >
          <Check className="h-3.5 w-3.5" />
          Approve
        </button>
        <button
          onClick={() => act("rejected")}
          disabled={isPending}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
        >
          <X className="h-3.5 w-3.5" />
          Decline
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}