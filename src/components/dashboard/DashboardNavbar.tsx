"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { getRole, roleProfilePath } from "@/lib/dashboard-nav";

interface DashboardNavbarProps {
  title: string;
  onMenuClick: () => void;
}

export default function DashboardNavbar({ title, onMenuClick }: DashboardNavbarProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const role = getRole(user?.userRole);

  const [isDark, setIsDark] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Assumes tailwind.config darkMode: "class". Swap for next-themes if you add it later.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h1>
        </div>

        <div className="hidden max-w-md flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 md:flex">
          <Search className="h-4 w-4 flex-shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsDark((v) => !v)}
            aria-label="Toggle dark mode"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-slate-500 transition-colors hover:bg-slate-50"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-slate-500 transition-colors hover:bg-slate-50"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-500" />
          </button>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-gray-200 py-1 pl-1 pr-2 transition-shadow hover:shadow-md"
            >
              <img
                src={user?.image || "https://i.pravatar.cc/100"}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
                <div className="px-3 py-2">
                  <p className="truncate text-sm font-semibold text-slate-800">{user?.name}</p>
                  <p className="text-xs capitalize text-slate-400">{role}</p>
                </div>
                <Link
                  href={roleProfilePath[role]}
                  onClick={() => setDropdownOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}