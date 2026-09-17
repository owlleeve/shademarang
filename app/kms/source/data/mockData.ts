import {
  KnowledgeArticle,
  WilayahData,
  UserAccount,
  SwatchItem,
  DataSourceItem,
  AIPredictionItem,
  DBSCANClusterItem,
  AIValidationRecord,
  APIEndpointDef,
  PostMitigationRecord,
  ModelVersionRecord,
  ChatMessage
} from '../types';

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr-1',
    name: 'Admin Bappeda',
    email: 'admin@demo.id',
    role: 'admin',
    status: 'Aktif',
    department: 'Bappeda Litbang Kota Semarang',
    initial: 'A',
  },
  {
    id: 'usr-2',
    name: 'Budi DLH',
    email: 'user@demo.id',
    role: 'staff',
    status: 'Aktif',
    department: 'Dinas Lingkungan Hidup Kota Semarang',
    initial: 'B',
  },
  {
    id: 'usr-3',
    name: 'Citra PUPR',
    email: 'citra@demo.id',
    role: 'staff',
    status: 'Menunggu',
    department: 'Dinas Pekerjaan Umum & Penataan Ruang',
    initial: 'C',
  },
  {
    id: 'usr-4',
    name: 'Dedi Disperkim',
    email: 'dedi@demo.id',
    role: 'staff',
    status: 'Aktif',
    department: 'Dinas Perumahan & Kawasan Permukiman',
    initial: 'D',
  },
  {
    id: 'usr-5',
    name: 'Dr. Retno Undip',
    email: 'retno@undip.ac.id',
    role: 'staff',
    status: 'Aktif',
    department: 'Pusat Studi Lingkungan Hidup UNDIP',
    initial: 'R',
  }
];

