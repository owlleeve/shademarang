import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  MOCK_DATA_SOURCES,
  MOCK_AI_PREDICTIONS,
  MOCK_DBSCAN_CLUSTERS,
  MOCK_AI_VALIDATIONS,
  MOCK_API_ENDPOINTS,
  MOCK_POST_MITIGATION_RECORDS,
  MOCK_MODEL_VERSIONS,
  INITIAL_WILAYAH
} from '../data/mockData';
import { DataSourceItem, AIValidationRecord, PostMitigationRecord } from '../types';
import {
  Layers,
  Database,
  Cpu,
  Archive,
  Share2,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  BookOpen,
  ArrowRight,
  TrendingDown,
  Terminal,
  Activity,
  Award,
  Sparkles,
  HelpCircle,
  FileCheck2,
  Zap,
  RotateCw
} from 'lucide-react';

export const KmsLifecyclePage: React.FC = () => {
  const { navigateTo, user } = useAuth();
  const [activeModule, setActiveModule] = useState<'capture' | 'create' | 'ai' | 'store' | 'share' | 'apply' | 'evaluate'>('capture');

  // Interactive states for Module 1 (Capture)
  const [dataSources, setDataSources] = useState<DataSourceItem[]>(MOCK_DATA_SOURCES);
  const [validatingSources, setValidatingSources] = useState(false);
  const [validationSuccessBanner, setValidationSuccessBanner] = useState(false);

  // Interactive states for Module 2 (Create)
  const [selectedDistrictForSynthesis, setSelectedDistrictForSynthesis] = useState<string>('Semarang Tengah');
  const [synthesisGenerated, setSynthesisGenerated] = useState<boolean>(true);

  // Interactive states for Module 3 (AI)
  const [aiValidations, setAiValidations] = useState<AIValidationRecord[]>(MOCK_AI_VALIDATIONS);
  const [rfScenario, setRfScenario] = useState<'bau' | 'mitigation'>('bau');

  // Interactive states for Module 5 (Share - API Tester)
  const [activeApiIndex, setActiveApiIndex] = useState<number>(0);

  // Interactive states for Module 6 (Apply - Simulator)
  const [simWilayah, setSimWilayah] = useState<string>('Semarang Tengah');
  const [simRthAddition, setSimRthAddition] = useState<number>(5); // +5%
  const [simAlbedoLevel, setSimAlbedoLevel] = useState<'standar' | 'tinggi' | 'ekstrem'>('tinggi');
  const [simTreeCount, setSimTreeCount] = useState<number>(200);

  // Interactive states for Module 7 (Evaluate - Anomaly & Retrain)
  const [postRecords, setPostRecords] = useState<PostMitigationRecord[]>(MOCK_POST_MITIGATION_RECORDS);
  const [modelVersions, setModelVersions] = useState(MOCK_MODEL_VERSIONS);
  const [isRetraining, setIsRetraining] = useState(false);
  const [retrainSuccess, setRetrainSuccess] = useState(false);

  // Helper for FR-02: Trigger Validation
  const handleRunValidation = () => {
    setValidatingSources(true);
    setValidationSuccessBanner(false);
    setTimeout(() => {
      setDataSources((prev) =>
        prev.map((src) =>
          src.id === 'src-4'
            ? { ...src, crossValidationStatus: 'Valid / Lolos', completenessPct: 98.2, bmkgCorrelationR: 0.82 }
            : src
        )
      );
      setValidatingSources(false);
      setValidationSuccessBanner(true);
    }, 1200);
  };

  // Helper for FR-10: Toggle AI Model Approval
  const handleToggleValidationStatus = (id: string) => {
    setAiValidations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'Tervalidasi' ? 'Perlu Perbaikan' : 'Tervalidasi'
            }
          : item
      )
    );
  };

  // Helper for FR-19: Calculate Estimated Cooling Delta
  const selectedWilayahObj = INITIAL_WILAYAH.find((w) => w.wilayah === simWilayah) || INITIAL_WILAYAH[0];
  const rthCooling = (simRthAddition * 0.18); // ~0.18°C per 1% RTH
  const albedoCooling = simAlbedoLevel === 'ekstrem' ? 1.4 : simAlbedoLevel === 'tinggi' ? 0.8 : 0.2;
  const treeCooling = (simTreeCount / 100) * 0.25; // ~0.25°C per 100 trees
  const totalCooling = Math.min(3.8, parseFloat((rthCooling + albedoCooling + treeCooling).toFixed(2)));
  const estimatedNewLst = (selectedWilayahObj.lst - totalCooling).toFixed(1);

  // Helper for FR-24: Retrain Model AI
  const handleRetrainModel = () => {
    setIsRetraining(true);
    setRetrainSuccess(false);
    setTimeout(() => {
      const nextVer = `RF-v2.${modelVersions.length}`;
      const newVersionItem = {
        version: `${nextVer} (Baru)`,
        algorithm: 'Random Forest' as const,
        trainingDataCutoff: 'Dataset Spasial 2026 + Hasil Evaluasi Pasca-mitigasi Lapangan',
        sampleCount: 14200,
        accuracyMetric: 'R² = 0.934, RMSE = 0.49°C',
        status: 'Aktif di Produksi' as const,
        releaseDate: 'Hari ini'
      };

      setModelVersions((prev) => [
        newVersionItem,
        ...prev.map((v) => ({ ...v, status: 'Arsip' as const }))
      ]);
      setIsRetraining(false);
      setRetrainSuccess(true);
    }, 1500);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF7F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEDDE4] border border-[#ECE4E8] text-xs font-bold text-[#5A2C40] mb-3">
            <Layers className="w-3.5 h-3.5" />
            7 Siklus Pengetahuan UHI · FR-01 s/d FR-25
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#272023] tracking-tight">
            Siklus Knowledge Management System
          </h1>
          <p className="text-base text-[#595155] max-w-3xl mt-2 leading-relaxed">
            Alur siklus lengkap pengelolaan pulau panas perkotaan Kota Semarang: dari akuisisi citra satelit, ekstraksi indikator, pemodelan AI (Random Forest & DBSCAN), repositori pengetahuan, distribusi lintas dinas, perencanaan mitigasi, hingga monitoring evaluasi pascamitigasi.
          </p>
        </div>

        {/* 7 Modules Navigation Tabs */}
        <div className="bg-white rounded-2xl border border-[#ECE4E8] p-1.5 shadow-sm mb-8 overflow-x-auto flex gap-1 scrollbar-none">
          {[
            { id: 'capture', label: '1. Capture', sub: 'Akuisisi Data (FR 01-02)', icon: Database },
            { id: 'create', label: '2. Create', sub: 'Penciptaan (FR 03-07)', icon: Layers },
            { id: 'ai', label: '3. AI Modul', sub: 'Prediksi & Klaster (FR 08-10)', icon: Cpu },
            { id: 'store', label: '4. Store', sub: 'Repositori (FR 11-13)', icon: Archive },
            { id: 'share', label: '5. Share', sub: 'Distribusi & API (FR 14-17)', icon: Share2 },
            { id: 'apply', label: '6. Apply', sub: 'Perencanaan (FR 18-19)', icon: Sliders },
            { id: 'evaluate', label: '7. Evaluate', sub: 'Evaluasi & Retrain (FR 20-25)', icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeModule === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveModule(tab.id as any)}
                className={`flex-1 min-w-[130px] sm:min-w-[150px] px-3.5 py-3 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                  isActive
                    ? 'bg-[#EEDDE4] text-[#5A2C40] font-bold shadow-xs'
                    : 'text-[#595155] hover:text-[#272023] hover:bg-[#FAF7F5]'
                }`}
                id={`tab-module-${tab.id}`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#6E3E53]' : 'text-[#8A7E84]'}`} />
                  <span className="text-xs sm:text-sm font-bold tracking-tight">{tab.label}</span>
                </div>
                <span className="text-[10px] text-[#8A7E84] truncate pl-6">
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODULE 1: CAPTURE */}
        {/* ------------------------------------------------------------- */}
        {activeModule === 'capture' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#ECE4E8] p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE4E8] pb-4 mb-6">
                <div>
                  <span className="badge badge--admin text-xs mb-1.5">MODUL 1: CAPTURE</span>
                  <h3 className="text-xl font-bold font-display text-[#272023]">
                    FR-01: Integrasi Sumber Data & FR-02: Validasi Kualitas Data
                  </h3>
                  <p className="text-sm text-[#595155] mt-1">
                    Pengambilan data citra Landsat 8/9 GEE, stasiun cuaca BMKG, BPS, dan geospasial RTH dengan validasi silang otomatis sebelum diteruskan ke analisis UHI.
                  </p>
                </div>
                <button
                  onClick={handleRunValidation}
                  disabled={validatingSources}
                  className="btn btn--primary btn--small flex items-center gap-2 self-start sm:self-auto cursor-pointer"
                  id="btn-run-validation"
                >
                  <RefreshCw className={`w-4 h-4 ${validatingSources ? 'animate-spin' : ''}`} />
                  {validatingSources ? 'Memvalidasi Silang...' : 'Jalankan Validasi Silang (FR-02)'}
                </button>
              </div>

              {validationSuccessBanner && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>
                      <strong>Validasi Silang Selesai:</strong> Seluruh 4 dataset berhasil dikalibrasi terhadap observasi suhu Stasiun BMKG Maritim Tanjung Emas. Status dataset telah memenuhi kriteria untuk masuk ke tahap pra-pengolahan (FR-03).
                    </span>
                  </div>
                  <button
                    onClick={() => setValidationSuccessBanner(false)}
                    className="text-xs font-bold underline cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              )}

              {/* Data Sources Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#ECE4E8] text-[#595155] text-xs uppercase font-bold bg-[#FFFFFF]">
                      <th className="py-3 px-4">Nama Sumber Data (FR-01)</th>
                      <th className="py-3 px-4">Penyedia / Sumber</th>
                      <th className="py-3 px-4">Periode</th>
                      <th className="py-3 px-4">Kelengkapan</th>
                      <th className="py-3 px-4">Korelasi BMKG (r)</th>
                      <th className="py-3 px-4">Status Validasi (FR-02)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ECE4E8]">
                    {dataSources.map((ds) => (
                      <tr key={ds.id} className="hover:bg-[#FAF7F5]/50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#272023]">
                          {ds.sourceName}
                          <span className="block text-[11px] font-normal text-[#595155] mt-0.5">
                            {ds.recordCount} · Sinkron: {ds.lastSync}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[#595155] font-semibold">{ds.provider}</td>
                        <td className="py-3.5 px-4 text-[#272023]">{ds.period}</td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-[#ECE4E8] h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-[#6E3E53] h-full rounded-full"
                                style={{ width: `${ds.completenessPct}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold text-[#272023]">{ds.completenessPct}%</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-[#5A2C40]">
                          {ds.bmkgCorrelationR ? `r = ${ds.bmkgCorrelationR}` : '-'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`badge ${
                              ds.crossValidationStatus === 'Valid / Lolos'
                                ? 'badge--hangat'
                                : 'badge--menunggu text-amber-700 bg-amber-50 border-amber-200'
                            }`}
                          >
                            {ds.crossValidationStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Validation Rules Card */}
              <div className="mt-6 p-4 rounded-xl bg-[#FAF7F5] border border-[#ECE4E8] text-xs text-[#595155] flex flex-col sm:flex-row gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-[#6E3E53] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#272023] block mb-0.5">
                    Aturan Validasi Kualitas Data (FR-02):
                  </strong>
                  Data yang memiliki tingkat kelengkapan di bawah 95% atau korelasi cross-validation terhadap stasiun BMKG kurang dari r=0.70 secara otomatis ditandai <em>Perlu Kalibrasi</em> dan diblokir dari proses ekstraksi indikator UHI untuk menjamin keabsahan ilmiah pengetahuan.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODULE 2: CREATE */}
        {/* ------------------------------------------------------------- */}
        {activeModule === 'create' && (
          <div className="space-y-6">
            {/* Indicators Extraction Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white rounded-2xl border border-[#ECE4E8] p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="badge badge--hotspot text-[11px]">FR-04: INDIKATOR 1</span>
                  <span className="text-xs text-[#595155]">Termal</span>
                </div>
                <h4 className="text-base font-bold font-display text-[#272023]">Land Surface Temp (LST)</h4>
                <p className="text-xs text-[#595155] mt-1 mb-4">
                  Suhu permukaan hasil kalibrasi Split-Window Algorithm band 10 & 11 Landsat 9 TIRS.
                </p>
                <div className="p-3 bg-[#EEDDE4] rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-[#5A2C40]">Puncak Semarang</span>
                  <span className="text-xl font-bold font-display text-[#5A2C40]">38.4°C</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#ECE4E8] p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="badge badge--hangat text-[11px]">FR-04: INDIKATOR 2</span>
                  <span className="text-xs text-[#595155]">Vegetasi</span>
                </div>
                <h4 className="text-base font-bold font-display text-[#272023]">NDVI Vegetasi</h4>
                <p className="text-xs text-[#595155] mt-1 mb-4">
                  (NIR - Red) / (NIR + Red) untuk memetakan kerapatan tajuk pepohonan peneduh.
                </p>
                <div className="p-3 bg-amber-50 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800">Rentang Kota</span>
                  <span className="text-xl font-bold font-display text-amber-800">0.11 – 0.70</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#ECE4E8] p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="badge badge--neutral text-[11px]">FR-04: INDIKATOR 3</span>
                  <span className="text-xs text-[#595155]">Terbangun</span>
                </div>
                <h4 className="text-base font-bold font-display text-[#272023]">NDBI Kawasan Terbangun</h4>
                <p className="text-xs text-[#595155] mt-1 mb-4">
                  (SWIR - NIR) / (SWIR + NIR) untuk mengukur rasio perkerasan aspal dan atap seng.
                </p>
                <div className="p-3 bg-stone-100 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">Tertinggi di Inti</span>
                  <span className="text-xl font-bold font-display text-stone-900">+0.38</span>
                </div>
              </div>
            </div>

            {/* FR-05 & FR-06: Spatio-Temporal and Environmental Factor Relation */}
            <div className="bg-white rounded-2xl border border-[#ECE4E8] p-6 shadow-sm">
              <span className="badge badge--admin text-xs mb-1.5">MODUL 2: CREATE</span>
              <h3 className="text-xl font-bold font-display text-[#272023]">
                FR-05 & FR-06: Analisis Spasial-Temporal & Hubungan Faktor Lingkungan
              </h3>
              <p className="text-sm text-[#595155] mt-1 mb-6">
                Korelasi empiris membuktikan hubungan berbanding terbalik antara tutupan vegetasi (NDVI) dengan suhu termal LST ($r = -0.84$), dan korelasi positif terhadap kepadatan terbangun (NDBI, $r = +0.89$).
              </p>

              {/* District Spatial Temporal Delta Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#ECE4E8] text-[#595155] text-xs uppercase font-bold bg-[#FFFFFF]">
                      <th className="py-3 px-4">Wilayah Kecamatan</th>
                      <th className="py-3 px-4">LST 2023</th>
                      <th className="py-3 px-4">LST 2026 (Kini)</th>
                      <th className="py-3 px-4">Kenaikan Termal</th>
                      <th className="py-3 px-4">NDVI (Vegetasi)</th>
                      <th className="py-3 px-4">NDBI (Terbangun)</th>
                      <th className="py-3 px-4">Hubungan Faktor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ECE4E8]">
                    {[
                      { name: 'Semarang Tengah', lst23: 37.1, lst26: 38.4, delta: '+1.3°C', ndvi: 0.11, ndbi: 0.35, rel: 'Vegetasi Defisit, Panas Kritis' },
                      { name: 'Semarang Utara', lst23: 36.8, lst26: 37.9, delta: '+1.1°C', ndvi: 0.14, ndbi: 0.38, rel: 'Perkerasan Gudang & Pesisir' },
                      { name: 'Genuk', lst23: 36.0, lst26: 37.2, delta: '+1.2°C', ndvi: 0.13, ndbi: 0.37, rel: 'Alih Fungsi Industri Masif' },
                      { name: 'Semarang Timur', lst23: 35.7, lst26: 36.8, delta: '+1.1°C', ndvi: 0.16, ndbi: 0.32, rel: 'Kepadatan Permukiman Tinggi' },
                      { name: 'Semarang Selatan', lst23: 33.4, lst26: 34.2, delta: '+0.8°C', ndvi: 0.22, ndbi: 0.20, rel: 'Transisi Hijau Koridor' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF7F5]/50">
                        <td className="py-3.5 px-4 font-bold text-[#272023]">{row.name}</td>
                        <td className="py-3.5 px-4 text-[#595155]">{row.lst23}°C</td>
                        <td className="py-3.5 px-4 font-bold text-[#5A2C40]">{row.lst26}°C</td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full text-xs">
                            {row.delta}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono">{row.ndvi}</td>
                        <td className="py-3.5 px-4 font-mono">{row.ndbi}</td>
                        <td className="py-3.5 px-4 text-xs font-semibold text-[#595155]">{row.rel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FR-07: Synthesis Generator */}
            <div className="bg-white rounded-2xl border border-[#ECE4E8] p-6 shadow-sm">
              <span className="badge badge--admin text-xs mb-1.5">MODUL 2: CREATE</span>
              <h3 className="text-xl font-bold font-display text-[#272023]">
                FR-07: Sintesis Pengetahuan UHI Otomatis
              </h3>
              <p className="text-sm text-[#595155] mt-1 mb-4">
                Mengintegrasikan hasil analisis spasial-temporal dan relasi faktor menjadi ringkasan temuan yang siap didistribusikan ke dinas pengambil kebijakan.
              </p>

              <div className="flex items-center gap-3 mb-4">
                <label className="text-xs font-bold text-[#595155]">Pilih Wilayah untuk Sintesis:</label>
                <select
                  value={selectedDistrictForSynthesis}
                  onChange={(e) => setSelectedDistrictForSynthesis(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-[#ECE4E8] text-xs font-bold bg-[#FFFFFF]"
                >
                  <option value="Semarang Tengah">Semarang Tengah</option>
                  <option value="Semarang Utara">Semarang Utara</option>
                  <option value="Genuk">Genuk</option>
                  <option value="Semarang Timur">Semarang Timur</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#ECE4E8] text-sm leading-relaxed text-[#272023]">
                <strong className="block text-[#5A2C40] font-display text-base mb-1">
                  Hasil Sintesis Pengetahuan: {selectedDistrictForSynthesis} (Periode 2023–2026)
                </strong>
                <p className="text-xs text-[#595155] mb-2">
                  ID Dokumen: <code>SYN-SMG-{selectedDistrictForSynthesis.substring(0, 3).toUpperCase()}-2026</code> · Terhubung ke Landsat 9 & BMKG Stasiun Klimatologi.
                </p>
                <p className="mb-2">
                  Wilayah <strong>{selectedDistrictForSynthesis}</strong> mengalami lonjakan termal tertinggi di Kota Semarang akibat defisit kanopi vegetasi (NDVI &lt; 0.15) dan dominasi permukaan impermeabel di atas 80%. Korelasi spasial menunjukkan bahwa intervensi penanaman koridor pohon Trembesi dan albedo paving di zona pedestrian adalah prioritas mutlak untuk mencegah suhu melampaui ambang batas bahaya termal 40°C pada tahun 2030.
                </p>
                <div className="flex flex-wrap gap-2 text-xs pt-2 border-t border-[#ECE4E8]">
                  <span className="font-bold text-[#595155]">Aset Pengetahuan Terkait:</span>
                  <span className="badge badge--hangat text-[10px]">Dataset LST sentinel 2026</span>
                  <span className="badge badge--hangat text-[10px]">SOP penghijauan jalur koridor</span>
                  <span className="badge badge--hangat text-[10px]">Evaluasi atap hijau percontohan</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODULE 3: AI MODULE */}
        {/* ------------------------------------------------------------- */}
        {activeModule === 'ai' && (
          <div className="space-y-6">
            {/* FR-08: Random Forest Predictions */}
            <div className="bg-white rounded-2xl border border-[#ECE4E8] p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE4E8] pb-4 mb-6">
                <div>
                  <span className="badge badge--admin text-xs mb-1.5">MODUL 3: AI MODEL</span>
                  <h3 className="text-xl font-bold font-display text-[#272023]">
                    FR-08: Prediksi Tren UHI (Model Random Forest Regressor v2.1)
                  </h3>
                  <p className="text-sm text-[#595155] mt-1">
                    Model terlatih memprediksi suhu permukaan LST 2027 dan 2030 berdasarkan skenario tutupan lahan dan laju urbanisasi.
                  </p>
                </div>
                {/* Scenario Toggle */}
                <div className="flex items-center gap-1 p-1 bg-[#FAF7F5] rounded-xl border border-[#ECE4E8] self-start sm:self-auto">
                  <button
                    onClick={() => setRfScenario('bau')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      rfScenario === 'bau' ? 'bg-[#6E3E53] text-white shadow-xs' : 'text-[#595155]'
                    }`}
                  >
                    Business as Usual (Tanpa Aksi)
                  </button>
                  <button
                    onClick={() => setRfScenario('mitigation')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      rfScenario === 'mitigation' ? 'bg-[#6E3E53] text-white shadow-xs' : 'text-[#595155]'
                    }`}
                  >
                    Skenario Intervensi RTH (+15%)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_AI_PREDICTIONS.map((pred) => {
                  const lst27 = rfScenario === 'bau' ? pred.predictedLst2027 : (pred.predictedLst2027 - 0.9).toFixed(1);
                  const lst30 = rfScenario === 'bau' ? pred.predictedLst2030 : (pred.predictedLst2030 - 1.8).toFixed(1);

                  return (
                    <div
                      key={pred.id}
                      className="p-4 rounded-xl border border-[#ECE4E8] bg-[#FFFFFF] hover:border-[#6E3E53] transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <strong className="text-sm font-bold text-[#272023]">{pred.wilayah}</strong>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Akurasi {pred.modelConfidence}%
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center py-2 bg-[#FAF7F5] rounded-lg mb-2">
                        <div>
                          <span className="text-[10px] text-[#595155] block">2026 (Kini)</span>
                          <span className="text-sm font-bold text-[#272023]">{pred.historicalLst}°C</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#595155] block">Prediksi 2027</span>
                          <span className="text-sm font-bold text-[#6E3E53]">{lst27}°C</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#595155] block">Prediksi 2030</span>
                          <span className="text-sm font-bold text-[#5A2C40]">{lst30}°C</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-[#595155]">
                        Tren: <strong className="text-[#5A2C40]">{pred.trend}</strong>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FR-09: DBSCAN Spatial Clusters */}
            <div className="bg-white rounded-2xl border border-[#ECE4E8] p-6 shadow-sm">
              <span className="badge badge--admin text-xs mb-1.5">MODUL 3: AI MODEL</span>
              <h3 className="text-xl font-bold font-display text-[#272023]">
                FR-09: Identifikasi Wilayah Prioritas (Clustering Algoritma DBSCAN)
              </h3>
              <p className="text-sm text-[#595155] mt-1 mb-6">
                Pengelompokan otomatis tingkat keparahan pulau panas berdasarkan LST, vegetasi NDVI, dan koefisien terbangun NDBI.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_DBSCAN_CLUSTERS.map((cl) => (
                  <div key={cl.clusterId} className="p-5 rounded-2xl border border-[#ECE4E8] bg-[#FFFFFF]">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-[#272023]">{cl.name}</h4>
                      <span
                        className={`badge ${
                          cl.priorityLevel.includes('Kritis')
                            ? 'badge--hotspot'
                            : cl.priorityLevel.includes('Tinggi')
                            ? 'badge--hangat'
                            : 'badge--neutral'
                        } text-[11px] whitespace-nowrap`}
                      >
                        {cl.priorityLevel}
                      </span>
                    </div>
                    <div className="text-xs text-[#595155] mb-3">
                      <strong>Wilayah:</strong> {cl.districts.join(', ')}
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono bg-[#FAF7F5] p-2 rounded-lg mb-3">
                      <span>LST Rata: <strong>{cl.avgLst}°C</strong></span>
                      <span>NDVI Rata: <strong>{cl.avgNdvi}</strong></span>
                      <span>NDBI Rata: <strong>{cl.avgNdbi}</strong></span>
                    </div>
                    <p className="text-xs text-[#272023] bg-white p-3 rounded-lg border border-[#ECE4E8]">
                      <strong>Rekomendasi DBSCAN:</strong> {cl.suggestedAction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FR-10: AI Validation Workflow */}
            <div className="bg-white rounded-2xl border border-[#ECE4E8] p-6 shadow-sm">
              <span className="badge badge--admin text-xs mb-1.5">MODUL 3: AI VALIDATION</span>
              <h3 className="text-xl font-bold font-display text-[#272023]">
                FR-10: Validasi Hasil Model AI oleh Pakar
              </h3>
              <p className="text-sm text-[#595155] mt-1 mb-6">
                Sesuai aturan FR-10: Hasil prediksi Random Forest dan klaster DBSCAN wajib melewati audit ilmiah sebelum disimpan ke Knowledge Repository dan dijadikan referensi publik.
              </p>

              <div className="space-y-4">
                {aiValidations.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-[#ECE4E8] bg-[#FFFFFF] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-[#272023]">{item.modelName}</strong>
                        <span
                          className={`badge ${
                            item.status === 'Tervalidasi' ? 'badge--hangat' : 'badge--menunggu'
                          } text-xs`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#595155]">
                        Pemeriksa: <strong>{item.evaluatedBy}</strong> · Tanggal: {item.evaluationDate}
                      </p>
                      <p className="text-xs font-mono text-[#5A2C40]">
                        Metrik Ilmiah: {item.scientificMetric}
                      </p>
                      <p className="text-xs text-[#272023] italic">
                        "{item.notes}"
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleValidationStatus(item.id)}
                      className={`btn btn--small self-start sm:self-auto flex items-center gap-1.5 cursor-pointer ${
                        item.status === 'Tervalidasi' ? 'btn--outline' : 'btn--primary'
                      }`}
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      {item.status === 'Tervalidasi' ? 'Ubah ke Perlu Tinjauan' : 'Setujui & Validasi (FR-10)'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODULE 4: STORE */}
        {/* ------------------------------------------------------------- */}
        {activeModule === 'store' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#ECE4E8] p-6 shadow-sm">
              <span className="badge badge--admin text-xs mb-1.5">MODUL 4: STORE</span>
              <h3 className="text-xl font-bold font-display text-[#272023]">
                FR-11, FR-12, & FR-13: Penyimpanan, Klasifikasi, & Pencarian Knowledge Repository
              </h3>
              <p className="text-sm text-[#595155] mt-1 mb-6">
                Repositori terpusat yang menyimpan pengetahuan UHI tervalidasi lengkap dengan metadata wilayah, periode, tipe pengetahuan, serta alur pencarian multi-filter.
              </p>

              {/* Taxonomy Classification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#FAF7F5] border border-[#ECE4E8]">
                  <strong className="text-xs font-bold text-[#5A2C40] block mb-1">Klasifikasi 1: Kategori</strong>
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    <span className="badge badge--hotspot">Hotspot</span>
                    <span className="badge badge--hangat">Mitigasi</span>
                    <span className="badge badge--hangat">RTH</span>
                    <span className="badge badge--neutral">Panduan</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F5] border border-[#ECE4E8]">
                  <strong className="text-xs font-bold text-[#5A2C40] block mb-1">Klasifikasi 2: Wilayah</strong>
                  <p className="text-xs text-[#595155]">
                    12 Kecamatan (Semarang Tengah, Semarang Utara, Genuk, Semarang Timur, dll.)
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F5] border border-[#ECE4E8]">
                  <strong className="text-xs font-bold text-[#5A2C40] block mb-1">Klasifikasi 3: Periode</strong>
                  <p className="text-xs text-[#595155]">
                    2018–2023 (Historis), 2026 (Komposit Kini), 2027–2030 (Prediksi AI RF)
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F5] border border-[#ECE4E8]">
                  <strong className="text-xs font-bold text-[#5A2C40] block mb-1">Klasifikasi 4: Sumber</strong>
                  <p className="text-xs text-[#595155]">
                    Bappeda Litbang, DLH, Dinas PUPR, BMKG, UNDIP, BP2KL
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#ECE4E8] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-[#272023]">
                    Buka Pustaka Knowledge Penuh (96 Artikel & Dokumen)
                  </h4>
                  <p className="text-xs text-[#595155] mt-1">
                    Gunakan pencarian kata kunci, pembaca modal geospasial, dan penambahan artikel baru bagi staf terdaftar.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('knowledge')}
                  className="btn btn--primary btn--small flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  id="open-full-knowledge-btn"
                >
                  <BookOpen className="w-4 h-4" />
                  Eksplorasi Repositori Knowledge
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODULE 5: SHARE */}
        {/* ------------------------------------------------------------- */}
        {activeModule === 'share' && (
          <div className="space-y-6">
            {/* Stakeholder Access Overview (FR-14 & FR-15) */}
            <div className="bg-white rounded-2xl border border-[#ECE4E8] p-6 shadow-sm">
              <span className="badge badge--admin text-xs mb-1.5">MODUL 5: SHARE</span>
              <h3 className="text-xl font-bold font-display text-[#272023]">
                FR-14, FR-15: Dashboard Distribusi Pengetahuan untuk BAPPEDA & DLH
              </h3>
              <p className="text-sm text-[#595155] mt-1 mb-6">
                Menyajikan pengetahuan UHI dalam format siap pakai bagi pemangku kepentingan lintas sektoral tanpa perlu membuka tumpukan laporan PDF terpisah.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div className="p-5 rounded-2xl border border-[#ECE4E8] bg-[#FFFFFF]">
                  <strong className="text-base font-bold font-display text-[#6E3E53] block mb-1">
                    Kebutuhan BAPPEDA Litbang
                  </strong>
                  <p className="text-xs text-[#595155] mb-3">
                    Perencanaan tata ruang jangka panjang (RPJMD 2025–2030) dan zonasi insentif Green Building.
                  </p>
                  <ul className="text-xs space-y-1.5 text-[#272023]">
                    <li>• Peta sebaran defisit RTH per kecamatan prioritas</li>
                    <li>• Skenario pertumbuhan suhu LST 2030 jika tanpa intervensi (+1.8°C)</li>
                    <li>• Evaluasi dampak ekonomi hemat energi dari cool roof</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl border border-[#ECE4E8] bg-[#FFFFFF]">
                  <strong className="text-base font-bold font-display text-[#5A2C40] block mb-1">
                    Kebutuhan Dinas Lingkungan Hidup (DLH)
                  </strong>
                  <p className="text-xs text-[#595155] mb-3">
                    Tindakan mitigasi lapangan, penanaman pohon peneduh jalan protokol, dan audit kondisi hutan kota.
                  </p>
                  <ul className="text-xs space-y-1.5 text-[#272023]">
                    <li>• Monitoring real-time hotspot termal &gt; 37°C</li>
                    <li>• SOP jenis pohon berakar dalam & berkanopi rindang (Trembesi, Tanjung)</li>
                    <li>• Formulir inspeksi lapangan evaluasi pascamitigasi (FR-22)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FR-16: API Explorer */}
            <div className="bg-white rounded-2xl border border-[#ECE4E8] p-6 shadow-sm">
              <span className="badge badge--admin text-xs mb-1.5">MODUL 5: SHARE</span>
              <h3 className="text-xl font-bold font-display text-[#272023]">
                FR-16: Integrasi API Pengetahuan Terbuka
              </h3>
              <p className="text-sm text-[#595155] mt-1 mb-6">
                Penyaluran data UHI dan model hasil evaluasi ke sistem Satu Data Kota Semarang dan Geoportal Simpul Jaringan Pemkot.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#595155] block">Pilih Endpoint API:</span>
                  {MOCK_API_ENDPOINTS.map((ep, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveApiIndex(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                        activeApiIndex === idx
                          ? 'border-[#6E3E53] bg-[#EEDDE4] text-[#5A2C40] font-bold'
                          : 'border-[#ECE4E8] bg-[#FFFFFF] text-[#272023] hover:border-[#ECE4E8]'
                      }`}
                    >
                      <span className="font-bold text-[#6E3E53] mr-2">{ep.method}</span>
                      {ep.path}
                    </button>
                  ))}
                </div>

                <div className="lg:col-span-2 bg-[#272023] text-white p-5 rounded-2xl font-mono text-xs overflow-x-auto">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 text-stone-400">
                    <span>Response JSON: {MOCK_API_ENDPOINTS[activeApiIndex].path}</span>
                    <span className="text-emerald-400 text-[10px]">Status: 200 OK</span>
                  </div>
                  <pre className="text-amber-300 leading-relaxed">
                    {JSON.stringify(MOCK_API_ENDPOINTS[activeApiIndex].sampleResponse, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* FR-17: Chatbot Banner */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#ECE4E8] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#6E3E53] text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#272023]">FR-17: Chatbot Informasi UHI</h4>
                  <p className="text-xs text-[#595155]">
                    Memudahkan masyarakat dan staf dinas berdiskusi interaktif seputar kondisi panas dan rekomendasi mitigasi.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigateTo('chat')}
                className="btn btn--primary btn--small flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                Buka Chatbot Tanya UHI
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODULE 6: APPLY */}
        {/* ------------------------------------------------------------- */}
        {activeModule === 'apply' && (
          <div className="space-y-6">
            {/* Mitigation Planner Simulator (FR-18 & FR-19) */}
            <div className="bg-white rounded-2xl border border-[#ECE4E8] p-6 shadow-sm">
              <span className="badge badge--admin text-xs mb-1.5">MODUL 6: APPLY</span>
              <h3 className="text-xl font-bold font-display text-[#272023]">
                FR-18 & FR-19: Simulator Perencanaan Tindakan Mitigasi UHI
              </h3>
              <p className="text-sm text-[#595155] mt-1 mb-6">
                Alat pendukung keputusan bagi Bappeda, DLH, dan Disperkim untuk menguji skenario intervensi mikro dan memproyeksikan estimasi penurunan suhu permukaan (LST).
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Simulator Controls */}
                <div className="lg:col-span-6 space-y-5 bg-[#FFFFFF] p-5 rounded-2xl border border-[#ECE4E8]">
                  <div>
                    <label className="text-xs font-bold text-[#272023] block mb-1">
                      1. Pilih Wilayah Sasaran Mitigasi (FR-19)
                    </label>
                    <select
                      value={simWilayah}
                      onChange={(e) => setSimWilayah(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#ECE4E8] text-sm font-semibold bg-white"
                    >
                      {INITIAL_WILAYAH.map((w) => (
                        <option key={w.id} value={w.wilayah}>
                          {w.wilayah} (LST Saat Ini: {w.lst}°C · {w.kategori})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>2. Target Penambahan Ruang Terbuka Hijau (RTH)</span>
                      <span className="text-[#6E3E53]">+{simRthAddition}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={simRthAddition}
                      onChange={(e) => setSimRthAddition(parseInt(e.target.value))}
                      className="w-full accent-[#6E3E53] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#595155]">
                      <span>+1% (Taman Saku)</span>
                      <span>+8% (Koridor Arteri)</span>
                      <span>+15% (Hutan Kota Masif)</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#272023] block mb-1">
                      3. Kualitas Material Albedo / Cool Roof & Pavement
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'standar', label: 'Standar (0.35)' },
                        { id: 'tinggi', label: 'Tinggi (0.65)' },
                        { id: 'ekstrem', label: 'Reflektif (0.85)' }
                      ].map((lvl) => (
                        <button
                          key={lvl.id}
                          onClick={() => setSimAlbedoLevel(lvl.id as any)}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            simAlbedoLevel === lvl.id
                              ? 'border-[#6E3E53] bg-[#EEDDE4] text-[#5A2C40]'
                              : 'border-[#ECE4E8] bg-white text-[#595155]'
                          }`}
                        >
                          {lvl.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>4. Jumlah Bibit Pohon Trembesi / Peneduh</span>
                      <span className="text-[#6E3E53]">{simTreeCount} Batang</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="1000"
                      step="50"
                      value={simTreeCount}
                      onChange={(e) => setSimTreeCount(parseInt(e.target.value))}
                      className="w-full accent-[#6E3E53] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Projected Impact Card */}
                <div className="lg:col-span-6 bg-[#272023] text-white p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        PROYEKSI PENDINGINAN TERMAL
                      </span>
                      <span className="text-xs font-mono text-stone-400">Model KMS Sim v1.2</span>
                    </div>

                    <div className="py-6 text-center">
                      <span className="text-xs text-stone-400 block mb-1">Estimasi Penurunan Suhu Permukaan</span>
                      <div className="text-4xl sm:text-5xl font-bold font-display text-emerald-400">
                        -{totalCooling}°C
                      </div>
                      <span className="text-xs text-stone-400 mt-2 block">
                        Dari {selectedWilayahObj.lst}°C turun menjadi{' '}
                        <strong className="text-white text-sm">{estimatedNewLst}°C</strong>
                      </span>
                    </div>

                    <div className="space-y-2 bg-stone-900/80 p-3.5 rounded-xl border border-stone-800 text-xs">
                      <div className="flex justify-between text-stone-300">
                        <span>Kontribusi RTH (+{simRthAddition}%):</span>
                        <span className="font-mono text-emerald-400">-{rthCooling.toFixed(2)}°C</span>
                      </div>
                      <div className="flex justify-between text-stone-300">
                        <span>Kontribusi Albedo Reflektif:</span>
                        <span className="font-mono text-emerald-400">-{albedoCooling.toFixed(2)}°C</span>
                      </div>
                      <div className="flex justify-between text-stone-300">
                        <span>Kontribusi Kanopi {simTreeCount} Pohon:</span>
                        <span className="font-mono text-emerald-400">-{treeCooling.toFixed(2)}°C</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-400 mt-4 leading-normal">
                    *Catatan FR-19: Sistem memberikan estimasi pendukung ilmiah berbasis knowledge asset tersimpan. Keputusan akhir regulasi anggaran tetap berada di tangan Walikota dan DPRD Kota Semarang.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODULE 7: EVALUATE */}
        {/* ------------------------------------------------------------- */}
        {activeModule === 'evaluate' && (
          <div className="space-y-6">
            {/* Post-Mitigation Monitoring & Anomaly Detection (FR-20, FR-21) */}
            <div className="bg-white rounded-2xl border border-[#ECE4E8] p-6 shadow-sm">
              <span className="badge badge--admin text-xs mb-1.5">MODUL 7: EVALUATE</span>
              <h3 className="text-xl font-bold font-display text-[#272023]">
                FR-20 & FR-21: Monitoring Kondisi Pascamitigasi & Deteksi Anomali AI
              </h3>
              <p className="text-sm text-[#595155] mt-1 mb-6">
                Membandingkan kondisi lingkungan sebelum dan setelah intervensi mitigasi, serta mendeteksi apakah hasil lapangan menyimpang secara anomali dari proyeksi model AI.
              </p>

              <div className="space-y-4">
                {postRecords.map((rec) => (
                  <div
                    key={rec.id}
                    className={`p-5 rounded-2xl border ${
                      rec.isAnomaly ? 'border-amber-400 bg-amber-50/30' : 'border-[#ECE4E8] bg-[#FFFFFF]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#ECE4E8]">
                      <div>
                        <strong className="text-base font-bold text-[#272023]">{rec.wilayah}</strong>
                        <span className="text-xs text-[#595155] block">{rec.actionTaken}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {rec.isAnomaly ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                            FR-21: Anomali Terdeteksi ({rec.deviation > 0 ? `+${rec.deviation}` : rec.deviation}°C)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Sesuai Prediksi AI
                          </span>
                        )}
                        <span className="badge badge--hangat text-xs">{rec.efficacyRating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3">
                      <div className="p-2.5 bg-white rounded-xl border border-[#ECE4E8]">
                        <span className="text-[10px] text-[#595155] block">Sebelum Mitigasi ({rec.periodBefore})</span>
                        <strong className="text-sm text-[#272023]">{rec.lstBefore}°C · NDVI {rec.ndviBefore}</strong>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#ECE4E8]">
                        <span className="text-[10px] text-[#595155] block">Setelah Mitigasi ({rec.periodAfter})</span>
                        <strong className="text-sm text-emerald-700">{rec.lstAfter}°C · NDVI {rec.ndviAfter}</strong>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#ECE4E8]">
                        <span className="text-[10px] text-[#595155] block">Proyeksi AI Random Forest</span>
                        <strong className="text-sm text-[#6E3E53]">{rec.aiPredictedLst}°C</strong>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#ECE4E8]">
                        <span className="text-[10px] text-[#595155] block">RTH Publik (%)</span>
                        <strong className="text-sm text-[#272023]">{rec.rthPctBefore}% → {rec.rthPctAfter}%</strong>
                      </div>
                    </div>

                    <div className="p-3 bg-[#FAF7F5] rounded-xl text-xs text-[#595155]">
                      <strong className="text-[#272023] block mb-0.5">
                        FR-22: Catatan Evaluasi Lapangan DLH (Inspektur: {rec.dlhInspector}):
                      </strong>
                      "{rec.dlhEvaluationNotes}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FR-24: AI Retraining & FR-25: Knowledge Reuse */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Retraining Model */}
              <div className="bg-white rounded-2xl border border-[#ECE4E8] p-6 shadow-sm">
                <span className="badge badge--admin text-xs mb-1.5">MODUL 7: RETRAINING</span>
                <h3 className="text-xl font-bold font-display text-[#272023]">
                  FR-24: Pembaruan Model AI (Retraining)
                </h3>
                <p className="text-xs text-[#595155] mt-1 mb-4">
                  Menggunakan umpan balik data evaluasi lapangan untuk memperbarui bobot model regresi Random Forest tanpa menghapus riwayat versi lama.
                </p>

                {retrainSuccess && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Model berhasil di-retrain! Versi baru telah aktif di sistem produksi.
                  </div>
                )}

                <div className="space-y-3 mb-5">
                  {modelVersions.map((mv, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-[#ECE4E8] bg-[#FFFFFF] text-xs">
                      <div className="flex items-center justify-between font-bold text-[#272023]">
                        <span>{mv.version} ({mv.algorithm})</span>
                        <span className={`badge ${mv.status.includes('Aktif') ? 'badge--hangat' : 'badge--neutral'} text-[10px]`}>
                          {mv.status}
                        </span>
                      </div>
                      <p className="text-[#595155] text-[11px] mt-1">
                        Sampel: {mv.sampleCount.toLocaleString()} · {mv.accuracyMetric} · Rilis: {mv.releaseDate}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleRetrainModel}
                  disabled={isRetraining}
                  className="btn btn--primary btn--small w-full flex items-center justify-center gap-2 cursor-pointer"
                  id="btn-retrain-ai"
                >
                  <RotateCw className={`w-4 h-4 ${isRetraining ? 'animate-spin' : ''}`} />
                  {isRetraining ? 'Melakukan Retraining Dataset 2026...' : 'Jalankan Retraining Model (FR-24)'}
                </button>
              </div>

              {/* FR-25: Knowledge Reuse */}
              <div className="bg-white rounded-2xl border border-[#ECE4E8] p-6 shadow-sm">
                <span className="badge badge--admin text-xs mb-1.5">MODUL 7: REUSE</span>
                <h3 className="text-xl font-bold font-display text-[#272023]">
                  FR-25: Siklus Penggunaan Kembali Pengetahuan
                </h3>
                <p className="text-xs text-[#595155] mt-1 mb-4">
                  Mereplikasi metodologi mitigasi yang terbukti sukses di satu wilayah ke wilayah hotspot lainnya tanpa memulai riset dari nol.
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl border border-[#ECE4E8] bg-[#FFFFFF] text-xs">
                    <strong className="text-[#5A2C40] block mb-1">
                      Kasus Sukses: Koridor Trembesi Pandanaran (-2.4°C)
                    </strong>
                    <p className="text-[#595155] mb-2">
                      SOP dan rasio jarak tanam 6 meter kini siap direplikasi ke:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="badge badge--hangat text-[10px]">Jl. Brigjen Sudiarto (Semarang Timur)</span>
                      <span className="badge badge--hangat text-[10px]">Jl. Kaligawe Raya (Genuk)</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[#ECE4E8] bg-[#FFFFFF] text-xs">
                    <strong className="text-[#5A2C40] block mb-1">
                      Kasus Sukses: Sabuk Hijau Pesisir Tanjung Emas
                    </strong>
                    <p className="text-[#595155] mb-2">
                      Formula vegetasi Mangrove + Cemara Udang direplikasi untuk:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="badge badge--hangat text-[10px]">Kawasan Muara Banjir Kanal Timur</span>
                      <span className="badge badge--hangat text-[10px]">Kawasan Tambaklorok</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#ECE4E8] flex justify-between items-center text-xs">
                  <span className="text-[#595155]">Ingin menelusuri artikel SOP terkait?</span>
                  <button
                    onClick={() => navigateTo('knowledge')}
                    className="font-bold text-[#6E3E53] hover:underline cursor-pointer"
                  >
                    Buka Repositori SOP &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
