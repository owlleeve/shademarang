export interface WilayahData {
  id: string;
  wilayah: string;
  kategori: string;
  lst: number; // e.g. 38.4
  ndvi: number; // e.g. 0.11
  ndbi?: number; // e.g. 0.28
  status: 'Hotspot' | 'Hangat' | 'Neutral';
  vegetationCoverPct: number;
  priorityRTH: number; // 1 to 5 stars
  zoneType: 'Inti Perkotaan' | 'Pesisir Utara' | 'Perbukitan Selatan' | 'Industri Timur' | 'Perumahan Barat';
  populationDensity?: number; // per km2
  hviScore?: number; // Heat Vulnerability Index (1-100)
  elevationMeters?: number; // mdpl
  imperviousSurfacePct?: number; // % kedap air
  areaKm2?: number;
  coordinates?: string;
}

export interface AIPredictionItem {
  id: string;
  wilayah: string;
  historicalLst: number;
  predictedLst2027: number;
  predictedLst2030: number;
  trend: 'Meningkat Tajam' | 'Meningkat Moderat' | 'Stabil';
  modelConfidence: number; // e.g. 94.2%
}

// FR-09: AI DBSCAN Spatial Cluster
export interface DBSCANClusterItem {
  clusterId: number;
  name: string;
  districts: string[];
  avgLst: number;
  avgNdvi: number;
  avgNdbi: number;
  priorityLevel: 'Prioritas 1 (Kritis)' | 'Prioritas 2 (Tinggi)' | 'Prioritas 3 (Sedang)' | 'Penyangga Hijau';
  suggestedAction: string;
}

// FR-10: AI Validation

export interface PostMitigationRecord {
  id: string;
  wilayah: string;
  actionTaken: string;
  targetIntervention: string;
  periodBefore: string;
  periodAfter: string;
  lstBefore: number;
  lstAfter: number;
  ndviBefore: number;
  ndviAfter: number;
  rthPctBefore: number;
  rthPctAfter: number;
  aiPredictedLst: number;
  deviation: number; // lstAfter - aiPredictedLst
  isAnomaly: boolean;
  dlhInspector: string;
  dlhEvaluationNotes: string;
  efficacyRating: 'Sangat Efektif' | 'Efektif' | 'Cukup' | 'Kurang Efektif';
}