export const INITIAL_WILAYAH: WilayahData[] = [
  {
    id: 'w-1',
    wilayah: 'Semarang Tengah',
    kategori: 'Hotspot inti',
    lst: 38.4,
    ndvi: 0.11,
    ndbi: 0.38,
    status: 'Hotspot',
    vegetationCoverPct: 8.5,
    priorityRTH: 5,
    zoneType: 'Inti Perkotaan',
    populationDensity: 11200,
    hviScore: 88,
    elevationMeters: 8,
    imperviousSurfacePct: 89,
    areaKm2: 6.14,
    coordinates: '6.9827° S, 110.4203° E',
  },
  {
    id: 'w-2',
    wilayah: 'Semarang Utara',
    kategori: 'Hotspot pesisir',
    lst: 37.9,
    ndvi: 0.14,
    ndbi: 0.34,
    status: 'Hotspot',
    vegetationCoverPct: 10.2,
    priorityRTH: 5,
    zoneType: 'Pesisir Utara',
    populationDensity: 9800,
    hviScore: 84,
    elevationMeters: 3,
    imperviousSurfacePct: 85,
    areaKm2: 11.36,
    coordinates: '6.9602° S, 110.4225° E',
  },
  {
    id: 'w-3',
    wilayah: 'Semarang Timur',
    kategori: 'Hotspot inti',
    lst: 36.8,
    ndvi: 0.16,
    ndbi: 0.31,
    status: 'Hotspot',
    vegetationCoverPct: 12.0,
    priorityRTH: 4,
    zoneType: 'Inti Perkotaan',
    populationDensity: 10400,
    hviScore: 78,
    elevationMeters: 6,
    imperviousSurfacePct: 81,
    areaKm2: 7.70,
    coordinates: '6.9845° S, 110.4412° E',
  },
  {
    id: 'w-4',
    wilayah: 'Genuk',
    kategori: 'Hotspot industri',
    lst: 37.2,
    ndvi: 0.13,
    ndbi: 0.36,
    status: 'Hotspot',
    vegetationCoverPct: 9.8,
    priorityRTH: 5,
    zoneType: 'Industri Timur',
    populationDensity: 4500,
    hviScore: 82,
    elevationMeters: 2,
    imperviousSurfacePct: 83,
    areaKm2: 27.39,
    coordinates: '6.9610° S, 110.4780° E',
  },
  {
    id: 'w-5',
    wilayah: 'Semarang Selatan',
    kategori: 'Pemantauan',
    lst: 34.2,
    ndvi: 0.22,
    ndbi: 0.22,
    status: 'Hangat',
    vegetationCoverPct: 18.5,
    priorityRTH: 3,
    zoneType: 'Inti Perkotaan',
    populationDensity: 8900,
    hviScore: 62,
    elevationMeters: 22,
    imperviousSurfacePct: 72,
    areaKm2: 5.93,
    coordinates: '7.0012° S, 110.4241° E',
  },
  {
    id: 'w-6',
    wilayah: 'Gayamsari',
    kategori: 'Pemantauan',
    lst: 35.6,
    ndvi: 0.18,
    ndbi: 0.27,
    status: 'Hangat',
    vegetationCoverPct: 14.1,
    priorityRTH: 4,
    zoneType: 'Industri Timur',
    populationDensity: 7400,
    hviScore: 70,
    elevationMeters: 5,
    imperviousSurfacePct: 77,
    areaKm2: 6.18,
    coordinates: '6.9890° S, 110.4550° E',
  },
  {
    id: 'w-7',
    wilayah: 'Candisari',
    kategori: 'Elevasi sedang',
    lst: 33.1,
    ndvi: 0.28,
    ndbi: 0.15,
    status: 'Hangat',
    vegetationCoverPct: 24.0,
    priorityRTH: 2,
    zoneType: 'Perbukitan Selatan',
    populationDensity: 6700,
    hviScore: 52,
    elevationMeters: 95,
    imperviousSurfacePct: 62,
    areaKm2: 6.54,
    coordinates: '7.0210° S, 110.4280° E',
  },
  {
    id: 'w-8',
    wilayah: 'Semarang Barat',
    kategori: 'Normal',
    lst: 32.8,
    ndvi: 0.31,
    ndbi: 0.12,
    status: 'Neutral',
    vegetationCoverPct: 27.5,
    priorityRTH: 2,
    zoneType: 'Perumahan Barat',
    populationDensity: 7100,
    hviScore: 48,
    elevationMeters: 12,
    imperviousSurfacePct: 58,
    areaKm2: 21.74,
    coordinates: '6.9870° S, 110.3890° E',
  },
  {
    id: 'w-9',
    wilayah: 'Gajahmungkur',
    kategori: 'Perbukitan hijau',
    lst: 31.5,
    ndvi: 0.38,
    ndbi: 0.05,
    status: 'Neutral',
    vegetationCoverPct: 35.0,
    priorityRTH: 1,
    zoneType: 'Perbukitan Selatan',
    populationDensity: 4300,
    hviScore: 38,
    elevationMeters: 140,
    imperviousSurfacePct: 48,
    areaKm2: 9.07,
    coordinates: '7.0150° S, 110.4070° E',
  },
  {
    id: 'w-10',
    wilayah: 'Banyumanik',
    kategori: 'Elevasi tinggi',
    lst: 29.5,
    ndvi: 0.58,
    ndbi: -0.12,
    status: 'Neutral',
    vegetationCoverPct: 52.3,
    priorityRTH: 1,
    zoneType: 'Perbukitan Selatan',
    populationDensity: 5200,
    hviScore: 26,
    elevationMeters: 210,
    imperviousSurfacePct: 36,
    areaKm2: 25.69,
    coordinates: '7.0720° S, 110.4190° E',
  },
  {
    id: 'w-11',
    wilayah: 'Gunungpati',
    kategori: 'Konservasi hulu',
    lst: 28.8,
    ndvi: 0.65,
    ndbi: -0.18,
    status: 'Neutral',
    vegetationCoverPct: 64.0,
    priorityRTH: 1,
    zoneType: 'Perbukitan Selatan',
    populationDensity: 1800,
    hviScore: 21,
    elevationMeters: 260,
    imperviousSurfacePct: 26,
    areaKm2: 54.11,
    coordinates: '7.0850° S, 110.3720° E',
  },
  {
    id: 'w-12',
    wilayah: 'Mijen',
    kategori: 'Agroforestri',
    lst: 28.2,
    ndvi: 0.70,
    ndbi: -0.22,
    status: 'Neutral',
    vegetationCoverPct: 71.5,
    priorityRTH: 1,
    zoneType: 'Perumahan Barat',
    populationDensity: 1200,
    hviScore: 18,
    elevationMeters: 290,
    imperviousSurfacePct: 21,
    areaKm2: 57.55,
    coordinates: '7.0650° S, 110.3120° E',
  },
  {
    id: 'w-13',
    wilayah: 'Ngaliyan',
    kategori: 'Perbukitan barat & industri',
    lst: 31.8,
    ndvi: 0.42,
    ndbi: 0.08,
    status: 'Neutral',
    vegetationCoverPct: 42.0,
    priorityRTH: 2,
    zoneType: 'Perumahan Barat',
    populationDensity: 3600,
    hviScore: 42,
    elevationMeters: 85,
    imperviousSurfacePct: 52,
    areaKm2: 37.99,
    coordinates: '7.0050° S, 110.3450° E',
  },
  {
    id: 'w-14',
    wilayah: 'Tugu',
    kategori: 'Pesisir barat & mangrove',
    lst: 34.8,
    ndvi: 0.24,
    ndbi: 0.20,
    status: 'Hangat',
    vegetationCoverPct: 22.0,
    priorityRTH: 3,
    zoneType: 'Pesisir Utara',
    populationDensity: 2200,
    hviScore: 60,
    elevationMeters: 4,
    imperviousSurfacePct: 66,
    areaKm2: 31.78,
    coordinates: '6.9720° S, 110.3250° E',
  },
  {
    id: 'w-15',
    wilayah: 'Pedurungan',
    kategori: 'Permukiman padat timur',
    lst: 35.2,
    ndvi: 0.20,
    ndbi: 0.25,
    status: 'Hangat',
    vegetationCoverPct: 16.5,
    priorityRTH: 4,
    zoneType: 'Industri Timur',
    populationDensity: 8300,
    hviScore: 66,
    elevationMeters: 8,
    imperviousSurfacePct: 74,
    areaKm2: 20.72,
    coordinates: '7.0020° S, 110.4720° E',
  },
  {
    id: 'w-16',
    wilayah: 'Tembalang',
    kategori: 'Kawasan pendidikan tinggi',
    lst: 30.8,
    ndvi: 0.52,
    ndbi: -0.05,
    status: 'Neutral',
    vegetationCoverPct: 48.0,
    priorityRTH: 2,
    zoneType: 'Perbukitan Selatan',
    populationDensity: 4100,
    hviScore: 31,
    elevationMeters: 175,
    imperviousSurfacePct: 42,
    areaKm2: 44.20,
    coordinates: '7.0580° S, 110.4520° E',
  }
];

