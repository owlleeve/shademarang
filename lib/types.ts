export type { WilayahData as DistrictData, KnowledgeArticle as KmsArticle } from "@/app/kms/source/types";

export type SimulationInput = { districtId: string; ndviIncrease: number; canopyPct: number; coolRoofPct: number };
export type SimulationResult = { districtId: string; baselineLst: number; predictedLst: number; reduction: number; model: string; note: string };
