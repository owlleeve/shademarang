import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_WILAYAH } from '../data/mockData';
import { WilayahData } from '../types';
import { ThematicMapViewer } from '../components/ThematicMapViewer';
import {
  Thermometer,
  Trees,
  Sun,
  Wind,
  Search,
  ArrowRight,
  Info,
  MapPin,
  Sparkles,
  Sliders,
  CheckCircle2,
  Compass,
  AlertTriangle,
  Building,
  HelpCircle,
  TrendingDown,
  Map,
  Layers,
  Calendar,
  BarChart3,
  Database
} from 'lucide-react';

interface PublicPark {
  name: string;
  district: string;
  type: string;
  estTemp: string;
  tempReduction: string;
  description: string;
  features: string[];
}

const PUBLIC_COOL_SPACES: PublicPark[] = [
  {
    name: 'Hutan Wisata Tinjomoyo',
    district: 'Banyumanik / Candisari',
    type: 'Hutan Kota & Koridor Hijau',
    estTemp: '28.5°C',
    tempReduction: '-4.8°C vs Pusat Kota',
    description: 'Kawasan vegetasi lebat seluas 57 hektar yang menjadi paru-paru iklim mikro utama Semarang bagian selatan.',
    features: ['Kanopi Trembesi Rapat', 'Aliran Sungai Alami', 'Jalur Pejalan Teduh']
  },
  {
    name: 'Taman Indonesia Kaya (Taman KB)',
    district: 'Semarang Selatan (Mugassari)',
    type: 'Taman Publik Tematik',
    estTemp: '31.8°C',
    tempReduction: '-2.4°C vs Simpang Lima',
    description: 'Ruang terbuka hijau aktif di pusat kota dengan deretan pohon rindang dan kanopi pelindung panas.',
    features: ['Pohon Peneduh Tua', 'Air Mancur Pendingin', 'Area Istirahat Warga']
  },
  {
    name: 'Taman Srigunting & Kawasan Berkanopi Kota Lama',
    district: 'Semarang Utara',
    type: 'Ruang Terbuka Cagar Budaya',
    estTemp: '33.2°C',
    tempReduction: '-1.9°C vs Area Pelabuhan',
    description: 'Titik sejuk dengan pohon beringin dan trembesi di tengah kawasan pesisir utara Semarang yang bersuhu tinggi.',
    features: ['Pohon Beringin Peneduh', 'Material Paving Berpori', 'Bebas Kendaraan Bermotor']
  },
  {
    name: 'Kawasan Wisata Waduk Jatibarang & Goa Kreo',
    district: 'Gunungpati',
    type: 'Resapan Air & Konservasi Hijau',
    estTemp: '28.0°C',
    tempReduction: '-5.2°C vs Pusat Kota',
    description: 'Kombinasi badan air masif dan tutupan kanopi lebat yang menghasilkan angin lembab sejuk alami.',
    features: ['Badan Air Pendingin', 'Vegetasi Alami Lebat', 'Breeze Angin Danau']
  }
];

