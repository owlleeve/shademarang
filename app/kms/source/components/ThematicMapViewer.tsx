import React, { useState, useMemo } from 'react';
import { WilayahData } from '../types';
import {
  Thermometer,
  Trees,
  AlertTriangle,
  Wind,
  Layers,
  Info,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  MapPin,
  Eye,
  Sliders,
  Sparkles,
  Compass,
  ArrowRight,
  TrendingDown,
  Building,
  Radio
} from 'lucide-react';

export type ThematicLayer = 'lst' | 'ndvi' | 'hvi' | 'wind';

interface DistrictPolygon {
  id: string;
  name: string;
  d: string; // SVG path definition
  labelX: number;
  labelY: number;
  zone: string;
}

// Simplified high-accuracy cartographic polygons for all 16 districts of Semarang
// Coordinate space: 900 x 650 (Aspect ratio ~1.38, North is up towards Java Sea)
export const DISTRICT_POLYGONS: DistrictPolygon[] = [
  // Pesisir Barat: Tugu
  {
    id: 'w-14',
    name: 'Tugu',
    d: 'M 70,120 L 210,120 L 220,200 L 170,240 L 90,230 L 60,180 Z',
    labelX: 135,
    labelY: 175,
    zone: 'Pesisir Barat'
  },
  // Pesisir Tengah-Barat: Semarang Barat
  {
    id: 'w-8',
    name: 'Semarang Barat',
    d: 'M 210,120 L 360,110 L 370,180 L 340,260 L 250,260 L 220,200 Z',
    labelX: 290,
    labelY: 185,
    zone: 'Pesisir & Perumahan'
  },
  // Pesisir Tengah-Utara: Semarang Utara (Tanjung Mas & Kota Lama)
  {
    id: 'w-2',
    name: 'Semarang Utara',
    d: 'M 360,110 L 510,100 L 520,180 L 460,190 L 370,180 Z',
    labelX: 435,
    labelY: 145,
    zone: 'Pesisir Pelabuhan'
  },
  // Pesisir Timur: Genuk (Kaligawe & Terboyo Industri)
  {
    id: 'w-4',
    name: 'Genuk',
    d: 'M 510,100 L 730,95 L 745,180 L 630,220 L 530,200 L 520,180 Z',
    labelX: 620,
    labelY: 155,
    zone: 'Industri Pesisir'
  },
  // Inti Kota: Semarang Tengah (Simpang Lima / Pusat)
  {
    id: 'w-1',
    name: 'Semarang Tengah',
    d: 'M 370,180 L 460,190 L 455,270 L 375,265 Z',
    labelX: 415,
    labelY: 228,
    zone: 'Pusat Komersial'
  },
  // Inti Kota: Semarang Timur
  {
    id: 'w-3',
    name: 'Semarang Timur',
    d: 'M 460,190 L 530,200 L 525,270 L 455,270 Z',
    labelX: 490,
    labelY: 232,
    zone: 'Inti Perkotaan'
  },
  // Inti Timur: Gayamsari
  {
    id: 'w-6',
    name: 'Gayamsari',
    d: 'M 530,200 L 630,220 L 610,290 L 525,270 Z',
    labelX: 570,
    labelY: 250,
    zone: 'Pemukiman & Niaga'
  },
  // Dataran Timur: Pedurungan
  {
    id: 'w-15',
    name: 'Pedurungan',
    d: 'M 630,220 L 755,210 L 780,340 L 640,360 L 610,290 Z',
    labelX: 690,
    labelY: 285,
    zone: 'Permukiman Padat'
  },
  // Tengah-Selatan: Semarang Selatan
  {
    id: 'w-5',
    name: 'Semarang Selatan',
    d: 'M 375,265 L 455,270 L 450,335 L 365,330 Z',
    labelX: 410,
    labelY: 300,
    zone: 'Pusat & Jasa'
  },
  // Perbukitan Bawah: Candisari
  {
    id: 'w-7',
    name: 'Candisari',
    d: 'M 450,335 L 535,325 L 530,410 L 430,405 L 435,340 Z',
    labelX: 480,
    labelY: 370,
    zone: 'Perbukitan Perumahan'
  },
  // Perbukitan Hijau: Gajahmungkur
  {
    id: 'w-9',
    name: 'Gajahmungkur',
    d: 'M 340,260 L 375,265 L 435,340 L 430,405 L 350,420 L 315,340 Z',
    labelX: 375,
    labelY: 345,
    zone: 'Lembah & Perbukitan'
  },
  // Perbukitan Barat: Ngaliyan
  {
    id: 'w-13',
    name: 'Ngaliyan',
    d: 'M 170,240 L 250,260 L 315,340 L 260,430 L 160,410 L 140,320 Z',
    labelX: 215,
    labelY: 330,
    zone: 'Penyangga Barat'
  },
  // Agroforestri Barat Daya: Mijen
  {
    id: 'w-12',
    name: 'Mijen',
    d: 'M 140,320 L 160,410 L 260,430 L 245,560 L 110,540 L 95,420 Z',
    labelX: 175,
    labelY: 485,
    zone: 'Agroforestri & Resapan'
  },
  // Konservasi Hulu & Waduk: Gunungpati
  {
    id: 'w-11',
    name: 'Gunungpati',
    d: 'M 260,430 L 350,420 L 420,440 L 400,580 L 245,560 Z',
    labelX: 330,
    labelY: 500,
    zone: 'Konservasi Hulu'
  },
  // Dataran Tinggi Selatan: Banyumanik
  {
    id: 'w-10',
    name: 'Banyumanik',
    d: 'M 420,440 L 530,410 L 560,460 L 530,590 L 400,580 Z',
    labelX: 475,
    labelY: 510,
    zone: 'Dataran Tinggi Candi'
  },
  // Kawasan Pendidikan & Perbukitan: Tembalang
  {
    id: 'w-16',
    name: 'Tembalang',
    d: 'M 535,325 L 640,360 L 670,490 L 560,570 L 560,460 L 530,410 Z',
    labelX: 605,
    labelY: 445,
    zone: 'Kawasan Pendidikan'
  }
];

