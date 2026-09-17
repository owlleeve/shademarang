import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, X } from 'lucide-react';

export const FlashAlert: React.FC = () => {
  const { flashMessage, clearFlash } = useAuth();

  if (!flashMessage) return null;

  const isAlert = flashMessage.toLowerCase().includes('dibatasi') || flashMessage.toLowerCase().includes('terkunci') || flashMessage.toLowerCase().includes('memerlukan');

  return (
    <div
      className={`mb-6 p-4 rounded-2xl flex items-center justify-between gap-3 text-sm font-semibold transition-all shadow-sm ${
        isAlert
          ? 'bg-[#EEDDE4] text-[#5A2C40] border border-[#ECE4E8]'
          : 'bg-[#FAF7F5] text-[#6E3E53] border border-[#ECE4E8]'
      }`}
      role="alert"
    >
      <div className="flex items-center gap-2.5">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <span>{flashMessage}</span>
      </div>
      <button
        onClick={clearFlash}
        className="p-1 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
        aria-label="Tutup notifikasi"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
