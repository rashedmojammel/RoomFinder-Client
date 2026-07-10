"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, LogOut, X } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { dashboardNav, getRole } from "@/lib/dashboard-nav";

interface DashboardSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function DashboardSidebar({
  isMobileOpen,
  onMobileClose,
  isCollapsed,
  onToggleCollapse,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;
  const role = getRole(user?.userRole);
  const navItems = dashboardNav[role];
  const rootHref = `/dashboard/${role}`;

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  const isActive = (href: string) =>
    pathname === href || (href !== rootHref && pathname.startsWith(`${href}/`));

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 py-6 ${isCollapsed ? "justify-center px-0" : ""}`}>
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 text-lg shadow-md">
          🏠
        </div>
        {!isCollapsed && (
          <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 bg-clip-text text-xl font-black text-transparent">
            RoomFinder
          </span>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle - desktop only */}
      <button
        onClick={onToggleCollapse}
        className="mx-3 mb-2 hidden items-center justify-center gap-2 rounded-xl border border-gray-100 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-50 md:flex"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        {!isCollapsed && "Collapse"}
      </button>

      {/* Profile + logout */}
      <div className={`border-t border-gray-100 p-3 ${isCollapsed ? "px-2" : ""}`}>
        <div className={`flex items-center gap-3 rounded-xl p-2 ${isCollapsed ? "justify-center" : ""}`}>
          <img
            src={user?.image || "https://i.pravatar.cc/100"}
            alt="profile"
            className="h-9 w-9 flex-shrink-0 rounded-full object-cover"
          />
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">{user?.name}</p>
              <p className="text-xs capitalize text-slate-400">{role}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className={`mt-1 flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 88 : 280 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 z-30 hidden border-r border-gray-100 bg-white md:block"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl md:hidden"
            >
              <button
                onClick={onMobileClose}
                className="absolute right-4 top-6 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}