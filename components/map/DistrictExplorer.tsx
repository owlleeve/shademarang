"use client";

import { useState } from "react";
import Link from "next/link";
import { ThematicMapViewer } from "./ThematicMapViewer";
import { MapLegend } from "./MapLegend";
import type { DistrictData } from "@/lib/types";

export function DistrictExplorer({ districts }: { districts: DistrictData[] }) {
  const [selected, setSelected] = useState(districts[0]?.id ?? "");
  const district = districts.find((item) => item.id === selected);
  return <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]"><div><ThematicMapViewer districts={districts} selectedDistrictId={selected} onSelectDistrict={setSelected} /><MapLegend /></div><aside className="rounded-3xl border border-[#ECE4E8] bg-white p-6"><span className="eyebrow">Wilayah terpilih</span><h2 className="font-display text-3xl">{district?.wilayah}</h2><p className="text-[#595155]">Suhu permukaan {district?.lst.toFixed(1)}°C · NDVI {district?.ndvi.toFixed(2)} · HVI {district?.hviScore ?? "—"}</p><p className="text-sm text-[#595155]">{district?.kategori}. Pilih kecamatan pada peta untuk memperbarui ringkasan.</p>{district && <Link className="btn primary mt-4" href={`/wilayah/${district.id}`}>Lihat detail wilayah →</Link>}</aside></div>;
}