export const PublicDashboardPage: React.FC = () => {
  const { navigateTo } = useAuth();

  // Search, filter, and temporal period state (FR-K05 Rule: Informasi temporal harus menunjukkan periode)
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Hotspot' | 'Hangat' | 'Neutral'>('all');
  const [selectedWilayahId, setSelectedWilayahId] = useState<string>('w-1'); // Default: Semarang Tengah
  const [viewMode, setViewMode] = useState<'map' | 'cards'>('map'); // Default to interactive thematic map
  const [selectedPeriod, setSelectedPeriod] = useState<'2024' | '2021' | '2018'>('2024');

  // Simulation state for citizen calculator
  const [simTrees, setSimTrees] = useState(250);
  const [simCoolRoof, setSimCoolRoof] = useState(20);

  // Period-specific temperature delta (2024 current vs 2021 vs 2018)
  const periodDelta = useMemo(() => {
    switch (selectedPeriod) {
      case '2021':
        return -0.8;
      case '2018':
        return -1.6;
      default:
        return 0;
    }
  }, [selectedPeriod]);

  // Selected district data with temporal adjustments
  const selectedWilayah = useMemo(() => {
    const raw = INITIAL_WILAYAH.find((w) => w.id === selectedWilayahId) || INITIAL_WILAYAH[0];
    return {
      ...raw,
      lst: Number((raw.lst + periodDelta).toFixed(1)),
    };
  }, [selectedWilayahId, periodDelta]);

  // Filtered districts list with period adjustments
  const filteredWilayah = useMemo(() => {
    return INITIAL_WILAYAH.map((w) => ({
      ...w,
      lst: Number((w.lst + periodDelta).toFixed(1)),
    })).filter((w) => {
      const matchSearch = w.wilayah.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.zoneType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || w.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [searchTerm, statusFilter, periodDelta]);

  // Calculated citizen impact simulation
  const simulationResult = useMemo(() => {
    // Approx 100 mature canopy trees in dense area can reduce local surface temp by ~0.15 - 0.25 °C
    const treeCooling = (simTrees / 100) * 0.18;
    // Cool roof reduces ambient solar absorption: ~0.03 °C per 5% cool roof adoption
    const roofCooling = (simCoolRoof / 5) * 0.035;
    const totalReduction = Math.min(2.5, Number((treeCooling + roofCooling).toFixed(2)));
    const projectedTemp = Number((selectedWilayah.lst - totalReduction).toFixed(1));
    const co2AbsorbedTons = Number(((simTrees * 22) / 1000).toFixed(1)); // ~22kg CO2 per mature tree/year

    return {
      reduction: totalReduction,
      projectedTemp,
      co2Absorbed: co2AbsorbedTons
    };
  }, [simTrees, simCoolRoof, selectedWilayah]);

  const getStatusBadge = (status: WilayahData['status']) => {
    switch (status) {
      case 'Hotspot':
        return 'badge--kunci';
      case 'Hangat':
        return 'badge--hangat';
      default:
        return 'badge--outline';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header & Banner Status Publik */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="badge badge--hangat text-xs font-bold uppercase tracking-wider">
              FR-K05: DASHBOARD INFORMASI UHI
            </span>
            <span className="text-xs font-medium text-[#8A7E84] bg-white px-2.5 py-1 rounded-md border border-[#ECE4E8] flex items-center gap-1">
              <Database className="w-3 h-3 text-[#6E3E53]" />
              Knowledge Repository Terpadu
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8A7E84]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
            <span>Periode {selectedPeriod}: {selectedPeriod === '2024' ? 'Landsat 9 TIRS & BMKG (Aktif)' : selectedPeriod === '2021' ? 'Landsat 8 OLI/TIRS GEE' : 'Baseline UHI Kota'}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#272023] tracking-tight">
          Dashboard Pantauan UHI Kota Semarang
        </h1>
        <p className="text-base sm:text-lg text-[#595155] mt-3 max-w-3xl leading-relaxed">
          Pusat visualisasi pengetahuan Urban Heat Island (UHI) berbasis data spasial Landsat, BMKG, dan BPS untuk mendukung pemangku kebijakan (BAPPEDA, DLH), akademisi, dan masyarakat.
        </p>
      </header>

      {/* Hero Strip: Indeks Kenyamanan Termal & Peringatan Dini Warga */}
      <section className="mb-12 bg-white border-2 border-[#ECE4E8] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-[#B91C1C] font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Status Suhu Permukaan (LST) — Periode {selectedPeriod}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#272023]">
              Waspada Efek Terik di Dataran Rendah &amp; Koridor Arteri
            </h2>
            <p className="text-sm text-[#595155] leading-relaxed">
              Zona pusat kota (Semarang Tengah, Semarang Timur) dan kawasan industri pesisir (Semarang Utara, Genuk) mencatat anomali panas permukaan hingga <strong className="text-[#B91C1C]">{(38.4 + periodDelta).toFixed(1)}°C</strong>. Wilayah perbukitan selatan (Gunungpati, Mijen) berperan sebagai zona pendingin alami utama.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#FAF7F5] rounded-2xl p-4 border border-[#ECE4E8] text-center">
              <span className="text-xs text-[#8A7E84] block">LST Tertinggi</span>
              <strong className="text-2xl font-extrabold font-display text-[#B91C1C]">
                {(38.4 + periodDelta).toFixed(1)}°
              </strong>
              <span className="text-[10px] text-[#B91C1C] block font-semibold mt-0.5">Semarang Tengah</span>
            </div>

            <div className="bg-[#FAF7F5] rounded-2xl p-4 border border-[#ECE4E8] text-center">
              <span className="text-xs text-[#8A7E84] block">LST Tersejuk</span>
              <strong className="text-2xl font-extrabold font-display text-[#10B981]">
                {(28.8 + periodDelta).toFixed(1)}°
              </strong>
              <span className="text-[10px] text-[#10B981] block font-semibold mt-0.5">Gunungpati</span>
            </div>

            <div className="bg-[#FAF7F5] rounded-2xl p-4 border border-[#ECE4E8] text-center col-span-2 sm:col-span-1">
              <span className="text-xs text-[#8A7E84] block">Rerata Kota</span>
              <strong className="text-2xl font-extrabold font-display text-[#272023]">
                {(33.8 + periodDelta).toFixed(1)}°
              </strong>
              <span className="text-[10px] text-[#8A7E84] block font-semibold mt-0.5">16 Kecamatan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric Section: Interactive District Matrix + District Inspection Panel */}
      <section className="mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <p className="eyebrow flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#6E3E53]" />
              Pantauan 16 Kecamatan
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#272023]">
              Peta &amp; Matriks Spasial UHI Kota Semarang
            </h2>
            <p className="text-sm text-[#8A7E84] mt-1">
              Visualisasi indikator LST, NDVI, NDBI, dan kerentanan panas per kecamatan sesuai FR-K05.
            </p>
          </div>

          {/* Search, View Mode, and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle: Peta Tematik vs Kartu */}
            <div className="flex items-center gap-1 bg-[#FAF7F5] p-1 rounded-xl border border-[#ECE4E8] text-xs shadow-sm">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                  viewMode === 'map'
                    ? 'bg-[#6E3E53] text-white shadow-sm'
                    : 'text-[#8A7E84] hover:text-[#272023]'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                Peta UHI
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                  viewMode === 'cards'
                    ? 'bg-[#6E3E53] text-white shadow-sm'
                    : 'text-[#8A7E84] hover:text-[#272023]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Daftar Wilayah
              </button>
            </div>

            {/* Periode Data Selector (FR-K05: Pengguna dapat memilih wilayah dan periode) */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#ECE4E8] text-xs shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-[#6E3E53] ml-1.5 mr-0.5" />
              <span className="text-[11px] text-[#8A7E84] font-semibold hidden sm:inline mr-1">Periode:</span>
              {(['2024', '2021', '2018'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPeriod(p)}
                  className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                    selectedPeriod === p
                      ? 'bg-[#272023] text-white font-semibold'
                      : 'text-[#8A7E84] hover:text-[#272023]'
                  }`}
                  title={`Tampilkan data periode ${p}`}
                >
                  {p}
                </button>
              ))}
            </div>

            {viewMode === 'cards' && (
              <>
                <div className="relative">
                  <Search className="w-4 h-4 text-[#8A7E84] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari kecamatan..."
                    className="pl-9 pr-3 py-1.5 rounded-xl border border-[#ECE4E8] bg-white text-xs text-[#272023] focus:outline-none focus:border-[#6E3E53] w-40 sm:w-48 shadow-sm"
                  />
                </div>

                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#ECE4E8] text-xs shadow-sm">
                  {(['all', 'Hotspot', 'Hangat', 'Neutral'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                        statusFilter === st
                          ? 'bg-[#6E3E53] text-white font-semibold'
                          : 'text-[#8A7E84] hover:text-[#272023]'
                      }`}
                    >
                      {st === 'all' ? 'Semua' : st}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* View Mode 1: Interactive Thematic Map View */}
        {viewMode === 'map' ? (
          <div className="space-y-4">
            <ThematicMapViewer
              districts={INITIAL_WILAYAH}
              selectedDistrictId={selectedWilayahId}
              onSelectDistrict={(id) => setSelectedWilayahId(id)}
            />
          </div>
        ) : (
          /* View Mode 2: 12-Column Asymmetric Layout (7 Columns Grid + 5 Columns Inspection) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Grid: 16 Districts Matrix (Span 7) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[580px] overflow-y-auto pr-1">
              {filteredWilayah.map((w) => {
                const isSelected = w.id === selectedWilayah.id;
                return (
                  <div
                    key={w.id}
                    onClick={() => setSelectedWilayahId(w.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#EEDDE4]/30 border-[#6E3E53] shadow-md ring-2 ring-[#6E3E53]/20'
                        : 'bg-white border-[#ECE4E8] hover:border-[#6E3E53]/40 hover:bg-[#FAF7F5]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-bold text-sm text-[#272023] group-hover:text-[#6E3E53]">
                        {w.wilayah}
                      </span>
                      <span className={`badge ${getStatusBadge(w.status)} text-[10px]`}>
                        {w.status}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between mt-2">
                      <div>
                        <span className="text-2xl font-black font-display text-[#B91C1C]">
                          {w.lst}°C
                        </span>
                        <span className="text-[10px] text-[#8A7E84] block font-medium">
                          LST Maksimum
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[#272023] block">
                          {w.vegetationCoverPct}%
                        </span>
                        <span className="text-[10px] text-[#8A7E84] block">
                          Tutupan RTH
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-[#ECE4E8] h-1.5 rounded-full overflow-hidden mt-3">
                      <div
                        className={`h-full rounded-full ${
                          w.lst >= 36 ? 'bg-[#6E3E53]' : w.lst >= 33 ? 'bg-[#936277]' : 'bg-[#10B981]'
                        }`}
                        style={{ width: `${Math.min(100, (w.lst / 40) * 100)}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#8A7E84] mt-2 pt-1 border-t border-[#ECE4E8]/60">
                      <span>{w.zoneType}</span>
                      <span className="text-[#6E3E53] font-semibold flex items-center gap-0.5">
                        {isSelected ? 'Terpilih ✓' : 'Pilih'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-[#8A7E84] text-center sm:text-left">
              Menampilkan {filteredWilayah.length} dari {INITIAL_WILAYAH.length} kecamatan Kota Semarang.
            </p>
          </div>

          {/* Right Column: Detailed District Inspection Card (Span 5) */}
          <div className="lg:col-span-5 bg-white border border-[#ECE4E8] rounded-3xl p-6 sm:p-7 shadow-sm sticky top-24 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#ECE4E8]">
              <div>
                <span className="text-xs font-extrabold text-[#6E3E53] uppercase tracking-wider block">
                  Detail Profil Wilayah
                </span>
                <h3 className="text-2xl font-bold font-display text-[#272023] mt-0.5">
                  {selectedWilayah.wilayah}
                </h3>
              </div>
              <span className={`badge ${getStatusBadge(selectedWilayah.status)} text-xs px-3 py-1 font-bold`}>
                {selectedWilayah.status}
              </span>
            </div>

            {/* Metric Comparison: LST, NDVI, NDBI (FR-K05 Step 3) */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-2xl bg-[#EEDDE4]/30 border border-[#ECE4E8] text-center">
                <span className="text-[10px] text-[#8A7E84] block uppercase font-bold tracking-wider">LST</span>
                <strong className="text-xl font-extrabold text-[#B91C1C] font-display block mt-0.5">
                  {selectedWilayah.lst}°C
                </strong>
                <span className="text-[9px] text-[#6E3E53] font-semibold block mt-0.5">
                  Suhu Termal
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#EEDDE4]/30 border border-[#ECE4E8] text-center">
                <span className="text-[10px] text-[#8A7E84] block uppercase font-bold tracking-wider">NDVI</span>
                <strong className="text-xl font-extrabold text-[#10B981] font-display block mt-0.5">
                  {selectedWilayah.ndvi}
                </strong>
                <span className="text-[9px] text-[#8A7E84] font-semibold block mt-0.5">
                  {selectedWilayah.vegetationCoverPct}% RTH
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#EEDDE4]/30 border border-[#ECE4E8] text-center">
                <span className="text-[10px] text-[#8A7E84] block uppercase font-bold tracking-wider">NDBI</span>
                <strong className="text-xl font-extrabold text-[#5A2C40] font-display block mt-0.5">
                  {selectedWilayah.ndbi ?? 0.35}
                </strong>
                <span className="text-[9px] text-[#8A7E84] font-semibold block mt-0.5">
                  {selectedWilayah.imperviousSurfacePct ?? 80}% Kedap
                </span>
              </div>
            </div>

            {/* Environmental Assessment */}
            <div className="space-y-2.5 text-xs text-[#595155]">
              <div className="flex items-center justify-between py-1.5 border-b border-[#ECE4E8]">
                <span className="text-[#8A7E84]">Klasifikasi Zona:</span>
                <span className="font-bold text-[#272023]">{selectedWilayah.zoneType}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#ECE4E8]">
                <span className="text-[#8A7E84]">Kategori Risiko:</span>
                <span className="font-bold text-[#6E3E53]">{selectedWilayah.kategori}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#ECE4E8]">
                <span className="text-[#8A7E84]">Tingkat Prioritas RTH:</span>
                <span className="font-bold text-[#272023]">
                  {'★'.repeat(selectedWilayah.priorityRTH)}
                  <span className="text-[#B8ACB3]">{'★'.repeat(5 - selectedWilayah.priorityRTH)}</span>
                  {' '}(Tingkat {selectedWilayah.priorityRTH}/5)
                </span>
              </div>
            </div>

            {/* Recommendation Box for Residents & Communities */}
            <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#ECE4E8]">
              <p className="text-xs font-bold text-[#272023] flex items-center gap-1.5 mb-2">
                <Trees className="w-4 h-4 text-[#10B981]" />
                Rekomendasi Aksi Lingkungan:
              </p>
              <ul className="text-xs text-[#595155] space-y-1.5 list-disc list-inside">
                {selectedWilayah.lst >= 36 ? (
                  <>
                    <li>Pemasangan kanopi tanaman rambat di pekarangan dan teras rumah.</li>
                    <li>Penggunaan cat genteng/atap reflektif (*albedo tinggi*) untuk mengurangi panas masuk.</li>
                    <li>Partisipasi dalam gerakan tanam pohon peneduh (Trembesi / Tabebuya).</li>
                  </>
                ) : (
                  <>
                    <li>Pertahankan keasrian vegetasi pekarangan dan hindari perkerasan semen masif.</li>
                    <li>Manfaatkan ruang terbuka hijau untuk sirkulasi udara lingkungan.</li>
                    <li>Dukung program pelestarian mata air dan resapan biopori.</li>
                  </>
                )}
              </ul>
            </div>

            {/* Action CTA buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => navigateTo('knowledge')}
                className="btn btn--outline btn--small flex-1 justify-center cursor-pointer text-xs"
              >
                Lihat Kajian Lengkap
              </button>
              <button
                onClick={() => navigateTo('chat')}
                className="btn btn--primary btn--small flex-1 justify-center cursor-pointer text-xs flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Tanya AI UHI
              </button>
            </div>
          </div>
        </div>
        )}
      </section>

      {/* FR-K05 Step 4 & 5: Tren Kondisi UHI & Hasil Clustering Wilayah Prioritas */}
      <section className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step 4: Tren Kondisi UHI Multi-Temporal & Musiman (Span 6) */}
        <div className="lg:col-span-6 bg-white border border-[#ECE4E8] rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="badge badge--hangat text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <BarChart3 className="w-3 h-3 text-[#6E3E53]" />
                FR-K05: TREN KONDISI UHI
              </span>
              <span className="text-[11px] text-[#8A7E84] bg-[#FAF7F5] px-2.5 py-1 rounded-md border border-[#ECE4E8]">
                Multi-Temporal 2018–2027
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#272023] mt-1">
              Evolusi Suhu Permukaan &amp; Proyeksi
            </h3>
            <p className="text-xs text-[#595155] mt-1 leading-relaxed">
              Analisis deret waktu sensor satelit Landsat menunjukkan kenaikan rerata suhu permukaan sebesar <strong className="text-[#B91C1C]">+1.6°C</strong> dalam 6 tahun terakhir akibat konversi lahan vegetasi menjadi perkerasan kedap air (NDBI tinggi).
            </p>

            {/* Visual Timeline / Trend Progression */}
            <div className="space-y-3 mt-5">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#595155]">2018 (Baseline Bappeda)</span>
                  <span className="text-[#272023]">32.2°C <span className="text-[10px] text-[#8A7E84] font-normal">(Hotspot: 18.4 km²)</span></span>
                </div>
                <div className="w-full bg-[#ECE4E8] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#936277] h-full rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#595155]">2021 (Landsat 8 GEE)</span>
                  <span className="text-[#272023]">33.0°C <span className="text-[10px] text-[#B91C1C] font-normal">(+0.8°C | 24.1 km²)</span></span>
                </div>
                <div className="w-full bg-[#ECE4E8] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#6E3E53] h-full rounded-full" style={{ width: '74%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#6E3E53] font-bold">2024 (Landsat 9 + BMKG Terkini)</span>
                  <span className="text-[#B91C1C] font-bold">33.8°C <span className="text-[10px] font-normal">(+1.6°C | 31.8 km²)</span></span>
                </div>
                <div className="w-full bg-[#EEDDE4] h-2.5 rounded-full overflow-hidden p-0.5">
                  <div className="bg-[#6E3E53] h-full rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#ECE4E8]">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#8A7E84] italic">Proyeksi 2027 (BAU tanpa mitigasi)</span>
                  <span className="text-[#B91C1C] font-bold">34.5°C <span className="text-[10px] font-normal">(Prediksi RF)</span></span>
                </div>
                <div className="w-full bg-[#FAF7F5] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#B91C1C] h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-2xl bg-[#FAF7F5] border border-[#ECE4E8] text-[11px] text-[#595155] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#6E3E53] shrink-0" />
            <span>
              <strong>Fluktuasi Musiman:</strong> Puncak suhu terik terjadi pada September–Oktober (kemarau), dengan selisih hingga <strong>4.2°C</strong> lebih tinggi dibanding periode basah Januari–Februari.
            </span>
          </div>
        </div>

        {/* Step 5: Hasil Clustering DBSCAN & Wilayah Prioritas (Span 6) */}
        <div className="lg:col-span-6 bg-white border border-[#ECE4E8] rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="badge badge--kunci text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Compass className="w-3 h-3 text-[#5A2C40]" />
                FR-K05: HASIL CLUSTERING &amp; PRIORITAS
              </span>
              <span className="text-[11px] text-[#8A7E84] bg-[#FAF7F5] px-2.5 py-1 rounded-md border border-[#ECE4E8]">
                Algoritma DBSCAN (FR-A08)
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#272023] mt-1">
              Klaster Spasial &amp; Zonasi Intervensi
            </h3>
            <p className="text-xs text-[#595155] mt-1 leading-relaxed">
              Pengelompokan 16 kecamatan berdasarkan densitas LST, koefisien vegetasi (NDVI), dan indeks terbangun (NDBI) untuk menentukan skala prioritas mitigasi (FR-M01).
            </p>

            {/* Clusters List */}
            <div className="space-y-3 mt-4">
              {/* Cluster 1 */}
              <div
                onClick={() => setSelectedWilayahId('w-1')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedWilayah.id === 'w-1' || selectedWilayah.id === 'w-2' || selectedWilayah.id === 'w-3' || selectedWilayah.id === 'w-4'
                    ? 'bg-[#EEDDE4]/40 border-[#6E3E53] shadow-sm'
                    : 'bg-white border-[#ECE4E8] hover:border-[#6E3E53]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]"></span>
                    <strong className="text-xs font-bold text-[#272023]">Klaster 1: Hotspot Kritis &amp; Padat Terbangun</strong>
                  </div>
                  <span className="badge badge--kunci text-[9px] font-bold">Prioritas 1</span>
                </div>
                <p className="text-[11px] text-[#595155] leading-relaxed">
                  Semarang Tengah, Semarang Utara, Semarang Timur, Genuk. Karakteristik: LST &gt; 36.8°C, NDBI &gt; 0.30, tutupan RTH &lt; 12%.
                </p>
                <span className="text-[10px] text-[#6E3E53] font-semibold block mt-1">
                  Intervensi: Cool roof reflektif, kanopi jalan arteri, saku hijau perkotaan.
                </span>
              </div>

              {/* Cluster 2 */}
              <div
                onClick={() => setSelectedWilayahId('w-5')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  ['w-5', 'w-6', 'w-7', 'w-8', 'w-9', 'w-10'].includes(selectedWilayah.id)
                    ? 'bg-[#EEDDE4]/40 border-[#6E3E53] shadow-sm'
                    : 'bg-white border-[#ECE4E8] hover:border-[#6E3E53]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#936277]"></span>
                    <strong className="text-xs font-bold text-[#272023]">Klaster 2: Koridor Transisi &amp; Komersial</strong>
                  </div>
                  <span className="badge badge--hangat text-[9px] font-bold">Prioritas 2</span>
                </div>
                <p className="text-[11px] text-[#595155] leading-relaxed">
                  Semarang Barat, Semarang Selatan, Candisari, Gajahmungkur, Gayamsari, Pedurungan. Karakteristik: LST 33.0–35.5°C.
                </p>
                <span className="text-[10px] text-[#936277] font-semibold block mt-1">
                  Intervensi: Koridor ventilasi angin sungai, peneduh pekarangan pemukiman.
                </span>
              </div>

              {/* Cluster 3 */}
              <div
                onClick={() => setSelectedWilayahId('w-11')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  ['w-11', 'w-12', 'w-13', 'w-14', 'w-15', 'w-16'].includes(selectedWilayah.id)
                    ? 'bg-[#EEDDE4]/40 border-[#6E3E53] shadow-sm'
                    : 'bg-white border-[#ECE4E8] hover:border-[#6E3E53]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                    <strong className="text-xs font-bold text-[#272023]">Klaster 3: Penyangga Perbukitan &amp; Alami</strong>
                  </div>
                  <span className="badge badge--outline text-[9px] font-bold text-[#10B981] border-[#10B981]">Konservasi</span>
                </div>
                <p className="text-[11px] text-[#595155] leading-relaxed">
                  Gunungpati, Mijen, Banyumanik, Ngaliyan, Tugu, Tembalang. Karakteristik: LST &lt; 32.0°C, NDVI tinggi (&gt; 0.45).
                </p>
                <span className="text-[10px] text-[#059669] font-semibold block mt-1">
                  Intervensi: Moratorium alih fungsi lahan resapan, perlindungan hutan kota Tinjomoyo.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#ECE4E8] flex items-center justify-between text-[11px] text-[#8A7E84]">
            <span>Klik salah satu klaster di atas untuk menyorot kecamatan terkait.</span>
            <span className="text-[#6E3E53] font-semibold">Tersinkronisasi Repository</span>
          </div>
        </div>
      </section>

      {/* Interactive Citizen Microclimate Simulator (Kalkulator Warga) */}
      <section className="mb-14 bg-[#272023] text-white rounded-3xl p-7 sm:p-9 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl mb-8">
          <span className="w-9 h-9 rounded-xl bg-[#6E3E53] text-white flex items-center justify-center mb-3">
            <Sliders className="w-5 h-5" />
          </span>
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#EEDDE4]">
            Kalkulator Warga &amp; Komunitas
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            Simulasi Dampak Mitigasi Hijau di {selectedWilayah.wilayah}
          </h2>
          <p className="text-sm text-[#E7E0E3] mt-2 leading-relaxed">
            Eksplorasi bagaimana penanaman pohon peneduh dan penerapan atap reflektif dapat menurunkan suhu panas permukaan lingkungan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders Area (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slider 1: Canopy Trees */}
            <div className="bg-[#383034] p-5 rounded-2xl border border-[#4E4348]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <Trees className="w-4 h-4 text-[#10B981]" />
                  Penambahan Pohon Kanopi Rindang (Pohon)
                </label>
                <span className="text-base font-extrabold text-[#EEDDE4] font-mono">
                  {simTrees} pohon
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={simTrees}
                onChange={(e) => setSimTrees(Number(e.target.value))}
                className="w-full accent-[#936277] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#B8ACB3] mt-1">
                <span>0 pohon</span>
                <span>500 pohon (skala kelurahan)</span>
                <span>1000 pohon</span>
              </div>
            </div>

            {/* Slider 2: Cool Roof adoption */}
            <div className="bg-[#383034] p-5 rounded-2xl border border-[#4E4348]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#38BDF8]" />
                  Adopsi Atap Dingin / Reflektif (*Cool Roof*)
                </label>
                <span className="text-base font-extrabold text-[#EEDDE4] font-mono">
                  {simCoolRoof}% bangunan
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={simCoolRoof}
                onChange={(e) => setSimCoolRoof(Number(e.target.value))}
                className="w-full accent-[#936277] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#B8ACB3] mt-1">
                <span>0%</span>
                <span>30% adopsi perumahan</span>
                <span>60% maksimal</span>
              </div>
            </div>
          </div>

          {/* Outcome Visualizer (Span 5) */}
          <div className="lg:col-span-5 bg-[#383034] border border-[#4E4348] rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#4E4348]">
              <span className="text-xs text-[#B8ACB3] font-medium">Estimasi Hasil Simulasi</span>
              <span className="text-xs font-mono font-bold text-[#10B981] flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" />
                Potensi Reduksi Panas
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#B8ACB3] block">Suhu Semula:</span>
                <span className="text-xl font-bold line-through text-[#8A7E84]">
                  {selectedWilayah.lst}°C
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-[#EEDDE4]" />
              <div className="text-right">
                <span className="text-xs text-[#10B981] font-semibold block">Proyeksi Suhu Baru:</span>
                <span className="text-3xl font-extrabold text-[#EEDDE4] font-display">
                  {simulationResult.projectedTemp}°C
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[#272023] p-3 rounded-xl border border-[#4E4348] text-center">
                <span className="text-[10px] text-[#B8ACB3] block">Penurunan LST</span>
                <strong className="text-xl font-bold text-[#10B981]">
                  -{simulationResult.reduction}°C
                </strong>
              </div>
              <div className="bg-[#272023] p-3 rounded-xl border border-[#4E4348] text-center">
                <span className="text-[10px] text-[#B8ACB3] block">Serapan CO2 / Tahun</span>
                <strong className="text-xl font-bold text-[#38BDF8]">
                  {simulationResult.co2Absorbed} Ton
                </strong>
              </div>
            </div>

            <p className="text-[11px] text-[#B8ACB3] leading-relaxed">
              *Model estimasi berdasarkan koefisien evaporatif kanopi pohon rimbun (Landsat LST model, 2026).
            </p>
          </div>
        </div>
      </section>

      {/* Ruang Sejuk & Titik Teduh Publik (Public Cool Spaces in Semarang) */}
      <section className="mb-14">
        <div className="max-w-3xl mb-8">
          <p className="eyebrow flex items-center gap-1.5">
            <Trees className="w-3.5 h-3.5 text-[#10B981]" />
            Ruang Terbuka Hijau &amp; Titik Teduh
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#272023]">
            Taman Kota &amp; Ruang Pendingin Alami untuk Warga
          </h2>
          <p className="text-sm text-[#8A7E84] mt-1">
            Daftar ruang hijau publik di Kota Semarang dengan iklim mikro sejuk sebagai tempat perlindungan dari cuaca terik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PUBLIC_COOL_SPACES.map((park, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#ECE4E8] rounded-3xl p-6 sm:p-7 shadow-sm hover:border-[#6E3E53]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="badge badge--hangat text-[10px] font-bold">
                    {park.type}
                  </span>
                  <span className="text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-lg border border-[#A7F3D0]">
                    {park.tempReduction}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-display text-[#272023]">
                    {park.name}
                  </h3>
                  <p className="text-xs text-[#8A7E84] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#6E3E53]" />
                    {park.district}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#595155] leading-relaxed">
                  {park.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {park.features.map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-2.5 py-1 rounded-md bg-[#FAF7F5] border border-[#ECE4E8] text-[11px] text-[#8A7E84]"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-[#ECE4E8] flex items-center justify-between text-xs text-[#8A7E84]">
                <span>Suhu Rerata Area: <strong>{park.estTemp}</strong></span>
                <span className="text-[#6E3E53] font-semibold">Tersedia untuk Publik</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rekomendasi Tanaman Peneduh Pekarangan & Tips Warga */}
      <section className="p-7 sm:p-8 rounded-3xl bg-[#FAF7F5] border border-[#ECE4E8] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#272023]">
              Ingin Berkontribusi Menyejukkan Lingkungan Rumah Anda?
            </h3>
            <p className="text-sm text-[#595155] leading-relaxed">
              Dinas Lingkungan Hidup Kota Semarang merekomendasikan penanaman jenis pohon peneduh lokal berdaya transpirasi tinggi seperti <strong>Trembesi (*Samanea saman*)</strong>, <strong>Tabebuya Kuning</strong>, dan <strong>Ketapang Kencana</strong>, serta perbanyakan biopori resapan air di pekarangan.
            </p>
            <div className="flex flex-wrap gap-3 pt-1 text-xs text-[#8A7E84]">
              <span>✓ Mengurangi panas radiasi hingga 3.5°C</span>
              <span>✓ Menahan debu &amp; polutan udara</span>
              <span>✓ Meningkatkan kenyamanan termal keluarga</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              onClick={() => navigateTo('chat')}
              className="btn btn--primary text-xs sm:text-sm py-2.5 px-4 justify-center flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              Tanya Solusi Pohon ke AI
            </button>
            <button
              onClick={() => navigateTo('knowledge')}
              className="btn btn--outline text-xs sm:text-sm py-2.5 px-4 justify-center cursor-pointer"
            >
              Buka Pustaka Panduan RTH
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
