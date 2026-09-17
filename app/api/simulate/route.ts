import { getDistrict } from "@/lib/mockData";
import { simulateCooling } from "@/lib/utils";
import type { SimulationInput } from "@/lib/types";

export async function POST(request: Request) {
  let body: Partial<SimulationInput>;
  try { body = await request.json(); } catch { return Response.json({ error: "JSON tidak valid" }, { status: 400 }); }
  const districtId = body.districtId;
  if (typeof districtId !== "string" || !getDistrict(districtId)) return Response.json({ error: "Wilayah tidak valid" }, { status: 400 });
  for (const [field, maximum] of [["ndviIncrease", 1], ["canopyPct", 100], ["coolRoofPct", 100]] as const) {
    const value = body[field];
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > maximum) {
      return Response.json({ error: `${field} harus bernilai 0–${maximum}` }, { status: 400 });
    }
  }
  return Response.json(simulateCooling(body as SimulationInput));
}
