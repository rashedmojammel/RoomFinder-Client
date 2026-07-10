"use client";

import React from "react";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

const Footer = () => {

  const quickLinks: FooterLink[] = [
    { label: "Home", href: "/" },
    { label: "Find Rooms", href: "/rooms" },
    { label: "Properties", href: "/properties" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const supportLinks: FooterLink[] = [
    { label: "Help Center", href: "/help" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "FAQ", href: "/faq" },
  ];


  return (
    <footer className="bg-gray-950 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">


          {/* Brand Section */}
          <div className="space-y-5">

            <Link href="/">
              <div className="flex items-center gap-3">

                <div className="
                  w-12 h-12 
                  rounded-2xl
                  bg-gradient-to-br 
                  from-blue-500 
                  via-cyan-500 
                  to-teal-400
                  flex items-center justify-center
                  shadow-lg
                ">
                  <span className="text-2xl">
                    🏠
                  </span>
                </div>


                <div>
                  <h2 className="
                    text-3xl 
                    font-black
                    bg-gradient-to-r
                    from-blue-400
                    via-cyan-400
                    to-teal-300
                    bg-clip-text
                    text-transparent
                  ">
                    RoomFinder
                  </h2>

                  <p className="text-xs text-gray-400 tracking-widest uppercase">
                    Find • Stay • Live
                  </p>
                </div>

              </div>
            </Link>


            <p className="text-gray-400 text-sm leading-7">
              Find your perfect room with ease. 
              Discover comfortable places, connect with owners, 
              and make your living experience better.
            </p>


            {/* Social Icons */}
            <div className="flex gap-3">

              {["f", "𝕏", "in", "◎"].map((icon) => (
                <button
                  key={icon}
                  className="
                    w-10 h-10
                    rounded-full
                    bg-white/10
                    hover:bg-gradient-to-r
                    hover:from-blue-500
                    hover:to-cyan-500
                    transition-all
                    duration-300
                    flex items-center justify-center
                    font-semibold
                  "
                >
                  {icon}
                </button>
              ))}

            </div>

          </div>



          {/* Quick Links */}
          <div>

            <h3 className="text-lg font-bold mb-5">
              Quick Links
            </h3>


            <ul className="space-y-3">

              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      text-gray-400
                      hover:text-cyan-400
                      transition
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

            </ul>

          </div>



          {/* Support */}
          <div>

            <h3 className="text-lg font-bold mb-5">
              Support
            </h3>


            <ul className="space-y-3">

              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      text-gray-400
                      hover:text-cyan-400
                      transition
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

            </ul>

          </div>



          {/* Contact */}
          <div>

            <h3 className="text-lg font-bold mb-5">
              Contact Us
            </h3>


            <div className="space-y-4 text-gray-400 text-sm">


              <p className="flex gap-3">
                📍 
                <span>
                  Dhaka, Bangladesh
                </span>
              </p>


              <p className="flex gap-3">
                📧
                <span>
                  support@roomfinder.com
                </span>
              </p>


              <p className="flex gap-3">
                ☎️
                <span>
                  +880 1234-567890
                </span>
              </p>


            </div>


          </div>


        </div>



        {/* Bottom Section */}
        <div className="
          border-t
          border-white/10
          mt-12
          pt-8
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-4
        ">


          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} RoomFinder. All rights reserved.
          </p>


          <p className="text-gray-500 text-sm">
            Made with ❤️ for better living
          </p>


        </div>


      </div>

    </footer>
  );
};

export default Footer;