"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

const titleMap: Record<string, string> = {
  admin: "Admin Overview",
  owner: "Owner Overview",
  tenant: "Tenant Overview",
  users: "Manage Users",
  listings: "Manage Listings",
  analytics: "Analytics",
  settings: "Settings",
  "add-listing": "Add Listing",
  requests: "Booking Requests",
  saved: "Saved Rooms",
  bookings: "My Bookings",
  profile: "Profile",
};

function getTitle(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  return titleMap[last] ?? "Dashboard";
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Guard: bounce unauthenticated visitors out of the dashboard
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/auth/signin");
    }
  }, [isPending, session, router]);

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (isPending || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((v) => !v)}
      />

      <div className={`transition-all duration-300 ${isCollapsed ? "md:pl-[88px]" : "md:pl-[280px]"}`}>
        <DashboardNavbar title={getTitle(pathname)} onMenuClick={() => setIsMobileOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}