export const INITIAL_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'art-1',
    title: 'Semarang Tengah',
    description: 'LST 38.4°C · NDVI 0.11 · klaster inti',
    category: 'Hotspot',
    tag: 'Hotspot',
    status: 'Hotspot',
    lst: '38.4°C',
    ndvi: '0.11',
    date: '12 Jun 2026',
    author: 'Tim Ahli Spasial Bappeda',
    readTime: '4 mnt baca',
    coordinates: '6.9827° S, 110.4203° E',
    content: `Wilayah Semarang Tengah merupakan episentrum Urban Heat Island tertinggi di Kota Semarang pada periode pengukuran Landsat 8/9 & Sentinel-3 Juni 2026.

Tingginya LST (Land Surface Temperature) disebabkan oleh rasio tutupan kedap air (impervious surface) yang mencapai 89%, densitas bangunan komersial tinggi, serta minimnya koridor pepohonan bertajuk rindang di sepanjang Jalan Pemuda, Pandanaran, dan Gajah Mada.

Rekomendasi Penanganan:
1. Revitalisasi jalur hijau trotoar dengan pohon peneduh berkanopi lebar (misal: Trembesi dan Bungur).
2. Penerapan insentif retrofit Green Roof (atap hijau) bagi gedung komersial dan perkantoran.
3. Penerapan cool pavement pada area pedestrian Simpang Lima untuk menurunkan albedo permukaan.`,
    recommendations: [
      'Peningkatan persentase RTH perkotaan dari 8.5% menjadi 15% pada tahun 2029',
      'Pemasangan sensor mikroklimat IoT real-time di 4 sudut Simpang Lima',
      'Insentif PBB untuk pengembang yang menyediakan taman atap (green roof)'
    ]
  },
  {
    id: 'art-2',
    title: 'Semarang Utara',
    description: 'LST 37.9°C · NDVI 0.14 · zona pesisir',
    category: 'Hotspot',
    tag: 'Hotspot',
    status: 'Hotspot',
    lst: '37.9°C',
    ndvi: '0.14',
    date: '10 Jun 2026',
    author: 'Dinas Lingkungan Hidup',
    readTime: '3 mnt baca',
    coordinates: '6.9542° S, 110.4289° E',
    content: `Zona pesisir Semarang Utara terpapar kombinasi radiasi matahari langsung dan material perkerasan kontainer pelabuhan Tanjung Emas serta pergudangan logistik.

Efek angin laut tertahan oleh deretan bangunan masif bertingkat rendah tanpa koridor ventilasi angin (wind corridors) yang memadai menuju pusat kota.

Rekomendasi Penanganan:
1. Pembangunan sabuk hijau pantai (coastal green belt) berbasis vegetasi mangrove dan cemara udang.
2. Penanaman pohon pelindung di batas sempadan kawasan industri dan perumahan padat Tanah Mas.
3. Desain koridor ventilasi udara dari laut ke darat.`,
    recommendations: [
      'Sabuk hijau mangrove 50 meter di sepanjang garis pantai Tanjung Emas',
      'Material atap reflektif (albedo > 0.65) untuk gudang pelabuhan',
      'Regulasi jarak sempadan bangunan tepi laut'
    ]
  },
  {
    id: 'art-3',
    title: 'SOP penghijauan jalur koridor',
    description: 'Standar tanam pohon pelindung di jalan arteri, revisi 2026.',
    category: 'Panduan',
    tag: 'Panduan',
    status: 'Hangat / valid',
    date: '02 Jun 2026',
    author: 'Dinas PUPR & DLH',
    readTime: '6 mnt baca',
    content: `Dokumen Standar Operasional Prosedur (SOP) terpadu antara Dinas Bina Marga, Dinas Lingkungan Hidup, dan Disperkim Kota Semarang untuk penanaman dan pemeliharaan vegetasi koridor jalan protokol.

Ketentuan Utama:
1. Jarak tanam pohon pelindung arteri primer: minimal 5-6 meter antar pohon berkanopi sedang, 8-10 meter untuk pohon berakar dalam.
2. Jenis vegetasi yang direkomendasikan: Samanea saman (Trembesi), Spathodea campanulata, Mimusops elengi (Tanjung), Tabebuia rosea.
3. Dilarang menanam pohon berakar dangkal yang merusak pedestrian (misal: Sengon, Karet Kebo).
4. Lubang biopori dan sumur resapan wajib terintegrasi dengan lubang tanam pohon.`,
    recommendations: [
      'Audit berkala kondisi kesehatan pohon setiap 6 bulan',
      'Penyiraman terotomasi menggunakan air daur ulang IPAL komunal',
      'Integrasi dengan basis data geospasial pohon Kota Semarang'
    ]
  },
  {
    id: 'art-4',
    title: 'Panduan onboarding tim',
    description: 'Langkah awal menggunakan KMS untuk anggota BAPPEDAA & DLH.',
    category: 'Panduan',
    tag: 'Panduan',
    status: 'Neutral',
    date: '28 Mei 2026',
    author: 'Administrator Sistem ShadeMarang',
    readTime: '2 mnt baca',
    content: `Selamat datang di ShadeMarang Knowledge Management System (KMS UHI Semarang). Portal ini dirancang untuk menyatukan kerja kolaboratif lintas dinas dalam memitigasi pulau panas perkotaan.

Alur Kerja Utama:
- Beranda: Ringkasan kondisi panas publik dan gambaran umum UHI Kota Semarang.
- Knowledge: Pustaka repositori dokumen teknis, SOP, hasil analisis spasial, dan laporan evaluasi mitigasi.
- Dashboard Admin: Akses khusus pejabat administrator Bappeda untuk memantau indeks LST per kecamatan, mengelola hak akses akun staf, dan audit publikasi data.
- Baseline UI: Pedoman desain visual resmi yang mengunci palet hangat charcoal + orange/amber agar seluruh materi visual tetap konsisten.`,
    recommendations: [
      'Gunakan akun resmi dinas berdomain semarang.go.id',
      'Simpan dokumen dalam format PDF atau GeoJSON standar',
      'Hubungi admin jika memerlukan pembaharuan hak akses'
    ]
  },
  {
    id: 'art-5',
    title: 'Evaluasi atap hijau percontohan',
    description: 'Draft penurunan LST atap gedung — menunggu validasi lapangan.',
    category: 'Mitigasi',
    tag: 'Mitigasi',
    status: 'Menunggu',
    lst: '33.2°C',
    ndvi: '0.45',
    date: '25 Mei 2026',
    author: 'Tim Peneliti Arsitektur Hijau',
    readTime: '5 mnt baca',
    content: `Laporan uji coba pemasangan extensive green roof seluas 450 m² di atap Gedung Moch. Ihsan Balai Kota Semarang.

Hasil Awal:
- Suhu permukaan atap beton konvensional mencapai 51.2°C pada pukul 13:00 WIB.
- Suhu permukaan atap vegetasi tercatat 33.2°C (selisih penurunan 18°C).
- Suhu ruangan lantai 8 di bawah atap hijau turun rata-rata 2.1°C, menghemat daya pendingin udara (AC) hingga 14%.

Status Evaluasi:
Menunggu validasi sensor termokopel independen dan laporan ketahanan drainase saat puncak musim hujan.`,
    recommendations: [
      'Uji ketahanan waterproofing membran selama 12 bulan',
      'Kalkulasi efisiensi biaya perawatan tanaman sedum lokal',
      'Penyusunan rancangan Peraturan Walikota tentang insentif Green Building'
    ]
  },
  {
    id: 'art-6',
    title: 'Dataset LST sentinel 2026',
    description: 'Citra termal komposit Juni 2026, siap unduh untuk analisis.',
    category: 'Hotspot',
    tag: 'Hotspot',
    status: 'Hangat / valid',
    date: '18 Mei 2026',
    author: 'Unit GIS Bappeda',
    readTime: '3 mnt baca',
    content: `Dataset geospasial citra komposit Sentinel-3 SLSTR dan Landsat 9 TIRS Kota Semarang dengan resolusi spasial 30 meter.

Metadata:
- Tanggal akuisisi: 1-15 Juni 2026 (kondisi tutupan awan < 5%)
- Koordinat pembatas: 110.30° E - 110.52° E, 6.92° S - 7.10° S
- Format: GeoTIFF (.tif) dan Shapefile (.shp) dengan sistem koordinat WGS 84 / UTM Zone 49S
- Parameter: Land Surface Temperature (LST °C), Normalized Difference Vegetation Index (NDVI), Normalized Difference Built-up Index (NDBI).`,
    recommendations: [
      'Gunakan QGIS atau ArcGIS Pro untuk membuka file raster',
      'Lakukan kalibrasi radiometrik jika membandingkan dengan data tahun 2023',
      'Laporkan deviasi anomali ke tim GIS Bappeda'
    ]
  },
  {
    id: 'art-7',
    title: 'Strategi Kanopi Pohon Trembesi di Jalan Pandanaran',
    description: 'Pengukuran penurunan suhu mikroklimat 2.4°C dengan koridor hijau berkelanjutan.',
    category: 'RTH',
    tag: 'RTH',
    status: 'Hangat / valid',
    lst: '34.5°C',
    ndvi: '0.26',
    date: '14 Mei 2026',
    author: 'Dinas Perumahan dan Kawasan Permukiman',
    readTime: '4 mnt baca',
    content: `Studi efektivitas kanopi bertingkat di koridor komersial Jalan Pandanaran. Data mikroklimat membuktikan bahwa kanopi peneduh dapat menurunkan suhu udara setinggi 1.5 meter sebesar 2.4°C dan menurunkan Mean Radiant Temperature (MRT) hingga 8.7°C.`,
    recommendations: [
      'Penambahan 120 titik pohon pelindung baru',
      'Pelebaran jalur tanah permeable di sekitar akar',
      'Pemasangan bangku pedestrian teduh di titik halte bus Trans Semarang'
    ]
  },
  {
    id: 'art-8',
    title: 'Penerapan Cool Pavement di Kawasan Kota Lama',
    description: 'Uji material paving berpori reflektif untuk kenyamanan pejalan kaki.',
    category: 'Mitigasi',
    tag: 'Mitigasi',
    status: 'Hangat / valid',
    date: '08 Mei 2026',
    author: 'Badan Pengelola Kawasan Kota Lama (BP2KL)',
    readTime: '4 mnt baca',
    content: `Penggantian aspal konvensional dengan batu bata alam dan porous concrete di zona cagar budaya Kota Lama Semarang terbukti mengurangi retensi panas malam hari sebesar 1.9°C, meningkatkan kenyamanan termal wisatawan.`,
    recommendations: [
      'Ekspansi pemasangan ke koridor Jalan Merak dan Kepodang',
      'Integrasi sumur retensi banjir rob bawah tanah',
      'Pembersihan pori paving dari endapan lumpur secara periodik'
    ]
  }
];

