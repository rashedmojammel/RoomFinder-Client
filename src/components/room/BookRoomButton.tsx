"use client";

import { useState } from "react";
import { CalendarCheck, ShieldAlert, Clock, CheckCircle2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Listing } from "@/types/listing";
import { BookingStatus } from "@/types/booking";
import BookingRequestModal from "@/components/room/BookingRequestModal";

interface BookRoomButtonProps {
  listing: Listing;
  initialStatus?: BookingStatus | null;
}

export default function BookRoomButton({ listing, initialStatus = null }: BookRoomButtonProps) {
  const { data: session, isPending: isSessionLoading } = useSession();
  const [status, setStatus] = useState<BookingStatus | null>(initialStatus);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUserId = session?.user?.id;
  const isOwner = Boolean(currentUserId && currentUserId === listing.ownerId);

  const openModal = () => {
    if (!currentUserId) {
      setError("Please sign in to request a booking.");
      return;
    }
    setError(null);
    setShowModal(true);
  };

  const isDisabled =
  isSessionLoading ||
  !listing.isAvailable ||
  listing.approvalStatus !== "approved" ||
  isOwner ||
  status === "pending" ||
  status === "approved";

  let label = "Request to Book";
  let Icon = CalendarCheck;

  if (isSessionLoading) label = "Loading…";
  else if (isOwner) {
    label = "This is your listing";
    Icon = ShieldAlert;
  } else if (!listing.isAvailable) label = "Currently Unavailable";
  else if (status === "pending") {
    label = "Request Sent — Awaiting Owner";
    Icon = Clock;
  } else if (status === "approved") {
    label = "Booking Approved";
    Icon = CheckCircle2;
  }

  return (
    <>
      <div className="hidden md:block">
        <button
          onClick={openModal}
          disabled={isDisabled}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>

        {isOwner && (
          <p className="mt-2 text-center text-xs text-slate-400">You listed this room, so you can&apos;t book it yourself.</p>
        )}
        {status === "rejected" && (
          <p className="mt-2 text-center text-xs text-slate-400">Your previous request was declined. You can send a new one.</p>
        )}
        {error && <p className="mt-2 text-center text-xs text-red-500">{error}</p>}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-gray-100 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <p className="text-base font-bold text-slate-900">
          ৳{listing.rentPerMonth.toLocaleString()}
          <span className="text-sm font-medium text-slate-500"> /month</span>
        </p>
        <button
          onClick={openModal}
          disabled={isDisabled}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon className="h-4 w-4" />
          {isOwner ? "Your listing" : label}
        </button>
      </div>

      {showModal && currentUserId && (
        <BookingRequestModal
          listingId={listing._id}
          tenantId={currentUserId}
          defaultName={session?.user?.name ?? ""}
          onClose={() => setShowModal(false)}
          onSuccess={(newStatus) => {
            setStatus(newStatus);
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}