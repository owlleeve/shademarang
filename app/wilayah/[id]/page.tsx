import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { districts, getDistrict, initialArticles } from "@/lib/mockData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MetricCard } from "@/components/ui/MetricCard";
import { CoolingSimulator } from "@/components/kms/CoolingSimulator";

type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() { return districts.map((district) => ({ id: district.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const district = getDistrict((await params).id);
  return { title: district ? `${district.wilayah} | ShadeMarang` : "Wilayah tidak ditemukan | ShadeMarang", description: district ? `Data contoh panas, vegetasi, dan kerentanan ${district.wilayah}.` : undefined };
}

export default async function Page({ params }: Props) {
  const district = getDistrict((await params).id);
  if (!district) notFound();
  const related = initialArticles.filter((article) => `${article.title} ${article.description} ${article.content}`.toLowerCase().includes(district.wilayah.toLowerCase())).slice(0, 3);
  return <><Navbar /><main className="mx-auto max-w-6xl px-6 py-12"><Link href="/wilayah" className="text-sm font-semibold text-[#6E3E53]">← Semua wilayah</Link><span className="eyebrow mt-8 block">Detail wilayah · {district.zoneType}</span><h1 className="font-display text-5xl">{district.wilayah}</h1><p className="mb-8 text-[#595155]">{district.kategori} · Data spasial contoh, bukan pengukuran langsung.</p><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><MetricCard label="Suhu permukaan (LST)" value={`${district.lst.toFixed(1)}°C`} /><MetricCard label="Vegetasi (NDVI)" value={district.ndvi.toFixed(2)} /><MetricCard label="Kerentanan panas (HVI)" value={String(district.hviScore ?? "—")} /><MetricCard label="Tutupan vegetasi" value={`${district.vegetationCoverPct.toFixed(1)}%`} /></div><section className="my-10 rounded-3xl border border-[#ECE4E8] bg-white p-6"><h2 className="font-display text-2xl">Konteks wilayah</h2><p className="text-[#595155]">Kawasan terbangun {district.imperviousSurfacePct ?? "—"}% · elevasi {district.elevationMeters ?? "—"} m · prioritas RTH {district.priorityRTH}/5. Nilai ini membantu membaca konteks, tetapi perlu diverifikasi sebelum keputusan lapangan.</p><h3 className="font-display text-xl">Rujukan mitigasi dan SOP</h3>{related.length ? <ul className="list-disc pl-5 text-[#595155]">{related.map((article) => <li key={article.id}>{article.title} — {article.description}</li>)}</ul> : <p className="text-[#595155]">Belum ada SOP khusus wilayah ini pada dataset contoh. Baca <Link className="text-[#6E3E53] underline" href="/mitigation">pilihan mitigasi umum</Link>.</p>}</section><CoolingSimulator districtId={district.id} /></main><Footer /></>;
}
