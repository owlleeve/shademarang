import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PageId } from '../types';
import { Menu, X, ShieldAlert, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, currentPage, navigateTo, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    setMobileMenuOpen(false);
    navigateTo(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E7E5E4] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('index')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            id="brand-logo-btn"
          >
            <span className="w-9 h-9 rounded-xl bg-[#6E3E53] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 4a8 8 0 0 0-8 8v7a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a2 2 0 0 1 4 0v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-7a8 8 0 0 0-8-8z" opacity=".95" />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <strong className="text-xl sm:text-2xl font-bold tracking-tight text-[#272023] font-display">
                ShadeMarang
              </strong>
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#8A7E84]">
                KMS UHI SEMARANG
              </span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-[13px]">
            <button
              onClick={() => handleNavClick('index')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                currentPage === 'index'
                  ? 'bg-[#EEDDE4] text-[#5A2C40] font-semibold'
                  : 'text-[#595155] hover:text-[#272023] hover:bg-[#F7F2F4]'
              }`}
              id="nav-link-index"
            >
              Beranda
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                currentPage === 'dashboard'
                  ? 'bg-[#EEDDE4] text-[#5A2C40] font-semibold'
                  : 'text-[#595155] hover:text-[#272023] hover:bg-[#F7F2F4]'
              }`}
              id="nav-link-dashboard"
            >
              Dashboard UHI
            </button>
            <button
              onClick={() => handleNavClick('knowledge')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                currentPage === 'knowledge'
                  ? 'bg-[#EEDDE4] text-[#5A2C40] font-semibold'
                  : 'text-[#595155] hover:text-[#272023] hover:bg-[#F7F2F4]'
              }`}
              id="nav-link-knowledge"
            >
              Pengetahuan
            </button>
            <button
              onClick={() => handleNavClick('modules')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                currentPage === 'modules'
                  ? 'bg-[#EEDDE4] text-[#5A2C40] font-semibold'
                  : 'text-[#595155] hover:text-[#272023] hover:bg-[#F7F2F4]'
              }`}
              id="nav-link-mitigasi"
            >
              Mitigasi
            </button>
            <button
              onClick={() => handleNavClick('baseline')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                currentPage === 'baseline'
                  ? 'bg-[#EEDDE4] text-[#5A2C40] font-semibold'
                  : 'text-[#595155] hover:text-[#272023] hover:bg-[#F7F2F4]'
              }`}
              id="nav-link-evaluasi"
            >
              Evaluasi
            </button>
            {!user && <button
              onClick={() => handleNavClick('chat')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                currentPage === 'chat'
                  ? 'bg-[#EEDDE4] text-[#5A2C40] font-semibold'
                  : 'text-[#595155] hover:text-[#272023] hover:bg-[#F7F2F4]'
              }`}
              id="nav-link-chat"
            >
              Tanya AI
            </button>}
            <a href="/kms/lifecycle" className="px-3 py-1.5 rounded-full font-medium text-[#595155] hover:text-[#272023] hover:bg-[#F7F2F4]">Siklus KMS</a>
            {user && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                  currentPage === 'admin'
                    ? 'bg-[#EEDDE4] text-[#5A2C40] font-semibold shadow-xs'
                    : 'text-[#595155] hover:text-[#272023] hover:bg-[#F7F2F4]'
                }`}
                id="nav-link-admin"
              >
                Kelola KMS
              </button>
            )}
          </nav>

          {/* Desktop Auth State */}
          <div className="hidden lg:flex items-center gap-3">
            {!user ? (
              <button
                onClick={() => handleNavClick('login')}
                className="px-4 py-1.5 rounded-full border border-[#DDD4D9] bg-white text-[#272023] text-xs font-semibold hover:bg-[#F7F2F4] transition-colors cursor-pointer"
                id="nav-login-btn"
              >
                Masuk
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#595155] uppercase tracking-wider">
                  {user.department?.includes('Bappeda') ? 'BAPPEDA' : user.department?.includes('Lingkungan') ? 'DLH' : 'BAPPEDA'}
                </span>
                <button
                  onClick={logout}
                  className="px-3.5 py-1.5 rounded-full border border-[#DDD4D9] bg-white text-[#272023] text-xs font-semibold hover:bg-[#F7F2F4] hover:border-[#CFC5CB] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Keluar dari sesi akun"
                  id="nav-logout-btn"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  user.role === 'admin' ? 'bg-[#6E3E53] text-white' : 'bg-[#EEDDE4] text-[#5A2C40]'
                }`}
              >
                {user.initial}
              </span>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#272023] rounded-lg hover:bg-[#FAF7F5]"
              aria-label="Toggle menu"
              id="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7E5E4] bg-white px-4 py-4 space-y-2 animate-in fade-in">
          <button
            onClick={() => handleNavClick('index')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              currentPage === 'index' ? 'bg-[#EEDDE4] text-[#5A2C40]' : 'text-[#272023] hover:bg-[#F7F2F4]'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              currentPage === 'dashboard' ? 'bg-[#EEDDE4] text-[#5A2C40]' : 'text-[#272023] hover:bg-[#F7F2F4]'
            }`}
          >
            Dashboard UHI
          </button>
          <button
            onClick={() => handleNavClick('knowledge')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              currentPage === 'knowledge' ? 'bg-[#EEDDE4] text-[#5A2C40]' : 'text-[#272023] hover:bg-[#F7F2F4]'
            }`}
          >
            Pengetahuan
          </button>
          <button
            onClick={() => handleNavClick('modules')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              currentPage === 'modules' ? 'bg-[#EEDDE4] text-[#5A2C40]' : 'text-[#272023] hover:bg-[#F7F2F4]'
            }`}
          >
            Mitigasi
          </button>
          <button
            onClick={() => handleNavClick('baseline')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              currentPage === 'baseline' ? 'bg-[#EEDDE4] text-[#5A2C40]' : 'text-[#272023] hover:bg-[#F7F2F4]'
            }`}
          >
            Evaluasi
          </button>
          {!user && <button
            onClick={() => handleNavClick('chat')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              currentPage === 'chat' ? 'bg-[#EEDDE4] text-[#5A2C40]' : 'text-[#272023] hover:bg-[#F7F2F4]'
            }`}
          >
              Tanya AI
            </button>}
            <a href="/kms/lifecycle" className="px-3 py-1.5 rounded-full font-medium text-[#595155] hover:text-[#272023] hover:bg-[#F7F2F4]">Siklus KMS</a>
          {user && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                currentPage === 'admin' ? 'bg-[#EEDDE4] text-[#5A2C40]' : 'text-[#272023] hover:bg-[#F7F2F4]'
              }`}
            >
              Kelola KMS
            </button>
          )}

          <div className="pt-3 border-t border-[#ECE4E8]">
            {!user ? (
              <button
                onClick={() => handleNavClick('login')}
                className="w-full py-2.5 rounded-full bg-[#6E3E53] hover:bg-[#5A2E42] text-white text-xs font-semibold shadow-xs justify-center flex items-center"
              >
                Masuk
              </button>
            ) : (
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#272023]">{user.name}</span>
                  <span className="text-[10px] text-[#5A2C40] bg-[#EEDDE4] px-2 py-0.5 rounded-full capitalize font-medium">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-xs text-[#6E3E53] font-semibold underline hover:no-underline cursor-pointer"
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
