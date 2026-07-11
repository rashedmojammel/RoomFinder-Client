"use client";

import { CalendarCheck, ShieldAlert } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Listing } from "@/types/listing";

interface BookRoomButtonProps {
  listing: Listing;
}

export default function BookRoomButton({ listing }: BookRoomButtonProps) {
  const { data: session, isPending } = useSession();

  const currentUserId = session?.user?.id;
  const isOwner = Boolean(currentUserId && currentUserId === listing.ownerId);

  const handleBook = () => {
    // Replace with a real booking flow once bookings exist on the backend
    alert(`Booking request sent for "${listing.title}"`);
  };

  const isDisabled = isPending || !listing.isAvailable || isOwner;

  const label = isPending
    ? "Loading…"
    : isOwner
      ? "This is your listing"
      : !listing.isAvailable
        ? "Currently Unavailable"
        : "Request to Book";

  return (
    <>
      {/* Inline button (desktop sidebar) */}
      <div className="hidden md:block">
        <button
          onClick={handleBook}
          disabled={isDisabled}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {isOwner ? <ShieldAlert className="h-4 w-4" /> : <CalendarCheck className="h-4 w-4" />}
          {label}
        </button>

        {isOwner && (
          <p className="mt-2 text-center text-xs text-slate-400">
            You listed this room, so you can&apos;t book it yourself.
          </p>
        )}
      </div>

      {/* Sticky mobile bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-gray-100 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <p className="text-base font-bold text-slate-900">
          ৳{listing.rentPerMonth.toLocaleString()}
          <span className="text-sm font-medium text-slate-500"> /month</span>
        </p>
        <button
          onClick={handleBook}
          disabled={isDisabled}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isOwner ? <ShieldAlert className="h-4 w-4" /> : <CalendarCheck className="h-4 w-4" />}
          {isOwner ? "Your listing" : listing.isAvailable ? "Book Now" : "Unavailable"}
        </button>
      </div>
    </>
  );
}