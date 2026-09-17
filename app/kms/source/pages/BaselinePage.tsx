import React, { useState } from 'react';
import { COLOR_SWATCHES } from '../data/mockData';
import { Check, Copy, Search } from 'lucide-react';

export const BaselinePage: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeChip, setActiveChip] = useState('Semua');

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <header className="mb-12">
        <p className="eyebrow">Referensi Desain Sistem</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#272023]">
          Baseline UI ShadeMarang
        </h1>
        <p className="text-base sm:text-lg text-[#595155] mt-2 max-w-3xl leading-relaxed">
          Sistem desain resmi mockup ShadeMarang: palet <strong>Dusty Plum &amp; Warm Pearl Canvas</strong>, tipografi Fraunces &amp; Plus Jakarta Sans, dan komponen bulat ramah pengguna.
        </p>
      </header>

      {/* 1. Warna */}
      <section className="mb-14">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#272023] mb-1">
          1. Warna
        </h2>
        <p className="text-sm text-[#595155] mb-6">
          Palet resmi: Dusty Plum (#6E3E53), Warm Pearl Canvas (#FAF7F5), Card Surface (#FFFFFF), dan Ink (#272023).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {COLOR_SWATCHES.map((swatch) => (
            <div
              key={swatch.name}
              onClick={() => copyToClipboard(swatch.hex)}
              className="bg-white rounded-2xl p-3 border border-[#ECE4E8] flex items-center gap-3.5 hover:shadow-md hover:border-[#6E3E53]/40 transition-all cursor-pointer group"
              title="Klik untuk menyalin kode HEX"
            >
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0 border border-black/5 shadow-inner"
                style={{ backgroundColor: swatch.hex }}
              />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <b className="text-sm font-bold text-[#272023]">{swatch.name}</b>
                  {copiedHex === swatch.hex ? (
                    <span className="text-[10px] text-[#6E3E53] font-bold flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Tersalin
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[#8A7E84] opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <code className="text-xs font-mono text-[#6E3E53] mt-0.5">{swatch.hex}</code>
                <span className="text-[11px] text-[#8A7E84] truncate mt-0.5">
                  {swatch.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Tipografi */}
      <section className="mb-14">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#272023] mb-1">
          2. Tipografi
        </h2>
        <p className="text-sm text-[#595155] mb-6">
          Dua keluarga: <strong>Fraunces</strong> (judul &amp; display) dan <strong>Plus Jakarta Sans</strong> (isi &amp; navigasi).
        </p>

        <div className="panel divide-y divide-[#ECE4E8]">
          <div className="py-4 first:pt-0 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
            <span className="text-[10px] font-bold tracking-widest text-[#8A7E84] w-28 uppercase">
              DISPLAY XL
            </span>
            <span className="font-display text-4xl sm:text-5xl font-semibold text-[#272023]">
              ShadeMarang
            </span>
          </div>

          <div className="py-4 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
            <span className="text-[10px] font-bold tracking-widest text-[#8A7E84] w-28 uppercase">
              DISPLAY L
            </span>
            <span className="font-display text-2xl sm:text-3xl font-semibold text-[#272023]">
              Dashboard UHI
            </span>
          </div>

          <div className="py-4 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
            <span className="text-[10px] font-bold tracking-widest text-[#8A7E84] w-28 uppercase">
              TITLE
            </span>
            <span className="font-display text-xl font-semibold text-[#272023]">
              Wilayah prioritas
            </span>
          </div>

          <div className="py-4 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
            <span className="text-[10px] font-bold tracking-widest text-[#8A7E84] w-28 uppercase">
              BODY
            </span>
            <span className="text-base text-[#595155] font-normal">
              Ringkasan kondisi panas Kota Semarang, Juni 2026.
            </span>
          </div>

          <div className="py-4 last:pb-0 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
            <span className="text-[10px] font-bold tracking-widest text-[#8A7E84] w-28 uppercase">
              CAPTION
            </span>
            <span className="text-xs text-[#8A7E84] font-medium">
              LST 38.4°C · NDVI 0.11 · klaster inti
            </span>
          </div>
        </div>
      </section>

      {/* 3. Komponen */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#272023] mb-1">
            3. Komponen
          </h2>
          <p className="text-sm text-[#595155]">
            Radius penuh pada tombol, kartu melengkung 20–24px (rounded-3xl), border halus #ECE4E8.
          </p>
        </div>

        {/* Buttons Panel */}
        <div className="panel">
          <h3 className="text-lg font-bold font-display text-[#272023] mb-4">Button</h3>
          <div className="flex flex-wrap items-center gap-3">
            <button className="btn btn--primary">Primary</button>
            <button className="btn btn--secondary">Secondary</button>
            <button className="btn btn--outline">Outline</button>
            <button className="btn btn--ghost">Ghost</button>
            <button className="btn btn--primary btn--small">Small</button>
          </div>
        </div>

        {/* Badge Panel */}
        <div className="panel">
          <h3 className="text-lg font-bold font-display text-[#272023] mb-4">Badge</h3>
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge badge--neutral">Neutral</span>
            <span className="badge badge--hangat">Hangat / valid</span>
            <span className="badge badge--hotspot">Hotspot</span>
            <span className="badge badge--menunggu">Menunggu</span>
            <span className="badge badge--publik">Publik</span>
            <span className="badge badge--kunci">Login diperlukan</span>
            <span className="badge badge--admin">Khusus admin</span>
          </div>
        </div>

        {/* Input & Chip Filter Panel */}
        <div className="panel">
          <h3 className="text-lg font-bold font-display text-[#272023] mb-4">Input &amp; chip filter</h3>
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8A7E84]">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="search"
              placeholder="Cari pengetahuan UHI…"
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#ECE4E8] rounded-2xl text-sm text-[#272023] focus:outline-none focus:border-[#6E3E53]"
            />
          </div>

          <div className="chips mb-0">
            {['Semua', 'Hotspot', 'Mitigasi', 'RTH', 'Panduan'].map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveChip(chip)}
                className={`chip ${activeChip === chip ? 'is-active' : ''}`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Kartu Konten Panel */}
        <div className="panel">
          <h3 className="text-lg font-bold font-display text-[#272023] mb-4">Kartu konten</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <article className="card shadow-none border border-[#ECE4E8]">
              <span className="badge badge--hotspot mb-2">Hotspot</span>
              <h3 className="text-xl font-bold font-display text-[#272023]">Semarang Tengah</h3>
              <p className="text-sm text-[#595155] mt-1">LST 38.4°C · NDVI 0.11 · klaster inti</p>
            </article>

            <article className="card shadow-none border border-[#ECE4E8]">
              <span className="badge badge--hangat mb-2">Hangat / valid</span>
              <h3 className="text-xl font-display text-[#272023]">SOP Penghijauan Koridor</h3>
              <p className="text-sm text-[#595155] mt-1">Standar tanam pohon pelindung di jalan arteri, revisi 2026.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};
