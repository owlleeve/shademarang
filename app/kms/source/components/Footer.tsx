import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useAuth();

  return (
    <footer className="mt-auto border-t border-[#ECE4E8] bg-white py-8 text-center text-sm text-[#595155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#6E3E53] flex items-center justify-center text-white text-xs font-serif font-bold shadow-xs">
            S
          </div>
          <p className="font-medium text-xs sm:text-sm text-[#595155]">
            © 2026 <span className="font-semibold text-[#272023]">ShadeMarang KMS</span> — Sistem Manajemen Pengetahuan Urban Heat Island
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-[#8A7E84]">
          <button
            onClick={() => navigateTo('index')}
            className="hover:text-[#6E3E53] transition-colors cursor-pointer"
          >
            Beranda
          </button>
          <span>·</span>
          <button
            onClick={() => navigateTo('dashboard')}
            className="hover:text-[#6E3E53] transition-colors cursor-pointer"
          >
            Dashboard UHI
          </button>
          <span>·</span>
          <button
            onClick={() => navigateTo('knowledge')}
            className="hover:text-[#6E3E53] transition-colors cursor-pointer"
          >
            Pengetahuan
          </button>
          <span>·</span>
          <button
            onClick={() => navigateTo('modules')}
            className="hover:text-[#6E3E53] transition-colors cursor-pointer"
          >
            Mitigasi
          </button>
          <span>·</span>
          <button
            onClick={() => navigateTo('chat')}
            className="hover:text-[#6E3E53] transition-colors cursor-pointer"
          >
            Tanya AI
          </button>
          <span>·</span>
          <button
            onClick={() => navigateTo('baseline')}
            className="hover:text-[#6E3E53] transition-colors cursor-pointer"
          >
            Evaluasi
          </button>
        </div>
      </div>
    </footer>
  );
};

