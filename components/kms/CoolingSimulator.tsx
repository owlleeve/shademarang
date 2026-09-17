"use client";

import { useState } from "react";
import type { SimulationResult } from "@/lib/types";

export function CoolingSimulator({ districtId }: { districtId: string }) {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/simulate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ districtId, ndviIncrease: Number(form.get("ndviIncrease")), canopyPct: Number(form.get("canopyPct")), coolRoofPct: Number(form.get("coolRoofPct")) }) });
    const data = await response.json();
    if (!response.ok) { setError(data.error ?? "Simulasi gagal"); return; }
    setResult(data);
  }
  return <section className="rounded-3xl border border-[#ECE4E8] bg-white p-6"><h2 className="font-display text-2xl">Simulasi penurunan suhu</h2><p className="text-sm text-[#595155]">Coba skenario penghijauan dan atap sejuk pada data contoh.</p><form onSubmit={submit} className="grid gap-3 sm:grid-cols-3"><label>Tambahan NDVI<input className="field mt-1" name="ndviIncrease" type="number" min="0" max="1" step="0.01" defaultValue="0.1" required /></label><label>Kanopi baru (%)<input className="field mt-1" name="canopyPct" type="number" min="0" max="100" defaultValue="25" required /></label><label>Atap sejuk (%)<input className="field mt-1" name="coolRoofPct" type="number" min="0" max="100" defaultValue="20" required /></label><button type="submit" className="btn primary w-fit">Hitung perkiraan</button></form>{error && <p role="alert" className="mt-4 text-red-700">{error}</p>}{result && <div role="status" className="mt-5 rounded-2xl bg-[#F7F2F4] p-5"><p className="font-display text-2xl">{result.baselineLst.toFixed(1)}°C → {result.predictedLst.toFixed(1)}°C</p><p>Perkiraan penurunan {result.reduction.toFixed(1)}°C</p><p className="text-xs text-[#595155]">{result.note}</p></div>}</section>;
}
