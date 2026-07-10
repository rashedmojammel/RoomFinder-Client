"use client";

import { CalendarCheck } from "lucide-react";
import { Room } from "@/types/room";

interface BookRoomButtonProps {
  room: Room;
}

export default function BookRoomButton({ room }: BookRoomButtonProps) {
  const handleBook = () => {
    // Replace with real booking flow (e.g. open a modal or navigate to /book/[id])
    alert(`Booking request sent for "${room.title}"`);
  };

  return (
    <>
      {/* Inline button (desktop sidebar) */}
      <button
        onClick={handleBook}
        disabled={!room.available}
        className="hidden w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 md:flex"
      >
        <CalendarCheck className="h-4 w-4" />
        {room.available ? "Request to Book" : "Currently Unavailable"}
      </button>

      {/* Sticky mobile bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-gray-100 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div>
          <p className="text-base font-bold text-slate-900">
            ৳{room.price.toLocaleString()}
            <span className="text-sm font-medium text-slate-500"> /month</span>
          </p>
        </div>
        <button
          onClick={handleBook}
          disabled={!room.available}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CalendarCheck className="h-4 w-4" />
          {room.available ? "Book Now" : "Unavailable"}
        </button>
      </div>
    </>
  );
}