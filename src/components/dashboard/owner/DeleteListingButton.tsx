"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteListing } from "@/lib/actions/listing";

export default function DeleteListingButton({ listingId }: { listingId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteListing(listingId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete");
        setConfirming(false);
      }
    });
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500">Delete this listing?</span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-lg bg-red-500 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
        >
          {isPending ? "Deleting…" : "Confirm"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={() => setConfirming(true)}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}