// Feature Point: Sensor Stasiun BMKG & IoT
interface StationPoint {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  temp: string;
  humidity: string;
}

const WEATHER_STATIONS: StationPoint[] = [
  {
    id: 'st-1',
    name: 'Stasiun Meteorologi Maritim Tanjung Emas',
    type: 'BMKG Resmi',
    x: 440,
    y: 110,
    temp: '33.4°C',
    humidity: '76%'
  },
  {
    id: 'st-2',
    name: 'Sensor IoT AWS Simpang Lima',
    type: 'Mikro IoT Bappeda',
    x: 415,
    y: 228,
    temp: '35.8°C',
    humidity: '58%'
  },
  {
    id: 'st-3',
    name: 'Stasiun Klimatologi Semarang (Semarang Barat)',
    type: 'BMKG Resmi',
    x: 270,
    y: 160,
    temp: '32.6°C',
    humidity: '68%'
  },
  {
    id: 'st-4',
    name: 'Stasiun Geofisika & AWS Tembalang (Undip)',
    type: 'BMKG & Riset',
    x: 600,
    y: 430,
    temp: '30.1°C',
    humidity: '72%'
  },
  {
    id: 'st-5',
    name: 'AWS Agro-Klimat BSB Mijen',
    type: 'Mikro IoT',
    x: 175,
    y: 470,
    temp: '27.9°C',
    humidity: '82%'
  }
];

// Feature Point: Ruang Sejuk & RTH Utama
interface CoolSpacePoint {
  id: string;
  name: string;
  x: number;
  y: number;
  coolingRadius: string;
}

