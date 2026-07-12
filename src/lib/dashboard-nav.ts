import { Role } from "@/types/user";
import {
  LayoutDashboard,
  Users,
  Building2,
  BarChart3,
  Settings,
  PlusCircle,
  ClipboardList,
  UserRound,
  Search,
  Heart,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
// import type { Role } from "@/types/user";

export type { Role };

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Where the "Dashboard" button/link should point for each role
export const roleDashboardPath: Record<Role, string> = {
  admin: "/dashboard/admin",
  owner: "/dashboard/owner",
  tenant: "/dashboard/tenant",
};

// Where the navbar/sidebar "Profile" / account link should point for each role
export const roleProfilePath: Record<Role, string> = {
  admin: "/dashboard/admin/settings",
  owner: "/dashboard/owner/profile",
  tenant: "/dashboard/tenant/profile",
};

export const dashboardNav: Record<Role, DashboardNavItem[]> = {
  admin: [
    { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
    { href: "/dashboard/admin/listings", label: "Manage Listings", icon: Building2 },
    { href: "/dashboard/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
  ],
  owner: [
    { href: "/dashboard/owner", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/owner/add-listing", label: "Add Listing", icon: PlusCircle },
    { href: "/dashboard/owner/listings", label: "My Listings", icon: Building2 },
    { href: "/dashboard/owner/bookings", label: "Booking Requests", icon: ClipboardList },
    { href: "/dashboard/owner/profile", label: "Profile", icon: UserRound },
  ],
  tenant: [
    { href: "/dashboard/tenant", label: "Dashboard", icon: LayoutDashboard },
    { href: "/find-room", label: "Find Room", icon: Search },
    { href: "/dashboard/tenant/saved", label: "Saved Rooms", icon: Heart },
    { href: "/dashboard/tenant/bookings", label: "My Bookings", icon: CalendarCheck },
    { href: "/dashboard/tenant/profile", label: "Profile", icon: UserRound },
  ],
};

/** Narrows Better Auth's loose `userRole` string into a safe Role, defaulting to tenant. */
export function getRole(userRole?: string | null): Role {
  if (userRole === "admin" || userRole === "owner" || userRole === "tenant") return userRole;
  return "tenant";
}