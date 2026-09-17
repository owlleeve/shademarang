"use client";

import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1917] text-[#A8A29E] py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌳</span>
              <span className="font-display text-xl font-bold text-white">
                Shade<span className="text-[#EA580C]">Marang</span>
              </span>
            </div>
            <p className="text-sm text-[#78716C]">
              Knowledge Management System untuk mitigasi Urban Heat Island
              Kota Semarang.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#EA580C] transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="hover:text-[#EA580C] transition-colors">
                  Knowledge
                </Link>
              </li>
              <li>
                <Link href="/kms" className="hover:text-[#EA580C] transition-colors">
                  KMS
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Fitur</h4>
            <ul className="space-y-2 text-sm">
              <li>Dashboard Admin</li>
              <li>Modul KMS</li>
              <li>Chat AI</li>
              <li>Analisis Spasial</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm">
              <li>Bappeda Litbang Kota Semarang</li>
              <li>Dinas Lingkungan Hidup</li>
              <li>Dinas PUPR & Penataan Ruang</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#78716C]/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2026 ShadeMarang KMS. Hak Cipta Dilindungi.</p>
          <p className="text-sm">
            Dibangun untuk kolaborasi lintas dinas mitigasi UHI
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
export default Footer;
