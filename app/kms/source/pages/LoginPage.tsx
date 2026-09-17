import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FlashAlert } from '../components/FlashAlert';
import { Shield, ArrowLeft, KeyRound, Check, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, quickLogin, navigateTo, pendingRedirect } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const res = login(email, password);
    if (!res.success) {
      setErrorMessage(res.error || 'Autentikasi gagal.');
    }
  };

  const handleDemoFill = (asRole: 'admin' | 'staff') => {
    quickLogin(asRole);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20">
      <FlashAlert />

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE4E8] shadow-xl">
        {/* Back to home */}
        <button
          onClick={() => navigateTo('index')}
          className="text-xs font-semibold text-[#8A7E84] hover:text-[#6E3E53] flex items-center gap-1.5 mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Beranda
        </button>

        <div className="mb-6">
          <span className="w-10 h-10 rounded-2xl bg-[#EEDDE4] text-[#5A2C40] flex items-center justify-center mb-3">
            <KeyRound className="w-5 h-5" />
          </span>
          <h1 className="text-3xl font-bold font-display text-[#272023]">
            Masuk ke portal
          </h1>
          <p className="text-sm text-[#8A7E84] mt-1">
            Akses Knowledge &amp; Dashboard Admin dimulai dari sini.
          </p>

          {pendingRedirect && (
            <div className="mt-3 px-3 py-2 bg-[#FAF7F5] border border-[#ECE4E8] rounded-xl text-xs text-[#5A2C40] font-semibold">
              Kamu akan diarahkan ke{' '}
              <strong>
                {pendingRedirect === 'admin' ? 'Dashboard Admin' : 'Pustaka Knowledge'}
              </strong>{' '}
              setelah berhasil masuk.
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-[#8A7E84] mb-1.5"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="nama@uhi.semarang.id"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F5] border border-[#ECE4E8] rounded-xl text-sm text-[#272023] placeholder-[#A8A29E] focus:outline-none focus:border-[#6E3E53] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-[#8A7E84] mb-1.5"
            >
              Kata sandi
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F5] border border-[#ECE4E8] rounded-xl text-sm text-[#272023] placeholder-[#A8A29E] focus:outline-none focus:border-[#6E3E53] focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--block py-3 text-base font-bold shadow-md cursor-pointer mt-2"
            id="login-submit-btn"
          >
            Masuk
          </button>
        </form>

        {/* Demo Accounts Quick-Select */}
        <div className="mt-8 pt-6 border-t border-[#ECE4E8]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#8A7E84] mb-3 text-center">
            Pilih Cepat Akun Demo
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              className="p-3 rounded-xl border border-[#6E3E53]/40 bg-[#FAF7F5] hover:bg-[#EEDDE4] text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#6E3E53]">Admin Bappeda</span>
                <span className="badge badge--admin text-[9px] py-0.5 px-1.5">Admin</span>
              </div>
              <p className="text-[11px] font-mono text-[#8A7E84]">admin@demo.id</p>
              <p className="text-[10px] text-[#A8A29E]">Sandi: admin123</p>
            </button>

            <button
              type="button"
              onClick={() => handleDemoFill('staff')}
              className="p-3 rounded-xl border border-[#ECE4E8] bg-[#FAF7F5] hover:bg-[#EEDDE4] text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#272023]">Budi DLH</span>
                <span className="badge badge--neutral text-[9px] py-0.5 px-1.5">Staff</span>
              </div>
              <p className="text-[11px] font-mono text-[#8A7E84]">user@demo.id</p>
              <p className="text-[10px] text-[#A8A29E]">Sandi: user123</p>
            </button>
          </div>

          <p className="text-[11px] text-[#A8A29E] text-center mt-4">
            Akun demo — admin: <code className="text-[#5A2C40]">admin@demo.id / admin123</code> · staff: <code className="text-[#5A2C40]">user@demo.id / user123</code>
          </p>
        </div>
      </div>
    </div>
  );
};
