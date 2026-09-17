import type { SimulationInput, SimulationResult } from "./types";
import { getDistrict } from "./mockData";
import { predictReduction } from "./randomForest";

export function simulateCooling(input: SimulationInput): SimulationResult | null {
  const district = getDistrict(input.districtId);
  if (!district) return null;

  const { ndviIncrease, canopyPct, coolRoofPct } = input;
  const reduction = Number(predictReduction([ndviIncrease, canopyPct, coolRoofPct, district.imperviousSurfacePct ?? 50]).toFixed(1));
  return {
    districtId: district.id,
    baselineLst: district.lst,
    predictedLst: Number((district.lst - reduction).toFixed(1)),
    reduction,
    model: "Random Forest demo (9 pohon, data sintetis)",
    note: "Perkiraan ilustratif dari model yang dilatih dengan data sintetis, bukan data pengukuran lapangan atau dasar keputusan resmi.",
  };
}
