import { Users, Building2, ClipboardList, TrendingUp } from "lucide-react";
// import { getAllUsers } from "@/lib/api/user";
import { getAllListingsAdmin } from "@/lib/api/listing";
// import { getAllBookings } from "@/lib/api/bookings";
import StatCard from "@/components/dashboard/StatCard";
import { getAllBookings } from "@/lib/actions/bookings";
import { getAllUsers } from "@/lib/api/user";

function BarRow({ label, count, total, colorClass }: { label: string; count: number; total: number; colorClass: string }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">
          {count} ({pct}%)
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default async function AdminAnalyticsPage() {
  const [users, listings, bookings] = await Promise.all([
    getAllUsers(),
    getAllListingsAdmin(),
    getAllBookings(),
  ]);

  const owners = users.filter((u) => u.role === "owner").length;
  const tenants = users.filter((u) => u.role === "tenant").length;
  const admins = users.filter((u) => u.role === "admin").length;

  const pending = listings.filter((l) => l.approvalStatus === "pending").length;
  const approved = listings.filter((l) => l.approvalStatus === "approved").length;
  const rejected = listings.filter((l) => l.approvalStatus === "rejected").length;

  const bookingPending = bookings.filter((b) => b.status === "pending").length;
  const bookingApproved = bookings.filter((b) => b.status === "approved").length;
  const bookingRejected = bookings.filter((b) => b.status === "rejected").length;
  const bookingCancelled = bookings.filter((b) => b.status === "cancelled").length;

  const approvedListings = listings.filter((l) => l.approvalStatus === "approved");
  const avgRent =
    approvedListings.length > 0
      ? Math.round(approvedListings.reduce((sum, l) => sum + l.rentPerMonth, 0) / approvedListings.length)
      : 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Analytics</h2>
        <p className="mt-1 text-sm text-slate-500">Platform activity breakdown.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={String(users.length)} icon={Users} />
        <StatCard label="Total Listings" value={String(listings.length)} icon={Building2} />
        <StatCard label="Total Bookings" value={String(bookings.length)} icon={ClipboardList} />
        <StatCard label="Avg. Approved Rent" value={`৳${avgRent.toLocaleString()}`} icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Users by Role</h3>
          <div className="space-y-4">
            <BarRow label="Tenants" count={tenants} total={users.length} colorClass="bg-gradient-to-r from-blue-500 to-cyan-400" />
            <BarRow label="Owners" count={owners} total={users.length} colorClass="bg-gradient-to-r from-cyan-500 to-teal-400" />
            <BarRow label="Admins" count={admins} total={users.length} colorClass="bg-slate-400" />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Listings by Status</h3>
          <div className="space-y-4">
            <BarRow label="Approved" count={approved} total={listings.length} colorClass="bg-gradient-to-r from-teal-500 to-teal-400" />
            <BarRow label="Pending" count={pending} total={listings.length} colorClass="bg-amber-400" />
            <BarRow label="Rejected" count={rejected} total={listings.length} colorClass="bg-red-400" />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md lg:col-span-2">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Bookings by Status</h3>
          <div className="space-y-4">
            <BarRow label="Pending" count={bookingPending} total={bookings.length} colorClass="bg-amber-400" />
            <BarRow label="Approved" count={bookingApproved} total={bookings.length} colorClass="bg-gradient-to-r from-teal-500 to-teal-400" />
            <BarRow label="Rejected" count={bookingRejected} total={bookings.length} colorClass="bg-red-400" />
            <BarRow label="Cancelled" count={bookingCancelled} total={bookings.length} colorClass="bg-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}