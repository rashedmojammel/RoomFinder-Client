"use client";

import { Building2, ClipboardList, Eye, Wallet } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import StatCard from "@/components/dashboard/StatCard";

export default function OwnerDashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "there";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Welcome back, {firstName}</h2>
        <p className="mt-1 text-sm text-slate-500">Track your listings and booking requests at a glance.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="My Listings" value="8" icon={Building2} />
        <StatCard label="Booking Requests" value="5" icon={ClipboardList} trend="2 new" />
        <StatCard label="Profile Views" value="342" icon={Eye} trend="+12% this month" />
        <StatCard label="Monthly Earnings" value="৳68,000" icon={Wallet} />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
        <h3 className="text-lg font-bold text-slate-900">Recent Booking Requests</h3>
        <p className="mt-2 text-sm text-slate-500">
          Wire this section up to your bookings API to show incoming tenant requests here.
        </p>
      </div>
    </div>
  );
}