"use client";

import { useState } from "react";
import { X, Loader2, Send } from "lucide-react";
import { createBooking } from "@/lib/actions/bookings";
import { BookingStatus } from "@/types/booking";

interface BookingRequestModalProps {
  listingId: string;
  tenantId: string;
  defaultName?: string;
  onClose: () => void;
  onSuccess: (status: BookingStatus) => void;
}

export default function BookingRequestModal({
  listingId,
  tenantId,
  defaultName = "",
  onClose,
  onSuccess,
}: BookingRequestModalProps) {
  const [tenantName, setTenantName] = useState(defaultName);
  const [tenantPhone, setTenantPhone] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!tenantName.trim() || !tenantPhone.trim()) {
      setError("Please provide your name and phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const booking = await createBooking({
        listingId,
        tenantId,
        tenantName: tenantName.trim(),
        tenantPhone: tenantPhone.trim(),
        moveInDate: moveInDate || undefined,
        message: message.trim() || undefined,
      });
      onSuccess(booking.status);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send booking request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Request to Book</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mb-5 text-sm text-slate-500">
          Share a few details so the owner can review your request and get in touch.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Full name *</label>
            <input
              type="text"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone number *</label>
            <input
              type="tel"
              value={tenantPhone}
              onChange={(e) => setTenantPhone(e.target.value)}
              placeholder="+880 1XXX-XXXXXX"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Preferred move-in date <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Message to owner <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Anything the owner should know — occupants, timeline, questions…"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {isSubmitting ? "Sending…" : "Send Request"}
          </button>
        </form>
      </div>
    </div>
  );
}