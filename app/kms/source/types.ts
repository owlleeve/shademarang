export type UserRole = 'guest' | 'staff' | 'admin';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Aktif' | 'Menunggu' | 'Nonaktif';
  department: string;
  initial: string;
}

export type PageId = 'index' | 'dashboard' | 'map' | 'modules' | 'knowledge' | 'chat' | 'admin' | 'baseline' | 'login';

export type ArticleCategory = 'Hotspot' | 'Mitigasi' | 'RTH' | 'Panduan';

export type ArticleStatus = 'Hotspot' | 'Hangat / valid' | 'Neutral' | 'Menunggu';

export interface KnowledgeArticle {
  id: string;
  title: string;
  description: string;
  category: ArticleCategory;
  tag: string;
  status: ArticleStatus;
  lst?: string;
  ndvi?: string;
  date: string;
  author: string;
  readTime: string;
  content: string;
  recommendations?: string[];
  coordinates?: string;
  version?: string;
  isEvaluated?: boolean;
}

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

export interface SwatchItem {
  name: string;
  hex: string;
  description: string;
}

// FR-01 & FR-02: Data Acquisition & Validation
export interface DataSourceItem {
  id: string;
  sourceName: string;
  type: 'Citra Satelit' | 'Stasiun Cuaca' | 'Kependudukan' | 'Geospasial RTH';
  provider: string; // e.g. GEE / USGS, BMKG, BPS, DLH
  period: string;
  recordCount: string;
  completenessPct: number;
  crossValidationStatus: 'Valid / Lolos' | 'Perlu Kalibrasi' | 'Gagal Validasi';
  bmkgCorrelationR?: number;
  lastSync: string;
}

// FR-08: AI Random Forest Prediction
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
export interface AIValidationRecord {
  id: string;
  modelName: string; // 'Random Forest LST Regressor v2.1' or 'DBSCAN Spatial Cluster v1.4'
  datasetPeriod: string;
  evaluatedBy: string;
  evaluationDate: string;
  scientificMetric: string; // e.g. 'R² = 0.89, RMSE = 0.62°C'
  status: 'Tervalidasi' | 'Perlu Perbaikan' | 'Menunggu Tinjauan';
  notes: string;
}

// FR-16: API Integration
export interface APIEndpointDef {
  method: 'GET' | 'POST';
  path: string;
  description: string;
  authRequired: boolean;
  sampleResponse: Record<string, unknown>;
}

// FR-17: Chatbot Message
export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  sources?: string[];
}

// FR-20, FR-21, FR-22: Post Mitigation Evaluation & Anomaly Detection
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

// FR-24: AI Model Retraining
export interface ModelVersionRecord {
  version: string;
  algorithm: 'Random Forest' | 'DBSCAN';
  trainingDataCutoff: string;
  sampleCount: number;
  accuracyMetric: string;
  status: 'Aktif di Produksi' | 'Arsip';
  releaseDate: string;
}

