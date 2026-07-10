"use client";

import { Activity, AlertCircle, Building2, Users } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import StatCard from "@/components/dashboard/StatCard";

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "Admin";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Welcome back, {firstName}</h2>
        <p className="mt-1 text-sm text-slate-500">Here's what's happening across RoomFinder today.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value="1,284" icon={Users} trend="+42 this week" />
        <StatCard label="Active Listings" value="356" icon={Building2} trend="+18 this week" />
        <StatCard label="Pending Reviews" value="12" icon={AlertCircle} />
        <StatCard label="Platform Activity" value="94%" icon={Activity} trend="Healthy" />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
        <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
        <p className="mt-2 text-sm text-slate-500">
          Wire this section up to your activity/audit-log API to surface recent signups, new
          listings, and flagged reports.
        </p>
      </div>
    </div>
  );
}