const COOL_SPACES: CoolSpacePoint[] = [
  { id: 'cs-1', name: 'Hutan Kota Tinjomoyo', x: 420, y: 445, coolingRadius: 'Efek sejuk r = 2.4 km' },
  { id: 'cs-2', name: 'Taman Indonesia Kaya (Taman KB)', x: 410, y: 275, coolingRadius: 'Efek sejuk r = 600 m' },
  { id: 'cs-3', name: 'Waduk Jatibarang & Goa Kreo', x: 310, y: 470, coolingRadius: 'Efek sejuk r = 3.2 km' },
  { id: 'cs-4', name: 'Koridor RTH Banjir Kanal Barat', x: 345, y: 230, coolingRadius: 'Ventilasi r = 1.8 km' },
  { id: 'cs-5', name: 'Hutan Konservasi Penggaron / Mijen', x: 160, y: 520, coolingRadius: 'Biomassa lebat r = 4.5 km' }
];

interface ThematicMapViewerProps {
  districts: WilayahData[];
  selectedDistrictId: string;
  onSelectDistrict: (id: string) => void;
  compact?: boolean;
}

export const ThematicMapViewer: React.FC<ThematicMapViewerProps> = ({
  districts,
  selectedDistrictId,
  onSelectDistrict,
  compact = false
}) => {
  const [activeLayer, setActiveLayer] = useState<ThematicLayer>('lst');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showSensors, setShowSensors] = useState<boolean>(true);
  const [showCoolSpaces, setShowCoolSpaces] = useState<boolean>(true);
  const [showRivers, setShowRivers] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedStation, setSelectedStation] = useState<StationPoint | null>(null);

  // Quick lookup dictionary for district data
  const districtMap = useMemo(() => {
    const map = new Map<string, WilayahData>();
    districts.forEach((d) => map.set(d.id, d));
    return map;
  }, [districts]);

  // Active district
  const activeDistrict = districtMap.get(selectedDistrictId) || districts[0];
  const hoveredDistrict = hoveredId ? districtMap.get(hoveredId) : null;

  // Color generator for each layer
  const getDistrictFill = (district: WilayahData, isHovered: boolean, isSelected: boolean) => {
    if (activeLayer === 'lst') {
      // LST thermal spectrum:
      // >= 38: Deep Red-Orange (#DC2626 / #C2410C)
      // >= 36.5: Intense Orange (#EA580C)
      // >= 34.5: Amber-Orange (#F97316)
      // >= 32.5: Warm Yellow (#FBBF24)
      // >= 30.0: Light Green-Yellow (#A3E635)
      // < 30.0: Cool Forest Green (#22C55E)
      if (district.lst >= 38.0) return isHovered ? '#B91C1C' : '#DC2626';
      if (district.lst >= 36.5) return isHovered ? '#C2410C' : '#EA580C';
      if (district.lst >= 34.5) return isHovered ? '#D97706' : '#F59E0B';
      if (district.lst >= 32.5) return isHovered ? '#EAB308' : '#FCD34D';
      if (district.lst >= 30.0) return isHovered ? '#65A30D' : '#84CC16';
      return isHovered ? '#15803D' : '#22C55E';
    }

    if (activeLayer === 'ndvi') {
      // NDVI vegetation spectrum:
      // >= 0.65: Deep Forest Green (#14532D)
      // >= 0.50: Lush Green (#15803D)
      // >= 0.35: Moderate Green (#4ADE80)
      // >= 0.20: Pale Green / Low (#A7F3D0)
      // < 0.20: Barren / High Built (#FDE68A)
      if (district.ndvi >= 0.65) return isHovered ? '#052e16' : '#14532d';
      if (district.ndvi >= 0.50) return isHovered ? '#14532d' : '#15803d';
      if (district.ndvi >= 0.35) return isHovered ? '#16a34a' : '#22c55e';
      if (district.ndvi >= 0.20) return isHovered ? '#65a30d' : '#a3e635';
      return isHovered ? '#d97706' : '#fde047';
    }

    if (activeLayer === 'hvi') {
      // Heat Vulnerability Index (1 - 100):
      // >= 80: Extreme Vulnerability (#991B1B)
      // >= 65: High (#DC2626)
      // >= 45: Moderate (#F97316)
      // < 45: Low (#10B981)
      const score = district.hviScore || 50;
      if (score >= 80) return isHovered ? '#7F1D1D' : '#991B1B';
      if (score >= 65) return isHovered ? '#B91C1C' : '#DC2626';
      if (score >= 45) return isHovered ? '#C2410C' : '#F97316';
      return isHovered ? '#047857' : '#10B981';
    }

    // Default for Wind / Ventilation Corridors
    // Highlight low-resistance air corridors (coastal to mountains) in light cyan-blue
    if (district.zoneType === 'Pesisir Utara') return isHovered ? '#0284C7' : '#38BDF8';
    if (district.zoneType === 'Perbukitan Selatan') return isHovered ? '#059669' : '#10B981';
    return isHovered ? '#CBD5E1' : '#E2E8F0';
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-sm overflow-hidden">
      {/* Top Map Toolbar: Layer Selector & Control Badges */}
      <div className="p-4 sm:p-6 border-b border-[#E7E5E4] bg-[#FFFEF8] flex flex-wrap items-center justify-between gap-4">
        {/* Layer Toggle Tabs */}
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8A7E84] block mb-2">
            Pilih Lapisan Tematik Spasial:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveLayer('lst')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeLayer === 'lst'
                  ? 'bg-[#6E3E53] text-white shadow-sm ring-2 ring-[#6E3E53]/20'
                  : 'bg-white text-[#595155] border border-[#ECE4E8] hover:bg-[#FAF7F5]'
              }`}
            >
              <Thermometer className="w-3.5 h-3.5" />
              Suhu Permukaan (LST)
            </button>

            <button
              onClick={() => setActiveLayer('ndvi')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeLayer === 'ndvi'
                  ? 'bg-[#15803D] text-white shadow-sm ring-2 ring-[#15803D]/20'
                  : 'bg-white text-[#595155] border border-[#ECE4E8] hover:bg-[#F0FDF4]'
              }`}
            >
              <Trees className="w-3.5 h-3.5" />
              Indeks Vegetasi (NDVI)
            </button>

            <button
              onClick={() => setActiveLayer('hvi')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeLayer === 'hvi'
                  ? 'bg-[#991B1B] text-white shadow-sm ring-2 ring-[#991B1B]/20'
                  : 'bg-white text-[#57534E] border border-[#E7E5E4] hover:bg-[#FEF2F2]'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Kerentanan Panas (HVI)
            </button>

            <button
              onClick={() => setActiveLayer('wind')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeLayer === 'wind'
                  ? 'bg-[#0284C7] text-white shadow-sm ring-2 ring-[#0284C7]/20'
                  : 'bg-white text-[#57534E] border border-[#E7E5E4] hover:bg-[#F0F9FF]'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              Koridor Angin Laut &amp; Sungai
            </button>
          </div>
        </div>

        {/* Overlays Toggle */}
        <div className="flex items-center gap-2 text-xs">
          <label className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#ECE4E8] text-[#595155] cursor-pointer">
            <input
              type="checkbox"
              checked={showSensors}
              onChange={(e) => setShowSensors(e.target.checked)}
              className="accent-[#6E3E53]"
            />
            <Radio className="w-3.5 h-3.5 text-[#6E3E53]" />
            <span>Stasiun Sensor BMKG</span>
          </label>

          <label className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#ECE4E8] text-[#595155] cursor-pointer">
            <input
              type="checkbox"
              checked={showCoolSpaces}
              onChange={(e) => setShowCoolSpaces(e.target.checked)}
              className="accent-[#15803D]"
            />
            <Trees className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Taman Pendingin</span>
          </label>

          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center gap-1 bg-white border border-[#E7E5E4] rounded-lg p-0.5">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1 text-[#78716C] hover:text-[#1C1917] cursor-pointer"
              title="Perbesar"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1 text-[#78716C] hover:text-[#1C1917] cursor-pointer"
              title="Perkecil"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 text-[#78716C] hover:text-[#1C1917] cursor-pointer"
              title="Reset Tampilan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Stage */}
      <div className="relative bg-[#0F172A] overflow-hidden min-h-[480px] sm:min-h-[540px]">
        {/* Coastal / Sea Indicator (North) */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0284C7]/20 to-transparent pointer-events-none flex items-start justify-center pt-2">
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#38BDF8]/60 uppercase flex items-center gap-2">
            ≈ ≈ ≈ LAUT JAWA (PESISIR UTARA KOTA SEMARANG) ≈ ≈ ≈
          </span>
        </div>

        {/* Southern Hills Indicator (South) */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#064E3B]/30 to-transparent pointer-events-none flex items-end justify-center pb-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#34D399]/60 uppercase">
            ▲ ▲ PERBUKITAN CANDI, UNGARAN &amp; HULU RESAPAN AIR ▲ ▲
          </span>
        </div>

        {/* SVG Cartographic Canvas */}
        <div className="w-full h-full p-4 flex items-center justify-center">
          <svg
            viewBox="50 80 750 520"
            className="w-full max-w-4xl h-auto transition-transform duration-300 select-none"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <defs>
              {/* Hotspot Pulse Filter */}
              <filter id="hotspotGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              {/* Pattern for water */}
              <pattern id="riverPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 0,10 Q 5,5 10,10 T 20,10" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.4" />
              </pattern>
            </defs>

            {/* Natural Cooling River Corridors (Banjir Kanal Barat & Timur) */}
            {showRivers && (
              <g className="opacity-70 pointer-events-none">
                {/* Banjir Kanal Barat */}
                <path
                  d="M 330,115 Q 340,240 370,360 Q 360,460 320,530"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="5"
                  strokeDasharray="4 2"
                  className="animate-pulse"
                />
                {/* Banjir Kanal Timur */}
                <path
                  d="M 520,110 Q 525,230 545,340 Q 580,440 600,520"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="4"
                  strokeDasharray="4 2"
                />
              </g>
            )}

            {/* Wind Vector Flow Arrows (Visible when Wind layer is on) */}
            {activeLayer === 'wind' && (
              <g className="pointer-events-none opacity-80">
                {/* North to South sea breeze lines */}
                <path d="M 430,100 L 415,220" stroke="#38BDF8" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#arrow)" />
                <path d="M 520,100 L 490,230" stroke="#38BDF8" strokeWidth="3" strokeDasharray="6 4" />
                <path d="M 360,110 L 375,260" stroke="#38BDF8" strokeWidth="3" strokeDasharray="6 4" />
                <path d="M 415,230 L 410,340" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="5 3" />
                <path d="M 490,230 L 480,370" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="5 3" />
                <path d="M 410,340 L 475,510" stroke="#34D399" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 375,260 L 330,500" stroke="#34D399" strokeWidth="2" strokeDasharray="4 4" />
              </g>
            )}

            {/* 16 District Polygons */}
            <g id="district-polygons">
              {DISTRICT_POLYGONS.map((poly) => {
                const district = districtMap.get(poly.id);
                if (!district) return null;

                const isSelected = selectedDistrictId === poly.id;
                const isHovered = hoveredId === poly.id;
                const fillColor = getDistrictFill(district, isHovered, isSelected);

                return (
                  <g key={poly.id} className="cursor-pointer">
                    <path
                      d={poly.d}
                      fill={fillColor}
                      stroke={isSelected ? '#FFFFFF' : isHovered ? '#FCD34D' : '#334155'}
                      strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 1.2}
                      strokeLinejoin="round"
                      onClick={() => onSelectDistrict(poly.id)}
                      onMouseEnter={() => setHoveredId(poly.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="transition-all duration-200"
                    />

                    {/* District Label */}
                    <text
                      x={poly.labelX}
                      y={poly.labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isSelected ? '#FFFFFF' : '#F8FAFC'}
                      fontSize="11"
                      fontWeight={isSelected ? 'bold' : '600'}
                      fontFamily="system-ui, sans-serif"
                      className="pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                    >
                      {poly.name}
                    </text>

                    {/* Dynamic Indicator Badge below name */}
                    <text
                      x={poly.labelX}
                      y={poly.labelY + 13}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={activeLayer === 'lst' && district.lst >= 37 ? '#FEF08A' : '#E2E8F0'}
                      fontSize="9.5"
                      fontFamily="monospace"
                      fontWeight="bold"
                      className="pointer-events-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                    >
                      {activeLayer === 'lst' && `${district.lst}°C`}
                      {activeLayer === 'ndvi' && `NDVI ${district.ndvi}`}
                      {activeLayer === 'hvi' && `HVI ${district.hviScore}`}
                      {activeLayer === 'wind' && `${district.elevationMeters}m dpl`}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Cool Spaces Markers */}
            {showCoolSpaces && (
              <g id="cool-spaces-layer">
                {COOL_SPACES.map((cs) => (
                  <g key={cs.id} transform={`translate(${cs.x}, ${cs.y})`} className="cursor-pointer">
                    <circle r="7" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" className="animate-pulse" />
                    <circle r="14" fill="#10B981" fillOpacity="0.25" />
                    <title>{cs.name}: {cs.coolingRadius}</title>
                  </g>
                ))}
              </g>
            )}

            {/* Weather & IoT Station Markers */}
            {showSensors && (
              <g id="weather-stations-layer">
                {WEATHER_STATIONS.map((st) => (
                  <g
                    key={st.id}
                    transform={`translate(${st.x}, ${st.y})`}
                    onClick={() => setSelectedStation(st)}
                    className="cursor-pointer group"
                  >
                    <rect x="-6" y="-6" width="12" height="12" rx="3" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2" />
                    <circle r="2" fill="#FFFFFF" />
                    <title>{st.name} ({st.type}): {st.temp} | Rh {st.humidity}</title>
                  </g>
                ))}
              </g>
            )}
          </svg>
        </div>

        {/* Floating Real-time Hover Tooltip */}
        {hoveredDistrict && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#ECE4E8] shadow-xl text-xs max-w-xs pointer-events-none z-20">
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <span className="font-bold text-sm text-[#272023]">{hoveredDistrict.wilayah}</span>
              <span className={`badge ${hoveredDistrict.status === 'Hotspot' ? 'badge--kunci' : 'badge--hangat'} text-[10px]`}>
                {hoveredDistrict.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[#595155] pt-1">
              <div>
                <span className="text-[10px] text-[#8A7E84] block">Suhu LST</span>
                <strong className="text-sm font-extrabold text-[#5A2C40]">{hoveredDistrict.lst}°C</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#8A7E84] block">Tutupan RTH</span>
                <strong className="text-sm font-extrabold text-[#15803D]">{hoveredDistrict.vegetationCoverPct}%</strong>
              </div>
            </div>
            <p className="text-[11px] text-[#8A7E84] mt-2 pt-1.5 border-t border-[#ECE4E8]">
              Klik untuk melihat profil mitigasi &amp; data lengkap.
            </p>
          </div>
        )}

        {/* Selected Station Popover */}
        {selectedStation && (
          <div className="absolute bottom-4 left-4 bg-white rounded-2xl p-4 border border-[#6E3E53] shadow-xl text-xs max-w-sm z-20">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-bold text-sm text-[#272023]">{selectedStation.name}</span>
              <button
                onClick={() => setSelectedStation(null)}
                className="text-[#8A7E84] hover:text-[#272023] font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <span className="text-[10px] text-[#6E3E53] font-semibold block">{selectedStation.type}</span>
            <div className="flex items-center gap-4 mt-2 text-[#272023]">
              <span>Suhu Udara: <strong>{selectedStation.temp}</strong></span>
              <span>Kelembaban: <strong>{selectedStation.humidity}</strong></span>
            </div>
          </div>
        )}

        {/* Cartographic Legend (Bawah Kanan) */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-[#ECE4E8] shadow-lg text-xs z-10 max-w-xs">
          <span className="text-[10px] font-extrabold text-[#8A7E84] uppercase tracking-wider block mb-1.5">
            {activeLayer === 'lst' && 'Legenda Suhu Permukaan (LST):'}
            {activeLayer === 'ndvi' && 'Legenda Kerapatan Vegetasi (NDVI):'}
            {activeLayer === 'hvi' && 'Legenda Kerentanan Panas (HVI):'}
            {activeLayer === 'wind' && 'Legenda Dinamika Angin & Aliran:'}
          </span>

          {activeLayer === 'lst' && (
            <div className="space-y-1">
              <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-[#22C55E] via-[#FBBF24] via-[#EA580C] to-[#DC2626]"></div>
              <div className="flex justify-between text-[10px] text-[#78716C] font-mono">
                <span>28°C (Sejuk)</span>
                <span>33°C</span>
                <span>36°C</span>
                <span>38.4°C (Hotspot)</span>
              </div>
            </div>
          )}

          {activeLayer === 'ndvi' && (
            <div className="space-y-1">
              <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-[#FDE047] via-[#84CC16] to-[#14532D]"></div>
              <div className="flex justify-between text-[10px] text-[#78716C] font-mono">
                <span>0.10 (Padat Kedap)</span>
                <span>0.40</span>
                <span>0.70 (Rimbun)</span>
              </div>
            </div>
          )}

          {activeLayer === 'hvi' && (
            <div className="space-y-1">
              <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-[#10B981] via-[#F97316] to-[#991B1B]"></div>
              <div className="flex justify-between text-[10px] text-[#78716C] font-mono">
                <span>HVI Rendah</span>
                <span>Sedang</span>
                <span>Kritis (HVI 88)</span>
              </div>
            </div>
          )}

          {activeLayer === 'wind' && (
            <div className="text-[11px] text-[#57534E] space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#38BDF8] rounded"></span>
                <span>Koridor Aliran Banjir Kanal (Angin Laut)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                <span>Zona Buffer Sejuk RTH Alami</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected District Inspection Footer */}
      <div className="p-5 sm:p-6 bg-white border-t border-[#ECE4E8]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6E3E53]">
                Wilayah Terpilih pada Peta:
              </span>
              <span className="badge badge--hangat text-[10px]">
                {activeDistrict.zoneType}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#272023]">
              {activeDistrict.wilayah}
            </h3>
            <p className="text-xs text-[#8A7E84]">
              Koordinat: {activeDistrict.coordinates} · Elevasi: {activeDistrict.elevationMeters}m dpl · Kepadatan: {activeDistrict.populationDensity?.toLocaleString()} jiwa/km²
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#FAF7F5] px-4 py-2 rounded-xl border border-[#ECE4E8]">
              <span className="text-[10px] text-[#8A7E84] block">LST Suhu Permukaan</span>
              <strong className="text-lg font-bold text-[#5A2C40]">{activeDistrict.lst}°C</strong>
            </div>

            <div className="bg-[#FAF7F5] px-4 py-2 rounded-xl border border-[#ECE4E8]">
              <span className="text-[10px] text-[#8A7E84] block">Indeks Vegetasi (NDVI)</span>
              <strong className="text-lg font-bold text-[#15803D]">{activeDistrict.ndvi}</strong>
            </div>

            <div className="bg-[#FAF7F5] px-4 py-2 rounded-xl border border-[#ECE4E8]">
              <span className="text-[10px] text-[#8A7E84] block">Kerentanan Panas</span>
              <strong className="text-lg font-bold text-[#991B1B]">{activeDistrict.hviScore}/100</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