export const COLOR_SWATCHES: SwatchItem[] = [
  { name: 'canvas', hex: '#FAF7F5', description: 'Latar kanvas mutiara hangat' },
  { name: 'surface', hex: '#FFFFFF', description: 'Kartu, navbar, modal' },
  { name: 'ink', hex: '#272023', description: 'Teks utama & judul display' },
  { name: 'body', hex: '#595155', description: 'Teks bodi & konten deskripsi' },
  { name: 'muted', hex: '#8A7E84', description: 'Metadata & subtitle' },
  { name: 'subtle', hex: '#B8ACB3', description: 'Caption & pembatas halus' },
  { name: 'line', hex: '#ECE4E8', description: 'Border pemisah kartu & tabel' },
  { name: 'primary', hex: '#6E3E53', description: 'Dusty Plum — Brand & CTA utama' },
  { name: 'primary-hover', hex: '#5A2E42', description: 'Hover tombol brand' },
  { name: 'brand-pill-bg', hex: '#EEDDE4', description: 'Latar kapsul nav aktif & lencana' },
  { name: 'brand-pill-text', hex: '#5A2C40', description: 'Teks kapsul menu aktif' },
  { name: 'eyebrow', hex: '#936277', description: 'Label header kapital renggang' },
  { name: 'heat', hex: '#B91C1C', description: 'Hotspot anomali suhu tinggi' },
  { name: 'cool', hex: '#10B981', description: 'Zona sejuk & tutupan vegetasi' },
];

