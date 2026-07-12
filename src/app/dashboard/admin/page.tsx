import Link from "next/link";
import { Users, Building2, ClipboardList, Clock } from "lucide-react";
// import { getAllUsers } from "@/lib/api/users";
import { getAllListingsAdmin } from "@/lib/api/listing";
// import { getAllBookings } from "@/lib/api/bookings";
import StatCard from "@/components/dashboard/StatCard";
import ListingStatusBadge from "@/components/dashboard/ListingStatusBadge";
import { getAllUsers } from "@/lib/api/user";
import { getAllBookings } from "@/lib/actions/bookings";

export default async function AdminDashboardPage() {
  const [users, listings, bookings] = await Promise.all([
    getAllUsers(),
    getAllListingsAdmin(),
    getAllBookings(),
  ]);

  const pendingListings = listings.filter((l) => l.approvalStatus === "pending");
  const owners = users.filter((u) => u.role === "owner").length;
  const tenants = users.filter((u) => u.role === "tenant").length;
  const pendingBookings = bookings.filter((b) => b.status === "pending");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Admin Overview</h2>
        <p className="mt-1 text-sm text-slate-500">Platform-wide activity at a glance.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={String(users.length)} icon={Users} trend={`${owners} owners · ${tenants} tenants`} />
        <StatCard
          label="Total Listings"
          value={String(listings.length)}
          icon={Building2}
          trend={pendingListings.length > 0 ? `${pendingListings.length} pending` : undefined}
        />
        <StatCard
          label="Total Bookings"
          value={String(bookings.length)}
          icon={ClipboardList}
          trend={pendingBookings.length > 0 ? `${pendingBookings.length} pending` : undefined}
        />
        <StatCard label="Pending Review" value={String(pendingListings.length)} icon={Clock} />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Listings Awaiting Approval</h3>
          <Link href="/dashboard/admin/listings?status=pending" className="text-sm font-semibold text-cyan-600 hover:text-cyan-700">
            Review all →
          </Link>
        </div>

        {pendingListings.length === 0 ? (
          <p className="text-sm text-slate-500">Nothing waiting for review.</p>
        ) : (
          <div className="space-y-3">
            {pendingListings.slice(0, 5).map((listing) => (
              <div key={listing._id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-sm font-medium text-slate-900">{listing.title}</p>
                <ListingStatusBadge status={listing.approvalStatus} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}