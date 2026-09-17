"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/app/kms/context/AuthContext";

const Navbar: React.FC = () => {
  const { user, currentPage, navigateTo, logout, quickLogin } = useAuth();

  const navItems = [
    { id: "index" as const, label: "Beranda", href: "/" },
    { id: "knowledge" as const, label: "Knowledge", href: "/knowledge" },
    { id: "modules" as const, label: "Modul KMS", href: "/kms" },
    { id: "chat" as const, label: "Chat AI", href: "/chat" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌳</span>
            <span className="font-display text-xl font-bold text-[#1C1917]">
              Shade<span className="text-[#EA580C]">Marang</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? "bg-[#EA580C] text-white"
                    : "text-[#78716C] hover:text-[#1C1917] hover:bg-[#FFF6EE]"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Admin Link */}
            {user?.role === "admin" && (
              <button
                onClick={() => navigateTo("admin")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === "admin"
                    ? "bg-[#EA580C] text-white"
                    : "text-[#78716C] hover:text-[#1C1917] hover:bg-[#FFF6EE]"
                }`}
              >
                Admin
              </button>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#EA580C] text-white flex items-center justify-center text-sm font-bold">
                    {user.initial}
                  </div>
                  <span className="text-sm text-[#78716C]">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="btn btn--small btn--secondary"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => quickLogin("admin")}
                  className="btn btn--small btn--outline hidden md:block"
                >
                  Admin Demo
                </button>
                <button
                  onClick={() => quickLogin("staff")}
                  className="btn btn--small btn--primary"
                >
                  Masuk
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
export default Navbar;