// FR-01 & FR-02: Modul Capture Datasets
export const MOCK_DATA_SOURCES: DataSourceItem[] = [
  {
    id: 'src-1',
    sourceName: 'Landsat 8/9 TIRS & OLI (Thermal & Optical)',
    type: 'Citra Satelit',
    provider: 'Google Earth Engine / USGS',
    period: 'Juni 2026 (Komposit 16-hari)',
    recordCount: '16 Scene (Resolusi 30m)',
    completenessPct: 98.4,
    crossValidationStatus: 'Valid / Lolos',
    bmkgCorrelationR: 0.91,
    lastSync: '14 Jun 2026, 04:12 WIB',
  },
  {
    id: 'src-2',
    sourceName: 'Stasiun Meteorologi Maritim Tanjung Emas & Ahmad Yani',
    type: 'Stasiun Cuaca',
    provider: 'BMKG Stasiun Klimatologi Jawa Tengah',
    period: 'Mei - Juni 2026 (Per Jam)',
    recordCount: '1.440 Observasi',
    completenessPct: 100,
    crossValidationStatus: 'Valid / Lolos',
    bmkgCorrelationR: 1.0,
    lastSync: '15 Jun 2026, 10:00 WIB',
  },
  {
    id: 'src-3',
    sourceName: 'Kepadatan Penduduk & Bangunan per Kelurahan',
    type: 'Kependudukan',
    provider: 'BPS Kota Semarang',
    period: 'Semester I 2026',
    recordCount: '177 Kelurahan',
    completenessPct: 96.0,
    crossValidationStatus: 'Valid / Lolos',
    bmkgCorrelationR: 0.74,
    lastSync: '01 Jun 2026, 09:30 WIB',
  },
  {
    id: 'src-4',
    sourceName: 'Peta Vektor Tutupan Lahan & RTH Publik',
    type: 'Geospasial RTH',
    provider: 'Dinas Perkim & DLH Kota Semarang',
    period: 'Pembaruan Q2 2026',
    recordCount: '1.240 Poligon Taman & Hutan Kota',
    completenessPct: 92.5,
    crossValidationStatus: 'Perlu Kalibrasi',
    bmkgCorrelationR: 0.68,
    lastSync: '28 Mei 2026, 14:15 WIB',
  }
];

