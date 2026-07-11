"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { saveRoom, unsaveRoom } from "@/lib/actions/savedRooms";

interface SaveRoomButtonProps {
  tenantId: string;
  listingId: string;
  initialSaved: boolean;
}

export default function SaveRoomButton({ tenantId, listingId, initialSaved }: SaveRoomButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const next = !saved;
    setSaved(next); // optimistic

    startTransition(async () => {
      try {
        if (next) {
          await saveRoom(tenantId, listingId);
        } else {
          await unsaveRoom(tenantId, listingId);
        }
      } catch {
        setSaved(!next); // revert on failure
      }
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      aria-label={saved ? "Remove from saved rooms" : "Save room"}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition-transform duration-300 hover:scale-105 disabled:opacity-60"
    >
      <Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
    </button>
  );
}