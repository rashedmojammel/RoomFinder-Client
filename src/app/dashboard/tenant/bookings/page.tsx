import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
// import { getUserSession } from "@/lib/session";
import { getTenantBookings } from "@/lib/api/bookings";
import BookingStatusBadge from "@/components/dashboard/BookingStatusBadge";
import CancelBookingButton from "@/components/dashboard/tenant/CancelBookingButton";
import { getUserSession } from "@/lib/core/session";

export default async function TenantBookingsPage() {
  const user = await getUserSession();
  if (!user) redirect("/sign-in");

  const bookings = await getTenantBookings(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">My Booking Requests</h2>
        <p className="mt-1 text-sm text-slate-500">Track the status of the rooms you&apos;ve requested to book.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-md">
          <p className="text-slate-500">You haven&apos;t requested any rooms yet.</p>
          <Link href="/find-room" className="mt-3 inline-block text-sm font-semibold text-cyan-600 hover:text-cyan-700">
            Browse rooms →
          </Link>
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
                  {booking.listing?.title ?? "Listing no longer available"}
                </Link>
                <p className="mt-1 text-sm text-slate-500">৳{booking.listing?.rentPerMonth.toLocaleString() ?? "—"} / month</p>
                {booking.message && <p className="mt-1 text-sm text-slate-500">&ldquo;{booking.message}&rdquo;</p>}
              </div>

              <div className="flex items-center gap-3">
                <BookingStatusBadge status={booking.status} />
                {booking.status === "pending" && <CancelBookingButton bookingId={booking._id} tenantId={user.id} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}