// FR-08: AI Random Forest Predictions
export const MOCK_AI_PREDICTIONS: AIPredictionItem[] = [
  {
    id: 'pred-1',
    wilayah: 'Semarang Tengah',
    historicalLst: 38.4,
    predictedLst2027: 39.1,
    predictedLst2030: 40.2,
    trend: 'Meningkat Tajam',
    modelConfidence: 93.8,
  },
  {
    id: 'pred-2',
    wilayah: 'Semarang Utara',
    historicalLst: 37.9,
    predictedLst2027: 38.5,
    predictedLst2030: 39.4,
    trend: 'Meningkat Tajam',
    modelConfidence: 91.5,
  },
  {
    id: 'pred-3',
    wilayah: 'Genuk',
    historicalLst: 37.2,
    predictedLst2027: 37.8,
    predictedLst2030: 38.9,
    trend: 'Meningkat Tajam',
    modelConfidence: 89.2,
  },
  {
    id: 'pred-4',
    wilayah: 'Semarang Timur',
    historicalLst: 36.8,
    predictedLst2027: 37.3,
    predictedLst2030: 38.1,
    trend: 'Meningkat Moderat',
    modelConfidence: 94.0,
  },
  {
    id: 'pred-5',
    wilayah: 'Gayamsari',
    historicalLst: 35.6,
    predictedLst2027: 36.0,
    predictedLst2030: 36.7,
    trend: 'Meningkat Moderat',
    modelConfidence: 92.1,
  },
  {
    id: 'pred-6',
    wilayah: 'Semarang Selatan',
    historicalLst: 34.2,
    predictedLst2027: 34.4,
    predictedLst2030: 34.9,
    trend: 'Stabil',
    modelConfidence: 95.4,
  }
];

// FR-09: DBSCAN Spatial Clusters
export const MOCK_DBSCAN_CLUSTERS: DBSCANClusterItem[] = [
  {
    clusterId: 0,
    name: 'Klaster 0: Hotspot Inti Komersial (High Thermal, Low NDVI)',
    districts: ['Semarang Tengah', 'Semarang Timur'],
    avgLst: 37.6,
    avgNdvi: 0.13,
    avgNdbi: 0.35,
    priorityLevel: 'Prioritas 1 (Kritis)',
    suggestedAction: 'Retrofit green roof gedung bertingkat, kanopi jalan protokol, albedo paving trotoar.'
  },
  {
    clusterId: 1,
    name: 'Klaster 1: Hotspot Pesisir & Logistik Pelabuhan',
    districts: ['Semarang Utara', 'Genuk'],
    avgLst: 37.5,
    avgNdvi: 0.13,
    avgNdbi: 0.38,
    priorityLevel: 'Prioritas 1 (Kritis)',
    suggestedAction: 'Pembangunan coastal green belt mangrove dan koridor ventilasi angin laut ke darat.'
  },
  {
    clusterId: 2,
    name: 'Klaster 2: Koridor Urban Transisi',
    districts: ['Semarang Selatan', 'Gayamsari', 'Semarang Barat', 'Candisari'],
    avgLst: 33.9,
    avgNdvi: 0.25,
    avgNdbi: 0.21,
    priorityLevel: 'Prioritas 2 (Tinggi)',
    suggestedAction: 'Optimalisasi sempadan sungai (Kanal Banjir Barat/Timur) dan taman lingkungan perumahan.'
  },
  {
    clusterId: 3,
    name: 'Klaster 3: Penyangga Perbukitan Hijau (Cool Sink)',
    districts: ['Gajahmungkur', 'Banyumanik', 'Gunungpati', 'Mijen'],
    avgLst: 29.5,
    avgNdvi: 0.58,
    avgNdbi: -0.08,
    priorityLevel: 'Penyangga Hijau',
    suggestedAction: 'Konservasi ketat resapan air, moratorium alih fungsi lahan sawah dan hutan lindung hulu.'
  }
];

