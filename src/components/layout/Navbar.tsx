"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { ChevronDown } from "lucide-react";
import { getRole, roleDashboardPath } from "@/lib/dashboard-nav";

interface NavLink {
  href: string;
  label: string;
}

const baseNavLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/find-room", label: "Find Rooms" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
];

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { data: session, isPending } = useSession();

  const user = session?.user;
  const isLoggedIn = !!user;
  const role = getRole(user?.userRole);

  // Dashboard only shows up in the nav once the user is actually logged in
  const navLinks: NavLink[] = isLoggedIn
    ? [...baseNavLinks, { href: roleDashboardPath[role], label: "Dashboard" }]
    : baseNavLinks;

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 flex items-center justify-center shadow-lg">
                🏠
              </div>

              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
                  RoomFinder
                </h1>

                <p className="text-[10px] tracking-[0.35em] uppercase text-gray-400">
                  Find • Stay • Live
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-3 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-5 py-2 rounded-full text-sm font-semibold text-gray-600 hover:bg-white hover:text-blue-600 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            ) : !isLoggedIn ? (
              <>
                <Link
                  href="/auth/signin"
                  className="hidden md:flex px-5 py-2.5 rounded-full border border-gray-200 text-sm font-semibold hover:border-blue-400 hover:text-blue-600 transition"
                >
                  Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="hidden md:flex px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white text-sm font-semibold shadow-lg hover:scale-105 transition"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div ref={dropdownRef} className="relative hidden md:block">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-2 py-1.5 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={user.image || "https://i.pravatar.cc/100"}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{role}</p>
                  </div>

                  <ChevronDown size={16} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-3">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl border border-gray-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
              {isPending ? null : !isLoggedIn ? (
                <>
                  <Link
                    href="/auth/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl border border-gray-200 text-center text-sm font-semibold hover:border-blue-400 hover:text-blue-600 transition"
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white text-center text-sm font-semibold shadow-lg"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <img
                      src={user?.image || "https://i.pravatar.cc/100"}
                      alt="profile"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{role}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="px-4 py-3 rounded-xl text-center text-sm font-semibold text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;