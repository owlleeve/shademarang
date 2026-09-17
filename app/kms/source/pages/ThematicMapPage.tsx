import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_WILAYAH } from '../data/mockData';
import { ThematicMapViewer } from '../components/ThematicMapViewer';
import { WilayahData } from '../types';
import {
  Map,
  Compass,
  Thermometer,
  Trees,
  AlertTriangle,
  Wind,
  Sparkles,
  ArrowRight,
  Download,
  Info,
  Layers,
  Search,
  CheckCircle2,
  TrendingDown,
  Building,
  Printer
} from 'lucide-react';

export const ThematicMapPage: React.FC = () => {
  const { navigateTo } = useAuth();
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('w-1'); // Default: Semarang Tengah
  const [compareDistrictId, setCompareDistrictId] = useState<string>('w-11'); // Default: Gunungpati (sejuk)

  const activeDistrict = INITIAL_WILAYAH.find((w) => w.id === selectedDistrictId) || INITIAL_WILAYAH[0];
  const compareDistrict = INITIAL_WILAYAH.find((w) => w.id === compareDistrictId) || INITIAL_WILAYAH[10];

  // Hotspot and Cool shortcuts
  const hotspots = INITIAL_WILAYAH.filter((w) => w.status === 'Hotspot');
  const coolzones = INITIAL_WILAYAH.filter((w) => w.lst < 30.0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="badge badge--kunci text-xs font-bold uppercase tracking-wider">
              PETA TEMATIK INTERAKTIF
            </span>
            <span className="text-xs font-medium text-[#78716C] bg-white px-2.5 py-1 rounded-md border border-[#E7E5E4]">
              Resolusi Spasial 30 Meter
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl border border-[#ECE4E8] bg-white text-[#595155] hover:text-[#272023] hover:border-[#6E3E53] font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              Cetak / Simpan PDF
            </button>
            <button
              onClick={() => navigateTo('dashboard')}
              className="px-3 py-1.5 rounded-xl bg-[#FAF7F5] border border-[#ECE4E8] text-[#5A2C40] font-bold flex items-center gap-1.5 cursor-pointer"
            >
              Buka Dashboard UHI Publik →
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#272023] tracking-tight">
          Peta Tematik Urban Heat Island Kota Semarang
        </h1>
        <p className="text-base sm:text-lg text-[#595155] mt-3 max-w-3xl leading-relaxed">
          Visualisasi geospasial multitematik mencakup Suhu Permukaan Tanah (LST), Kerapatan Kanopi Vegetasi (NDVI), Indeks Kerentanan Panas (HVI), serta Koridor Angin Laut dan Sungai penyejuk kota.
        </p>

        {/* Quick Jump Hotspot & Cool Spots */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-2 text-xs">
          <span className="text-[#8A7E84] font-semibold">Lompat Cepat:</span>
          <span className="text-[#5A2C40] font-bold">Hotspot Kritis:</span>
          {hotspots.map((h) => (
            <button
              key={h.id}
              onClick={() => setSelectedDistrictId(h.id)}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold cursor-pointer transition-all ${
                selectedDistrictId === h.id
                  ? 'bg-[#6E3E53] text-white border-[#6E3E53]'
                  : 'bg-white text-[#5A2C40] border-[#ECE4E8] hover:bg-[#EEDDE4]'
              }`}
            >
              {h.wilayah} ({h.lst}°C)
            </button>
          ))}
          <span className="text-[#10B981] font-bold ml-2">Zona Sejuk:</span>
          {coolzones.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedDistrictId(c.id)}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold cursor-pointer transition-all ${
                selectedDistrictId === c.id
                  ? 'bg-[#10B981] text-white border-[#10B981]'
                  : 'bg-white text-[#10B981] border-[#A7F3D0] hover:bg-[#ECFDF5]'
              }`}
            >
              {c.wilayah} ({c.lst}°C)
            </button>
          ))}
        </div>
      </header>

      {/* Main Thematic Interactive Map Section */}
      <section className="mb-12">
        <ThematicMapViewer
          districts={INITIAL_WILAYAH}
          selectedDistrictId={selectedDistrictId}
          onSelectDistrict={(id) => setSelectedDistrictId(id)}
        />
      </section>

      {/* Side-by-Side Spatial Comparison & Deep Analytical Insights (12-Column Asymmetric Grid) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
        {/* Left (Span 7): Komparasi Spasial 2 Wilayah */}
        <div className="lg:col-span-7 bg-white border border-[#ECE4E8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#ECE4E8]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#6E3E53] block">
                Alat Analisis Komparatif
              </span>
              <h2 className="text-2xl font-bold font-display text-[#272023] mt-0.5">
                Bandingkan 2 Wilayah Secara Langsung
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#8A7E84]">Bandingkan dengan:</span>
              <select
                value={compareDistrictId}
                onChange={(e) => setCompareDistrictId(e.target.value)}
                className="bg-[#FAF7F5] border border-[#ECE4E8] rounded-xl px-3 py-1.5 font-bold text-[#272023] focus:outline-none focus:border-[#6E3E53]"
              >
                {INITIAL_WILAYAH.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.wilayah} ({w.lst}°C)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* District 1 (Active on Map) */}
            <div className="p-5 rounded-2xl bg-[#FAF7F5] border-2 border-[#ECE4E8] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#5A2C40] uppercase">Wilayah A (Peta)</span>
                <span className={`badge ${activeDistrict.status === 'Hotspot' ? 'badge--kunci' : 'badge--hangat'} text-[10px]`}>
                  {activeDistrict.status}
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-[#272023]">{activeDistrict.wilayah}</h3>

              <div className="space-y-2 pt-2 text-xs text-[#595155]">
                <div className="flex justify-between">
                  <span className="text-[#8A7E84]">Suhu LST Puncak:</span>
                  <strong className="text-sm font-black text-[#5A2C40]">{activeDistrict.lst}°C</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E84]">Indeks Vegetasi (NDVI):</span>
                  <strong className="font-bold text-[#15803D]">{activeDistrict.ndvi} ({activeDistrict.vegetationCoverPct}%)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E84]">Permukaan Kedap Air:</span>
                  <strong className="font-bold text-[#272023]">{activeDistrict.imperviousSurfacePct}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E84]">Kerentanan Panas (HVI):</span>
                  <strong className="font-bold text-[#991B1B]">{activeDistrict.hviScore}/100</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E84]">Elevasi Rata-rata:</span>
                  <strong className="font-bold text-[#272023]">{activeDistrict.elevationMeters} mdpl</strong>
                </div>
              </div>
            </div>

            {/* District 2 (Comparison) */}
            <div className="p-5 rounded-2xl bg-white border border-[#ECE4E8] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#8A7E84] uppercase">Wilayah B (Komparasi)</span>
                <span className={`badge ${compareDistrict.status === 'Hotspot' ? 'badge--kunci' : 'badge--hangat'} text-[10px]`}>
                  {compareDistrict.status}
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-[#272023]">{compareDistrict.wilayah}</h3>

              <div className="space-y-2 pt-2 text-xs text-[#595155]">
                <div className="flex justify-between">
                  <span className="text-[#8A7E84]">Suhu LST Puncak:</span>
                  <strong className="text-sm font-black text-[#5A2C40]">{compareDistrict.lst}°C</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E84]">Indeks Vegetasi (NDVI):</span>
                  <strong className="font-bold text-[#15803D]">{compareDistrict.ndvi} ({compareDistrict.vegetationCoverPct}%)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E84]">Permukaan Kedap Air:</span>
                  <strong className="font-bold text-[#272023]">{compareDistrict.imperviousSurfacePct}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E84]">Kerentanan Panas (HVI):</span>
                  <strong className="font-bold text-[#991B1B]">{compareDistrict.hviScore}/100</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E84]">Elevasi Rata-rata:</span>
                  <strong className="font-bold text-[#272023]">{compareDistrict.elevationMeters} mdpl</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Differential Analysis Result */}
          <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#ECE4E8] text-xs space-y-2">
            <span className="font-bold text-[#272023] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              Kesimpulan Geospasial Komparatif:
            </span>
            <p className="text-[#595155] leading-relaxed">
              Selisih suhu antara <strong>{activeDistrict.wilayah}</strong> dan <strong>{compareDistrict.wilayah}</strong> adalah sebesar{' '}
              <strong className="text-[#5A2C40] font-mono">
                {Math.abs(activeDistrict.lst - compareDistrict.lst).toFixed(1)}°C
              </strong>. Perbedaan ini berkorelasi kuat dengan disparitas tutupan vegetasi ({Math.abs(activeDistrict.vegetationCoverPct - compareDistrict.vegetationCoverPct).toFixed(1)}%) serta perbedaan material kedap air (*asphalt/concrete fraction*).
            </p>
          </div>
        </div>

        {/* Right (Span 5): Sains UHI & Panduan Membaca Lapisan Peta */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#272023] text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
            <span className="w-9 h-9 rounded-xl bg-[#6E3E53] text-white flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold font-display text-white">
              Cara Membaca 4 Lapisan Tematik
            </h3>
            <ul className="space-y-3 text-xs text-[#D6D3D1]">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#6E3E53] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-white block">LST (Land Surface Temperature):</strong>
                  Suhu radiatif permukaan tanah dari sensor inframerah termal Landsat 9 TIRS. Bukan suhu udara, melainkan panas material tanah/aspal/atap.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#15803D] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-white block">NDVI (Vegetation Index):</strong>
                  Nilai kerapatan klorofil hijau (-1 hingga +1). Semakin tinggi, semakin rapat kanopi pohon yang mendinginkan melalui evapotranspirasi.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#991B1B] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-white block">HVI (Heat Vulnerability):</strong>
                  Indeks sintesis kerentanan sosial-ekologis, memprioritaskan kawasan padat dengan proporsi lansia tinggi dan defisit RTH.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#0284C7] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">4</span>
                <div>
                  <strong className="text-white block">Koridor Angin &amp; Sungai:</strong>
                  Jalur ventilasi alami pembawa angin laut sejuk dari Laut Jawa ke koridor Banjir Kanal Barat dan Timur menuju perbukitan.
                </div>
              </li>
            </ul>

            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => navigateTo('chat')}
                className="btn btn--primary text-xs w-full py-2.5 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Konsultasikan Pola Peta ke AI
              </button>
            </div>
          </div>

          {/* Quick Info Box: Regulasi RTH 30% Semarang */}
          <div className="bg-[#FAF7F5] border border-[#ECE4E8] rounded-3xl p-6 text-xs space-y-2">
            <span className="font-extrabold uppercase tracking-wider text-[#6E3E53] block">
              Kebijakan Tata Ruang RTRW
            </span>
            <h4 className="text-base font-bold text-[#272023]">Target RTH Publik 20% &amp; Privat 10%</h4>
            <p className="text-[#595155] leading-relaxed">
              Berdasarkan RTRW Kota Semarang, kawasan Semarang Tengah, Semarang Utara, dan Semarang Timur menjadi prioritas intervensi penambahan koridor hijau vertikal dan atap reflektif karena keterbatasan lahan horizontal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
