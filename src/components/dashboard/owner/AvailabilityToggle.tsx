"use client";

import { useState, useTransition } from "react";
import { updateListing } from "@/lib/actions/listing";

export default function AvailabilityToggle({ listingId, initialValue }: { listingId: string; initialValue: boolean }) {
  const [isAvailable, setIsAvailable] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = !isAvailable;
    setIsAvailable(next); // optimistic

    startTransition(async () => {
      try {
        await updateListing(listingId, { isAvailable: next });
      } catch {
        setIsAvailable(!next); // revert on failure
      }
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-300 disabled:opacity-60 ${
        isAvailable ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400" : "bg-slate-200"
      }`}
      aria-label={isAvailable ? "Mark as unavailable" : "Mark as available"}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
          isAvailable ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}