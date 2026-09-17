"use client";

import { useState } from "react";
import { INITIAL_WILAYAH, MOCK_DBSCAN_CLUSTERS } from "./kms/source/data/mockData";
import type { SimulationResult } from "@/lib/types";

type Knowledge = { id: string; title: string; summary: string; area: string; category: string };
type Action = { id: string; title: string; area: string; status: string };

const coolSpaces = [
  { name: "Hutan Wisata Tinjomoyo", area: "Banyumanik / Candisari", feature: "Kanopi pohon dan jalur teduh" },
  { name: "Taman Indonesia Kaya", area: "Semarang Selatan", feature: "Taman publik di pusat kota" },
  { name: "Taman Srigunting", area: "Semarang Utara", feature: "Peneduhan kawasan Kota Lama" },
  { name: "Waduk Jatibarang dan Goa Kreo", area: "Gunungpati", feature: "Ruang hijau dan badan air" },
];

export default function DashboardBelowMap({ selected, onSelect, knowledge, actions, internal, onKnowledge, onAction, onEvaluation, onAI, onAnalysis }: { selected: string; onSelect: (name: string) => void; knowledge: Knowledge[]; actions: Action[]; internal: boolean; onKnowledge: (id: string) => void; onAction: (id: string) => void; onEvaluation: () => void; onAI: () => void; onAnalysis: () => void }) {
  const district = INITIAL_WILAYAH.find((item) => item.wilayah === selected) ?? INITIAL_WILAYAH[0];
  const related = knowledge.filter((item) => item.area === selected || item.area === "Semua wilayah").slice(0, 3);
  const [canopy, setCanopy] = useState(25);
  const [roof, setRoof] = useState(20);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState("");

  async function simulate() {
    setError("");
    try {
      const response = await fetch("/api/simulate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ districtId: district.id, ndviIncrease: canopy / 250, canopyPct: canopy, coolRoofPct: roof }) });
      if (!response.ok) throw new Error("Simulasi belum dapat dimuat.");
      setResult(await response.json());
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Simulasi gagal."); }
  }

  return <div className="dashboard-followup">
    <section className="dashboard-followup-grid" aria-label="Tren dan prioritas dari data contoh"><article className="card"><span className="eyebrow">Tren kondisi UHI · dari sumber KMS</span><h2>Evolusi suhu permukaan</h2><p className="muted small">Perbandingan ilustratif dari dashboard sumber. Angka antarperiode perlu metode dan musim yang setara.</p><div className="trend-rows">{[{ year: "2018", temperature: 32.2, width: 65 }, { year: "2021", temperature: 33.0, width: 74 }, { year: "2024", temperature: 33.8, width: 83 }, { year: "2027 · proyeksi", temperature: 34.5, width: 92 }].map((item) => <div key={item.year}><div className="spread small"><strong>{item.year}</strong><span>{item.temperature.toFixed(1)}°C</span></div><div className="trend-track"><span style={{ width: `${item.width}%` }} /></div></div>)}</div></article><article className="card"><span className="eyebrow">Klaster dan prioritas</span><h2>Kondisi yang serupa</h2><p className="muted small">Ringkasan klaster contoh dari `src`; pilih kelompok untuk melihat titiknya di peta.</p><div className="cluster-list">{MOCK_DBSCAN_CLUSTERS.map((cluster) => <button key={cluster.clusterId} onClick={() => onSelect(cluster.districts[0])} className={cluster.districts.includes(selected) ? "selected" : ""}><strong>{cluster.name.split(" (")[0]}</strong><span>{cluster.districts.join(", ")}</span><small>{cluster.priorityLevel}</small></button>)}</div></article></section>

    <section className="dashboard-followup-grid" aria-label="Simulasi dan pengetahuan"><article className="card"><span className="eyebrow">Kalkulator warga · {selected}</span><h2>Coba skenario peneduhan</h2><p className="muted small">Seperti kalkulator di dashboard sumber, ubah kanopi dan atap sejuk untuk melihat perkiraan ilustratif.</p><label className="sim-control">Tambahan kanopi <strong>{canopy}%</strong><input type="range" min="0" max="60" step="5" value={canopy} onChange={(event) => { setCanopy(Number(event.target.value)); setResult(null); }} /></label><label className="sim-control">Adopsi atap sejuk <strong>{roof}%</strong><input type="range" min="0" max="60" step="5" value={roof} onChange={(event) => { setRoof(Number(event.target.value)); setResult(null); }} /></label><button className="btn primary" onClick={simulate}>Hitung perkiraan</button>{result && <div className="notice" role="status" style={{ marginTop: 16 }}><strong>{result.baselineLst.toFixed(1)}°C → {result.predictedLst.toFixed(1)}°C</strong><p className="small">Penurunan ilustratif {result.reduction.toFixed(1)}°C. {result.note}</p></div>}{error && <p role="alert" className="small">{error}</p>}</article><article className="card"><span className="eyebrow">Pengetahuan terhubung</span><h2>Bacaan untuk {selected}</h2><div className="dashboard-related">{related.map((item) => <button key={item.id} onClick={() => onKnowledge(item.id)}><small>{item.category}</small><strong>{item.title}</strong><span>{item.summary}</span></button>)}{related.length === 0 && <p className="muted small">Belum ada dokumen khusus wilayah ini.</p>}</div>{!internal&&<button className="btn" onClick={onAI}>Tanya AI UHI →</button>}</article></section>

    {internal && <section className="dashboard-followup-grid" aria-label="Ruang kerja stakeholder"><article className="card"><span className="eyebrow">Untuk stakeholder</span><h2>Tinjau wilayah prioritas</h2><p className="muted">Buka analisis lebih rinci sebelum menetapkan tindakan atau mengevaluasi intervensi.</p><button className="btn primary" onClick={onAnalysis}>Buka analisis data →</button></article><article className="card"><span className="eyebrow">Tindakan dan evaluasi</span><h2>Hubungkan data dengan pelaksanaan</h2>{actions.filter((item) => item.area === selected).map((item) => <button key={item.id} className="text-link" onClick={() => onAction(item.id)}>{item.title} · {item.status} →</button>)}<p className="muted small">Catat hasil sebelum menyimpulkan dampak mitigasi.</p><button className="btn" onClick={onEvaluation}>Buka evaluasi →</button></article></section>}

    <section className="section"><span className="eyebrow">Ruang sejuk dan titik teduh · dari sumber KMS</span><h2>Tempat berteduh untuk warga</h2><div className="grid two">{coolSpaces.map((place) => <article className="card" key={place.name}><h3>{place.name}</h3><p className="muted small">{place.area} · {place.feature}</p></article>)}</div></section>
  </div>;
}
