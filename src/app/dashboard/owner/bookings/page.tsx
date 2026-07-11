import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
// import { getUserSession } from "@/lib/session";
import { getOwnerBookings } from "@/lib/api/bookings";
import BookingStatusBadge from "@/components/dashboard/BookingStatusBadge";
import BookingActionButtons from "@/components/dashboard/BookingActionButtons";
import { getUserSession } from "@/lib/core/session";
// import BookingActionButtons from "@/components/dashboard/owner/BookingActionButtons";

export default async function OwnerBookingsPage() {
  const user = await getUserSession();
  if (!user) redirect("/sign-in");

  const bookings = await getOwnerBookings(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Booking Requests</h2>
        <p className="mt-1 text-sm text-slate-500">Approve or decline tenant requests for your listings.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-md">
          <p className="text-slate-500">No booking requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-md sm:flex-row sm:items-center">
              <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {booking.listing?.images[0] && (
                  <Image src={booking.listing.images[0]} alt={booking.listing.title} fill sizes="112px" className="object-cover" />
                )}
              </div>

              <div className="flex-1">
                <Link href={`/find-room/${booking.listingId}`} className="font-semibold text-slate-900 hover:text-cyan-600">
                  {booking.listing?.title ?? "Listing"}
                </Link>
                <p className="mt-1 text-sm text-slate-500">Requested by tenant ID: {booking.tenantId}</p>
                {booking.message && <p className="mt-1 text-sm text-slate-500">&ldquo;{booking.message}&rdquo;</p>}
              </div>

              <div className="flex items-center gap-3">
                <BookingStatusBadge status={booking.status} />
                {booking.status === "pending" && <BookingActionButtons bookingId={booking._id} ownerId={user.id} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}