// FR-10: AI Validation Logs
export const MOCK_AI_VALIDATIONS: AIValidationRecord[] = [
  {
    id: 'val-1',
    modelName: 'Random Forest LST Regressor v2.1',
    datasetPeriod: 'Training 2020-2025, Test Juni 2026',
    evaluatedBy: 'Dr. Retno (Pakar Klimatologi Lingkungan UNDIP)',
    evaluationDate: '10 Jun 2026',
    scientificMetric: 'R² = 0.912, RMSE = 0.58°C, MAE = 0.44°C',
    status: 'Tervalidasi',
    notes: 'Korelasi spasial sangat kuat terhadap data verifikasi BMKG. Model disetujui untuk publikasi repository.',
  },
  {
    id: 'val-2',
    modelName: 'DBSCAN Spatial Cluster v1.4 (eps=0.045, min_samples=2)',
    datasetPeriod: 'Komposit Spasial Mei-Juni 2026',
    evaluatedBy: 'Tim Ahli GIS Bappeda Litbang',
    evaluationDate: '08 Jun 2026',
    scientificMetric: 'Silhouette Score = 0.74, Davies-Bouldin = 0.62',
    status: 'Tervalidasi',
    notes: 'Pemisahan 4 klaster utama mencerminkan zonasi spasial riil Kota Semarang tanpa noise berlebih.',
  },
  {
    id: 'val-3',
    modelName: 'Microclimate Thermal Neural Network v0.8 (Eksperimental)',
    datasetPeriod: 'Data IoT Simpang Lima Mei 2026',
    evaluatedBy: 'Staf GIS DLH Kota Semarang',
    evaluationDate: '01 Jun 2026',
    scientificMetric: 'R² = 0.68, RMSE = 1.34°C',
    status: 'Perlu Perbaikan',
    notes: 'Terjadi overfitting di sekitar area beraspal basah. Perlu kalibrasi tambahan kelembapan relatif.',
  }
];

// FR-16: API Documentation
export const MOCK_API_ENDPOINTS: APIEndpointDef[] = [
  {
    method: 'GET',
    path: '/api/v1/uhi/districts',
    description: 'Mengambil ringkasan suhu LST, NDVI, NDBI, dan prioritas RTH untuk seluruh kecamatan Kota Semarang.',
    authRequired: false,
    sampleResponse: {
      status: 'success',
      totalDistricts: 12,
      data: [
        { district: 'Semarang Tengah', lst: 38.4, ndvi: 0.11, ndbi: 0.35, status: 'Hotspot' },
        { district: 'Semarang Utara', lst: 37.9, ndvi: 0.14, ndbi: 0.38, status: 'Hotspot' }
      ]
    }
  },
  {
    method: 'GET',
    path: '/api/v1/ai/predictions',
    description: 'Mengambil proyeksi tren LST model Random Forest v2.1 per kecamatan tahun 2027 dan 2030.',
    authRequired: true,
    sampleResponse: {
      status: 'success',
      modelVersion: 'RF-v2.1',
      validationStatus: 'Tervalidasi',
      predictions: [
        { district: 'Semarang Tengah', lst_2026: 38.4, pred_2027: 39.1, pred_2030: 40.2 }
      ]
    }
  },
  {
    method: 'GET',
    path: '/api/v1/mitigation/recommendations',
    description: 'Menghasilkan daftar rekomendasi mitigasi UHI berbasis klaster spasial DBSCAN.',
    authRequired: false,
    sampleResponse: {
      status: 'success',
      cluster: 'Klaster 0: Hotspot Inti Komersial',
      recommendations: [
        'Green Roof Retrofit',
        'Pohon Peneduh Kanopi Lebar (Trembesi)',
        'Cool Pavement Albedo > 0.4'
      ]
    }
  }
];

