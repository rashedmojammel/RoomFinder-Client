"use client";

import Link from "next/link";
import { CalendarCheck, Heart, MapPin, Search } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import StatCard from "@/components/dashboard/StatCard";
// import StatCard from "@/components/dashboard/StatCard";

export default function TenantDashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "there";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Welcome back, {firstName}</h2>
        <p className="mt-1 text-sm text-slate-500">Pick up where you left off finding your next room.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Saved Rooms" value="6" icon={Heart} />
        <StatCard label="Active Bookings" value="1" icon={CalendarCheck} />
        <StatCard label="Rooms Viewed" value="24" icon={MapPin} trend="This month" />
        <StatCard label="New Matches" value="9" icon={Search} trend="Since last visit" />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
        <h3 className="text-lg font-bold text-slate-900">Continue your search</h3>
        <p className="mt-2 text-sm text-slate-500">Browse verified rooms that match your budget and area.</p>
        <Link
          href="/find-room"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02]"
        >
          Find Room
        </Link>
      </div>
    </div>
  );
}