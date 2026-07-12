"use client";

import { useState, useTransition } from "react";
import { Ban, CheckCircle2 } from "lucide-react";
import { setUserBanned } from "@/lib/actions/user";
// import { setUserBanned } from "@/lib/actions/users";

export default function UserBanToggle({ userId, initialBanned }: { userId: string; initialBanned: boolean }) {
  const [banned, setBanned] = useState(initialBanned);
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = !banned;
    setBanned(next);

    startTransition(async () => {
      try {
        await setUserBanned(userId, next);
      } catch {
        setBanned(!next);
      }
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition disabled:opacity-60 ${
        banned
          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          : "border-gray-200 text-slate-600 hover:bg-slate-50"
      }`}
    >
      {banned ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
      {banned ? "Unban" : "Ban"}
    </button>
  );
}