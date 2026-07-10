"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NavLink {
    href: string;
    label: string;
}

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    const navLinks: NavLink[] = [
        { href: "/", label: "Home" },
        { href: "/rooms", label: "Find Rooms" },
        { href: "/properties", label: "Properties" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">

                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link href="/">
                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 flex items-center justify-center shadow-lg">
                                <span className="text-2xl">🏠</span>
                            </div>

                            <div>
                                <h1 className="text-3xl font-black bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
                                    RoomFinder
                                </h1>

                                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400">
                                    Find • Stay • Live
                                </p>
                            </div>

                        </div>
                    </Link>


                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-2 bg-gray-50/80 border border-gray-100 rounded-full px-3 py-2 shadow-inner">

                        {navLinks.map((link: NavLink) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="
                    px-5 py-2 rounded-full
                    text-sm font-semibold
                    text-gray-600
                    hover:bg-white
                    hover:text-blue-600
                    transition-all duration-300
                  "
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}

                    </ul>


                    {/* Right Side */}
                    <div className="flex items-center gap-3">

                        <Link
                            href="/login"
                            className="
                hidden md:flex
                px-5 py-2.5
                rounded-full
                border border-gray-200
                bg-white
                text-gray-700
                text-sm
                font-semibold
                hover:border-blue-300
                hover:text-blue-600
                hover:shadow-md
                transition-all duration-300
              "
                        >
                            Login
                        </Link>


                        <Link
                            href="/post-room"
                            className="
                hidden md:flex
                px-6 py-2.5
                rounded-full
                bg-gradient-to-r
                from-blue-500
                via-cyan-500
                to-teal-400
                text-white
                text-sm
                font-semibold
                shadow-lg
                hover:scale-105
                transition-all duration-300
              "
                        >
                            Post Your Room
                        </Link>


                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                            className="
                md:hidden
                w-10 h-10
                rounded-xl
                border border-gray-200
                flex items-center justify-center
                bg-white
              "
                        >
                            {mobileMenuOpen ? "✕" : "☰"}
                        </button>

                    </div>

                </div>


                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-6 border-t border-gray-100">

                        <div className="flex flex-col gap-2 pt-4">

                            {navLinks.map((link: NavLink) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="
                    px-4 py-3.5
                    rounded-2xl
                    font-medium
                    text-gray-700
                    hover:bg-gray-50
                  "
                                >
                                    {link.label}
                                </Link>
                            ))}


                            <div className="h-px bg-gray-100 my-2" />


                            <Link
                                href="/login"
                                className="
                  px-4 py-3.5
                  rounded-2xl
                  border border-gray-200
                  text-center
                  font-medium
                "
                            >
                                Login
                            </Link>


                            <Link
                                href="/post-room"
                                className="
                  px-4 py-3.5
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-500
                  via-cyan-500
                  to-teal-400
                  text-white
                  text-center
                  font-semibold
                "
                            >
                                Post Your Room
                            </Link>


                        </div>

                    </div>
                )}

            </div>
        </nav>
    );
};

export default Navbar;