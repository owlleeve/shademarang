import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FlashAlert } from '../components/FlashAlert';
import {
  ArrowRight,
  BookOpen,
  LayoutDashboard,
  Sparkles,
  MapPin,
  Layers,
  Cpu,
  Database,
  Share2,
  Sliders,
  RotateCw,
  CheckCircle2,
  Thermometer,
  TrendingUp,
  Activity,
  Compass,
  FileText,
  MessageSquare
} from 'lucide-react';
import { KnowledgeDetailModal } from '../components/KnowledgeDetailModal';
import { INITIAL_ARTICLES } from '../data/mockData';
import { KnowledgeArticle } from '../types';

export const HomePage: React.FC = () => {
  const { user, navigateTo } = useAuth();
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [activeBubble, setActiveBubble] = useState<string | null>(null);
  const [activeLifecycleStep, setActiveLifecycleStep] = useState<number>(0);

  const bubbles = [
    { temp: 35, label: 'Gayamsari', type: 'bubble--heat', size: 64 },
    { temp: 38, label: 'Semarang Tengah (Pusat)', type: 'bubble--primary', size: 74 },
    { temp: 36, label: 'Semarang Timur', type: 'bubble--accent', size: 60 },
    { temp: 34, label: 'Semarang Selatan', type: 'bubble--accent', size: 56 },
    { temp: 38, label: 'Semarang Utara (Pelabuhan)', type: 'bubble--primary', size: 66 },
    { temp: 31, label: 'Gajahmungkur', type: 'bubble--gray', size: 58 },
    { temp: 34, label: 'Candisari', type: 'bubble--warm', size: 62 },
    { temp: 32, label: 'Semarang Barat', type: 'bubble--gray', size: 54 },
    { temp: 33, label: 'Pedurungan', type: 'bubble--accent', size: 58 },
  ];

  const lifecycleSteps = [
    {
      title: 'Akuisisi Data Multi-Sumber',
      subtitle: 'Capture Data Satelit & Sensor',
      icon: Layers,
      desc: 'Integrasi otomatis citra satelit Landsat 8/9 TIRS & OLI, stasiun meteorologi BMKG Maritim Tanjung Emas, dan data kepadatan bangunan BPS Semarang.',
      stats: '4 Sumber Data · Validasi BMKG (r=0.82)',
      cta: 'Lihat Data Knowledge',
      target: 'knowledge',
    },
    {
      title: 'Analisis & Sintesis Spasial',
      subtitle: 'Ekstraksi LST, NDVI, & NDBI',
      icon: Database,
      desc: 'Perhitungan indikator suhu permukaan tanah (LST), indeks vegetasi kehijauan (NDVI), dan kekedapan material terbangun (NDBI) per wilayah kecamatan.',
      stats: 'Korelasi r = -0.84 (Vegetasi vs Panas)',
      cta: 'Jelajahi Kajian',
      target: 'knowledge',
    },
    {
      title: 'Prediksi & Klastering AI',
      subtitle: 'Machine Learning Random Forest & DBSCAN',
      icon: Cpu,
      desc: 'Model Random Forest memproyeksikan suhu hingga 2030, sedangkan DBSCAN memetakan 4 klaster prioritas intervensi hotspot perkotaan.',
      stats: 'Akurasi R² = 0.884 · RMSE = 0.82°C',
      cta: 'Tanya Hasil AI',
      target: 'chat',
    },
    {
      title: 'Repositori Pengetahuan',
      subtitle: 'Penyimpanan & Taksonomi Terstruktur',
      icon: BookOpen,
      desc: 'Dokumen ilmiah, SOP penanganan panas, dan peta geospasial tersimpan rapi dengan metadata kecamatan, periode, dan rekomendasi aksi.',
      stats: 'Terbuka untuk Umum · 96 Dokumen Terindeks',
      cta: 'Buka Knowledge',
      target: 'knowledge',
    },
    {
      title: 'Distribusi Lintas Sektor',
      subtitle: 'Dashboard Bappeda, DLH, & API Terbuka',
      icon: Share2,
      desc: 'Penyajian pandangan khusus untuk pengambil kebijakan tata ruang, rekomendasi teknis dinas lingkungan, serta API integrasi Satu Data Semarang.',
      stats: 'Endpoint REST API · JSON Respons Aktif',
      cta: 'Coba Tanya AI',
      target: 'chat',
    },
    {
      title: 'Perencanaan & Simulasi Mitigasi',
      subtitle: 'Kalkulator Pendinginan Mikro',
      icon: Sliders,
      desc: 'Simulasi dampak penambahan ruang terbuka hijau (RTH), kanopi pohon peneduh, dan material berdaya pantul tinggi (cool pavement).',
      stats: 'Estimasi Reduksi Suhu: -0.8°C s/d -2.4°C',
      cta: 'Eksplorasi Mitigasi',
      target: 'knowledge',
    },
    {
      title: 'Evaluasi & Retraining AI',
      subtitle: 'Monitoring Lapangan & Pembaruan Model',
      icon: RotateCw,
      desc: 'Pemantauan suhu pascamitigasi secara empiris, deteksi anomali lapangan, dan umpan balik berkala untuk melatih ulang model AI.',
      stats: 'Siklus Adaptif Berkelanjutan',
      cta: 'Buka Pustaka',
      target: 'knowledge',
    },
  ];

  const handlePriorityClick = (districtName: string) => {
    const found = INITIAL_ARTICLES.find((a) => a.title.toLowerCase().includes(districtName.toLowerCase()));
    if (found) {
      setSelectedArticle(found);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <FlashAlert />

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 lg:mb-24">
        {/* Left Column: Heading & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <p className="eyebrow flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6E3E53] animate-pulse"></span>
            Knowledge management · Semarang
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#272023] leading-[1.12] tracking-tight">
            Kelola pengetahuan UHI Semarang{' '}
            <em className="italic font-normal text-[#6E3E53] underline decoration-[#EEDDE4] decoration-wavy decoration-2">
              tanpa data tercecer.
            </em>
          </h1>

          <p className="text-lg text-[#595155] leading-relaxed max-w-2xl font-normal">
            Platform terpadu pemantauan dan mitigasi fenomena pulau panas perkotaan: integrasi citra satelit Landsat 8/9, analisis LST dan vegetasi, proyeksi AI, repositori panduan ilmiah, hingga evaluasi efektivitas pendinginan wilayah.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('dashboard')}
              className="btn btn--primary text-base px-6 py-3 cursor-pointer flex items-center gap-2 shadow-sm"
              id="hero-cta-dashboard"
            >
              Pantau Dashboard UHI
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('knowledge')}
              className="btn btn--secondary text-base px-5 py-3 cursor-pointer flex items-center gap-2 bg-white hover:bg-[#EEDDE4]/30"
              id="hero-cta-knowledge"
            >
              Pustaka Knowledge
            </button>

            <button
              onClick={() => navigateTo('chat')}
              className="btn btn--secondary text-base px-5 py-3 cursor-pointer flex items-center gap-2 bg-white hover:bg-[#EEDDE4]/30"
              id="hero-cta-chat"
            >
              Tanya AI
            </button>

            {user?.role === 'admin' ? (
              <button
                onClick={() => navigateTo('admin')}
                className="btn btn--outline text-base px-5 py-3 cursor-pointer flex items-center gap-2 bg-white hover:bg-[#EEDDE4]/30"
                id="hero-cta-admin"
              >
                Dashboard Admin
              </button>
            ) : !user ? (
              <button
                onClick={() => navigateTo('login')}
                className="text-sm font-semibold text-[#8A7E84] hover:text-[#6E3E53] px-3 py-2 cursor-pointer transition-colors"
                id="hero-cta-login"
              >
                Masuk Petugas / Admin →
              </button>
            ) : null}
          </div>

          {/* Quick status pill */}
          <div className="flex items-center gap-3 pt-4 text-xs text-[#8A7E84]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6E3E53]"></span>
            <span>Update citra Landsat &amp; Sentinel: <strong>Juni 2026</strong></span>
            <span>·</span>
            <span>16 Kecamatan Terpetakan</span>
            <span>·</span>
            <span className="text-[#6E3E53] font-semibold">Pustaka Terbuka</span>
          </div>
        </div>

        {/* Right Column: Authentic Spatial Telemetry Canvas */}
        <div className="lg:col-span-5">
          <div className="bg-white/95 rounded-3xl border border-[#ECE4E8] shadow-lg p-6 sm:p-7 space-y-6">
            {/* Live Telemetry Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#ECE4E8]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#272023]">
                  Telemetri Termal Semarang
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#5A2C40] bg-[#EEDDE4] px-2.5 py-1 rounded-full border border-[#ECE4E8]">
                Landsat 9 TIRS · 30m
              </span>
            </div>

            {/* Geographic Heat Terrain Cluster */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#8A7E84] font-semibold mb-3">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#6E3E53]" />
                  Distribusi Klaster LST (°C)
                </span>
                <span className="text-[11px] text-[#6E3E53] font-normal">Pilih titik untuk telemetri</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 py-6 px-4 bg-[#FAF7F5] rounded-2xl border border-[#ECE4E8] shadow-inner">
                {bubbles.map((b, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveBubble(b.label);
                      handlePriorityClick(b.label);
                    }}
                    onMouseEnter={() => setActiveBubble(b.label)}
                    style={{ width: `${b.size}px`, height: `${b.size}px` }}
                    className={`bubble ${b.type} cursor-pointer transition-transform hover:scale-110 active:scale-95`}
                    title={`${b.label}: ${b.temp}°C`}
                  >
                    <span>{b.temp}°</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live District Telemetry Callout */}
            <div className="p-4 rounded-2xl bg-[#EEDDE4]/30 border border-[#ECE4E8] flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#5A2C40]">
                  {activeBubble ? 'Wilayah Terpilih' : 'Hotspot Kritis Utama'}
                </p>
                <h4 className="text-base font-bold font-display text-[#272023]">
                  {activeBubble || 'Semarang Tengah (Simpang Lima)'}
                </h4>
                <p className="text-xs text-[#595155] mt-0.5">
                  {activeBubble === 'Semarang Utara'
                    ? 'Zona pesisir pelabuhan · Material atap industri seng'
                    : activeBubble === 'Semarang Timur'
                    ? 'Kawasan permukiman padat Barito · Albedo rendah'
                    : 'Pusat komersial & sirkulasi · Defisit kanopi 21.5%'}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-2xl font-extrabold text-[#B91C1C] font-display">
                  {activeBubble === 'Semarang Utara' ? '37.9°' : activeBubble === 'Semarang Timur' ? '36.8°' : '38.4°'}
                </span>
                <span className="text-[10px] block font-semibold text-[#8A7E84]">LST Maks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric Section: Hotspot & Wilayah Prioritas (Bento Editorial) */}
      <section className="mb-16 lg:mb-24">
        <div className="max-w-3xl mb-8">
          <p className="eyebrow flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5 text-[#6E3E53]" />
            Analisis Spasial &amp; Suhu Permukaan
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#272023]">
            Hotspot Kritis &amp; Prioritas Mitigasi
          </h2>
          <p className="text-base text-[#595155] mt-2">
            Pemetaan berbasis anomali Land Surface Temperature (LST) satelit Landsat 8/9 dan tutupan vegetasi (NDVI) di 16 kecamatan Kota Semarang.
          </p>
        </div>

        {/* Asymmetric 2-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Spotlight Hero Card: Semarang Tengah (Span 7) */}
          <div className="lg:col-span-7 bg-white border-2 border-[#ECE4E8] rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="badge badge--kunci text-xs px-3 py-1 font-bold">
                  HOTSPOT EKSTREM #01
                </span>
                <span className="text-xs font-mono font-semibold text-[#5A2C40]">
                  Sensor: Landsat 9 TIRS (Band 10)
                </span>
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#6E3E53]">
                  Kecamatan Inti Kota
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#272023] mt-1">
                  Semarang Tengah (Kawasan Simpang Lima)
                </h3>
                <p className="text-sm text-[#595155] mt-3 leading-relaxed">
                  Konsentrasi aspal padat, gedung komersial masif, dan minimnya koridor vegetasi memicu efek <em>urban canyon</em> dengan retensi panas tertinggi di Semarang.
                </p>
              </div>

              {/* Anomaly Highlight */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#FAF7F5] rounded-2xl p-4 border border-[#ECE4E8]">
                  <span className="text-xs text-[#8A7E84] block">LST Maksimum</span>
                  <strong className="text-2xl sm:text-3xl font-extrabold text-[#B91C1C] font-display">
                    38.4°C
                  </strong>
                  <span className="text-[11px] text-[#B91C1C] block font-semibold mt-0.5">
                    +4.2°C vs Rerata Kota
                  </span>
                </div>

                <div className="bg-[#FAF7F5] rounded-2xl p-4 border border-[#ECE4E8]">
                  <span className="text-xs text-[#8A7E84] block">Rasio RTH Eksisting</span>
                  <strong className="text-2xl sm:text-3xl font-extrabold text-[#272023] font-display">
                    8.5%
                  </strong>
                  <span className="text-[11px] text-[#EF4444] block font-semibold mt-0.5">
                    Defisit 21.5%
                  </span>
                </div>

                <div className="bg-[#FAF7F5] rounded-2xl p-4 border border-[#ECE4E8] col-span-2 sm:col-span-1">
                  <span className="text-xs text-[#8A7E84] block">Potensi Reduksi</span>
                  <strong className="text-2xl sm:text-3xl font-extrabold text-[#10B981] font-display">
                    -1.8°C
                  </strong>
                  <span className="text-[11px] text-[#10B981] block font-semibold mt-0.5">
                    Dengan Kanopi Trembesi
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#ECE4E8] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-[#8A7E84]">
                Dokumen kajian terverifikasi · Bappeda &amp; DLH Semarang
              </span>
              <button
                onClick={() => handlePriorityClick('Semarang Tengah')}
                className="btn btn--primary text-xs sm:text-sm px-5 py-2.5 cursor-pointer flex items-center gap-2"
              >
                Kaji Rekomendasi Wilayah
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Comparative Ranking Column (Span 5) */}
          <div className="lg:col-span-5 bg-white border border-[#ECE4E8] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#ECE4E8]">
                <h4 className="text-lg font-bold font-display text-[#272023]">
                  Peringkat Anomali Panas Wilayah
                </h4>
                <span className="text-xs text-[#8A7E84]">Juni 2026</span>
              </div>

              <div className="space-y-3.5">
                {/* District 1 */}
                <div
                  onClick={() => handlePriorityClick('Semarang Utara')}
                  className="p-3.5 rounded-2xl border border-[#ECE4E8] hover:border-[#6E3E53] hover:bg-[#EEDDE4]/20 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-extrabold text-[#5A2C40]">#02 · Pesisir &amp; Industri</span>
                    <span className="text-sm font-bold text-[#B91C1C]">37.9°C</span>
                  </div>
                  <strong className="text-sm text-[#272023] group-hover:text-[#6E3E53] transition-colors block">
                    Semarang Utara (Tanjung Emas)
                  </strong>
                  <div className="w-full bg-[#ECE4E8] h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-[#6E3E53] h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-[11px] text-[#8A7E84] mt-1 block">Material atap seng industri · RTH 6.2%</span>
                </div>

                {/* District 2 */}
                <div
                  onClick={() => handlePriorityClick('Semarang Timur')}
                  className="p-3.5 rounded-2xl border border-[#ECE4E8] hover:border-[#6E3E53] hover:bg-[#EEDDE4]/20 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-extrabold text-[#5A2C40]">#03 · Permukiman Padat</span>
                    <span className="text-sm font-bold text-[#B91C1C]">36.8°C</span>
                  </div>
                  <strong className="text-sm text-[#272023] group-hover:text-[#6E3E53] transition-colors block">
                    Semarang Timur (Barito &amp; Bugangan)
                  </strong>
                  <div className="w-full bg-[#ECE4E8] h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-[#936277] h-full rounded-full" style={{ width: '84%' }}></div>
                  </div>
                  <span className="text-[11px] text-[#8A7E84] mt-1 block">Kerapatan bangunan &gt;80% · Albedo aspal tinggi</span>
                </div>

                {/* District 3 */}
                <div
                  onClick={() => handlePriorityClick('Gayamsari')}
                  className="p-3.5 rounded-2xl border border-[#ECE4E8] hover:border-[#6E3E53] hover:bg-[#EEDDE4]/20 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-extrabold text-[#5A2C40]">#04 · Koridor Arteri</span>
                    <span className="text-sm font-bold text-[#6E3E53]">35.4°C</span>
                  </div>
                  <strong className="text-sm text-[#272023] group-hover:text-[#6E3E53] transition-colors block">
                    Gayamsari (Kawasan Majapahit)
                  </strong>
                  <div className="w-full bg-[#ECE4E8] h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-[#B8ACB3] h-full rounded-full" style={{ width: '74%' }}></div>
                  </div>
                  <span className="text-[11px] text-[#8A7E84] mt-1 block">Jalur sirkulasi berat · Emisi gas buang tinggi</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#ECE4E8] flex items-center justify-between text-xs text-[#8A7E84]">
              <span>Titik kontrol sejuk: <strong>Gajahmungkur (31.2°C)</strong></span>
              <button
                onClick={() => navigateTo('dashboard')}
                className="text-[#6E3E53] font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                Pantau Semua Wilayah di Dashboard UHI →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Core: Alur Kerja Pengelolaan UHI (Integrated KMS Lifecycle) */}
      <section className="mb-16 lg:mb-24 pt-10 border-t border-[#ECE4E8]">
        <div className="max-w-3xl mb-8">
          <p className="eyebrow flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#6E3E53]" />
            Alur Kerja Terpadu
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#272023]">
            Siklus Pengelolaan Pengetahuan UHI
          </h2>
          <p className="text-base text-[#595155] mt-2">
            ShadeMarang mengintegrasikan seluruh mata rantai: dari akurasi citra satelit mentah hingga simulasi penurunan suhu perkotaan.
          </p>
        </div>

        {/* Horizontal Step Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {lifecycleSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeLifecycleStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveLifecycleStep(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#6E3E53] text-white shadow-md'
                    : 'bg-white text-[#595155] border border-[#ECE4E8] hover:bg-[#EEDDE4]/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{idx + 1}. {step.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        {(() => {
          const current = lifecycleSteps[activeLifecycleStep];
          const Icon = current.icon;
          return (
            <div className="bg-white border border-[#ECE4E8] rounded-3xl p-6 sm:p-8 shadow-sm transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-10 h-10 rounded-xl bg-[#EEDDE4] text-[#5A2C40] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#6E3E53]">
                        Tahap {activeLifecycleStep + 1} · {current.subtitle}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-[#272023]">
                        {current.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-[#595155] leading-relaxed">
                    {current.desc}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8A7E84]">
                    <span className="badge badge--neutral text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                      {current.stats}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#ECE4E8] lg:pl-6">
                  <button
                    onClick={() => navigateTo(current.target as any)}
                    className="btn btn--primary text-sm px-5 py-2.5 w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2"
                  >
                    {current.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateTo('modules')}
                    className="text-xs text-[#8A7E84] hover:text-[#6E3E53] font-semibold underline underline-offset-4 cursor-pointer"
                  >
                    Buka Rincian Operasional
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Asymmetric Section: Layanan Portal ShadeMarang (Bento Architecture) */}
      <section className="pt-8 border-t border-[#ECE4E8] mb-8">
        <div className="max-w-3xl mb-8">
          <p className="eyebrow flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#6E3E53]" />
            Ekosistem Akses
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#272023]">
            Layanan Portal ShadeMarang
          </h2>
          <p className="text-base text-[#595155] mt-2">
            Akses pengetahuan terbuka bagi akademisi, instansi pemerintah (Bappeda &amp; DLH), komunitas lingkungan, dan publik.
          </p>
        </div>

        {/* Asymmetric Bento: Featured Public Dashboard Banner + Knowledge + Dark AI */}
        <div className="space-y-6 mb-6">
          {/* Featured Bento: Dashboard UHI Publik (Open Citizen Access) */}
          <article className="bg-white border-2 border-[#ECE4E8] rounded-3xl p-7 sm:p-9 shadow-sm hover:border-[#6E3E53] transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="badge badge--kunci text-xs px-3 py-1 font-bold">
                    LAYANAN TERBUKA WARGA
                  </span>
                  <span className="badge badge--hangat text-xs px-3 py-1 font-semibold">
                    Tanpa Perlu Login
                  </span>
                  <span className="text-xs font-mono text-[#8A7E84]">
                    Pembaruan Landsat 9 TIRS 30m
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#272023]">
                  Dashboard Pantauan UHI Publik Kota Semarang
                </h3>

                <p className="text-sm sm:text-base text-[#595155] leading-relaxed">
                  Pantau kondisi suhu permukaan tanah (*Land Surface Temperature*) di 16 kecamatan secara transparan. Dilengkapi peta ruang sejuk publik, peringatan waktu paparan terik harian, serta kalkulator simulasi mitigasi mandiri bagi warga dan komunitas.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-[#8A7E84]">
                  <span className="flex items-center gap-1.5 text-[#272023]">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    Telemetri 16 Kecamatan
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5 text-[#272023]">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    Peta Ruang Sejuk &amp; RTH Warga
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5 text-[#272023]">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    Kalkulator Dampak Tanam Pohon
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3 border-t lg:border-t-0 lg:border-l border-[#ECE4E8] pt-4 lg:pt-0 lg:pl-6">
                <div className="w-full text-left lg:text-right mb-1">
                  <span className="text-[11px] text-[#8A7E84] block">Status Termal Kota:</span>
                  <span className="text-lg font-extrabold text-[#B91C1C] font-display">
                    Waspada Siang Terik (38.4°C)
                  </span>
                </div>
                <div className="w-full sm:w-auto">
                  <button
                    onClick={() => navigateTo('dashboard')}
                    className="btn btn--primary text-sm sm:text-base px-6 py-2.5 w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    id="bento-open-public-dashboard"
                  >
                    Buka Dashboard UHI Publik
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Asymmetric Bento: Wide Knowledge Feature + Dark AI Interactive Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Bento 1 (Span 7): Pustaka Pengetahuan UHI (Open Repository) */}
          <article className="lg:col-span-7 bg-white border border-[#ECE4E8] rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#6E3E53]/40 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="badge badge--hangat text-[10px] font-bold tracking-wider uppercase">
                  Pustaka Terbuka · Tanpa Login
                </span>
                <span className="text-xs font-semibold text-[#8A7E84]">96 Dokumen Terverifikasi</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-[#272023]">
                  Pustaka Pengetahuan UHI
                </h3>
                <p className="text-sm text-[#595155] mt-2 leading-relaxed">
                  Repositori publik laporan ilmiah, peta LST kecamatan, analisis korelasi tutupan hijau, dan panduan teknis pendinginan iklim mikro Kota Semarang.
                </p>
              </div>

              {/* Research Focus Chips */}
              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#8A7E84] mb-2">
                  Topik Kajian Unggulan:
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => navigateTo('knowledge')}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#ECE4E8] text-xs font-medium text-[#272023] hover:border-[#6E3E53] hover:text-[#6E3E53] transition-colors cursor-pointer"
                  >
                    🌿 Koridor Kanopi Trembesi
                  </button>
                  <button
                    onClick={() => navigateTo('knowledge')}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#ECE4E8] text-xs font-medium text-[#272023] hover:border-[#6E3E53] hover:text-[#6E3E53] transition-colors cursor-pointer"
                  >
                    🏢 Cool Roof &amp; Albedo
                  </button>
                  <button
                    onClick={() => navigateTo('knowledge')}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#ECE4E8] text-xs font-medium text-[#272023] hover:border-[#6E3E53] hover:text-[#6E3E53] transition-colors cursor-pointer"
                  >
                    🛰️ Korelasi NDVI vs LST
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#ECE4E8]/80 flex items-center justify-between">
              <span className="text-xs text-[#8A7E84]">Format PDF, GeoJSON, dan Ringkasan Kebijakan</span>
              <button
                onClick={() => navigateTo('knowledge')}
                className="btn btn--primary text-xs sm:text-sm px-5 py-2.5 cursor-pointer flex items-center gap-1.5"
              >
                Jelajahi Pustaka
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>

          {/* Bento 2 (Span 5): Tanya AI Interactive Chat Card */}
          <article className="lg:col-span-5 bg-[#272023] text-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-[#6E3E53] text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#EEDDE4] bg-[#383034] px-2.5 py-1 rounded-full border border-[#4E4348]">
                  Gemini UHI Engine
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-white">
                  Tanya AI UHI
                </h3>
                <p className="text-sm text-[#E7E0E3] mt-2 leading-relaxed">
                  Konsultasikan fenomena titik panas, simulasi dampak penanaman pohon, dan estimasi reduksi suhu secara interaktif.
                </p>
              </div>

              {/* Sample Prompt Chips */}
              <div className="space-y-2 pt-1">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#B8ACB3]">
                  Coba tanyakan langsung:
                </p>
                <button
                  onClick={() => navigateTo('chat')}
                  className="w-full text-left p-2.5 rounded-xl bg-[#383034] hover:bg-[#463D42] border border-[#4E4348] text-xs text-[#E7E0E3] hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span>"Berapa target RTH Semarang Tengah?"</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#EEDDE4] group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigateTo('chat')}
                  className="w-full text-left p-2.5 rounded-xl bg-[#383034] hover:bg-[#463D42] border border-[#4E4348] text-xs text-[#E7E0E3] hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span>"Jenis pohon apa paling efektif menurunkan LST?"</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#EEDDE4] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-[#4E4348] flex items-center justify-between">
              <span className="text-xs text-[#B8ACB3]">Tersedia untuk semua pengguna</span>
              <button
                onClick={() => navigateTo('chat')}
                className="btn btn--primary text-xs sm:text-sm px-5 py-2.5 cursor-pointer flex items-center gap-1.5"
              >
                Mulai Chat
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        </div>
      </div>

        {/* Bento Strip 3: System Pipeline Telemetry & Admin Gateway */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#ECE4E8] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#595155] shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-bold text-[#272023] flex items-center gap-1.5">
              <Database className="w-4 h-4 text-[#6E3E53]" />
              Status Pipeline Data:
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              Landsat GEE: Terhubung
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              BMKG Maritim: Aktif
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              Satu Data Semarang: Sinkron
            </span>
          </div>

          <div className="flex items-center gap-3">
            {user?.role === 'admin' ? (
              <button
                onClick={() => navigateTo('admin')}
                className="btn btn--outline btn--small flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#6E3E53]" />
                Buka Konsol Admin
              </button>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className="text-[#8A7E84] hover:text-[#6E3E53] font-semibold underline underline-offset-4 cursor-pointer"
              >
                Masuk sebagai Petugas / Admin →
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Reading Modal */}
      <KnowledgeDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
};