// FR-20, FR-21, FR-22: Post Mitigation Evaluation & Anomaly Detection Records
export const MOCK_POST_MITIGATION_RECORDS: PostMitigationRecord[] = [
  {
    id: 'pm-1',
    wilayah: 'Semarang Tengah (Koridor Pandanaran)',
    actionTaken: 'Penanaman 120 Pohon Trembesi & Perlebaran Jalur Hijau Pedestrian',
    targetIntervention: 'Peningkatan Kanopi Vegetasi',
    periodBefore: 'Juni 2024',
    periodAfter: 'Juni 2026',
    lstBefore: 39.8,
    lstAfter: 37.4,
    ndviBefore: 0.08,
    ndviAfter: 0.22,
    rthPctBefore: 6.2,
    rthPctAfter: 11.5,
    aiPredictedLst: 37.6,
    deviation: -0.2, // Actual was 0.2 cooler than AI expected
    isAnomaly: false,
    dlhInspector: 'Budi Santoso, S.T. (Dinas Lingkungan Hidup)',
    dlhEvaluationNotes: 'Penurunan suhu permukaan mencapai 2.4°C. Efektivitas peneduhan kanopi sangat terasa bagi pedestrian pada jam 11:00-14:00 WIB.',
    efficacyRating: 'Sangat Efektif'
  },
  {
    id: 'pm-2',
    wilayah: 'Semarang Utara (Buffer Pelabuhan Tanjung Emas)',
    actionTaken: 'Sabuk Hijau Mangrove 15.000 Bibit & Penanaman Cemara Udang',
    targetIntervention: 'Sabuk Pesisir (Coastal Green Belt)',
    periodBefore: 'Mei 2024',
    periodAfter: 'Juni 2026',
    lstBefore: 39.1,
    lstAfter: 37.9,
    ndviBefore: 0.09,
    ndviAfter: 0.18,
    rthPctBefore: 7.0,
    rthPctAfter: 12.8,
    aiPredictedLst: 38.0,
    deviation: -0.1,
    isAnomaly: false,
    dlhInspector: 'Ir. Ahmad Zaini (DLH Bidang Konservasi)',
    dlhEvaluationNotes: 'Mangrove tumbuh baik, namun sebagian cemara udang di sempadan timur terdampak abrasi dan debu kontainer.',
    efficacyRating: 'Efektif'
  },
  {
    id: 'pm-3',
    wilayah: 'Genuk (Kawasan Industri Terboyo)',
    actionTaken: 'Penerapan Cat Atap Reflektif (Cool Roof) 8 Kompleks Pergudangan',
    targetIntervention: 'Material Albedo Tinggi',
    periodBefore: 'Juli 2025',
    periodAfter: 'Juni 2026',
    lstBefore: 38.9,
    lstAfter: 37.2,
    ndviBefore: 0.06,
    ndviAfter: 0.07,
    rthPctBefore: 4.8,
    rthPctAfter: 5.1,
    aiPredictedLst: 35.8,
    deviation: 1.4, // actual 37.2 vs predicted 35.8 -> Deviation > 1.0 = Anomaly!
    isAnomaly: true,
    dlhInspector: 'Siti Rahma, M.Sc. (Pengawas Pengendalian Dampak Lingkungan DLH)',
    dlhEvaluationNotes: 'Terdeteksi deviasi anomali (+1.4°C lebih tinggi dari prediksi model AI). Penyebab: intensitas emisi truk kontainer dan debu batubara menempel pada cat reflektif sehingga albedo menurun.',
    efficacyRating: 'Cukup'
  }
];

// FR-24: AI Model Versions
export const MOCK_MODEL_VERSIONS: ModelVersionRecord[] = [
  {
    version: 'RF-v2.1 (Produksi)',
    algorithm: 'Random Forest',
    trainingDataCutoff: 'Dataset Spasial 2020-2025 + Ground Truth BMKG',
    sampleCount: 12480,
    accuracyMetric: 'R² = 0.912, RMSE = 0.58°C',
    status: 'Aktif di Produksi',
    releaseDate: '10 Jun 2026'
  },
  {
    version: 'RF-v2.0 (Arsip)',
    algorithm: 'Random Forest',
    trainingDataCutoff: 'Dataset Spasial 2018-2023',
    sampleCount: 8900,
    accuracyMetric: 'R² = 0.865, RMSE = 0.82°C',
    status: 'Arsip',
    releaseDate: '15 Jan 2025'
  },
  {
    version: 'DBSCAN-v1.4 (Produksi)',
    algorithm: 'DBSCAN',
    trainingDataCutoff: 'Dataset Spasial Juni 2026 (12 Kecamatan, 177 Kelurahan)',
    sampleCount: 177,
    accuracyMetric: 'Silhouette Score = 0.74',
    status: 'Aktif di Produksi',
    releaseDate: '08 Jun 2026'
  }
];

// FR-17: Chatbot Initial Q&A
export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: 'Halo! Saya asisten pintar ShadeMarang KMS. Anda dapat menanyakan seputar kondisi Urban Heat Island (UHI) di Kota Semarang, suhu wilayah, rekomendasi mitigasi, atau data hasil analisis AI.',
    timestamp: 'Baru saja'
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: 'Berapa suhu tertinggi UHI di Semarang dan di mana lokasinya?',
    timestamp: '1 menit lalu'
  },
  {
    id: 'msg-3',
    sender: 'bot',
    text: 'Berdasarkan data komposit Landsat 8/9 & Sentinel per Juni 2026, suhu permukaan (LST) tertinggi tercatat di Kecamatan **Semarang Tengah** sebesar **38.4°C** (NDVI 0.11), disusul **Semarang Utara** sebesar **37.9°C** dan **Genuk** sebesar **37.2°C**.',
    timestamp: '1 menit lalu',
    sources: ['Dataset LST sentinel 2026', 'Profil Wilayah Semarang Tengah']
  }
];

