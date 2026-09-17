import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return <><Navbar /><main className="mx-auto max-w-4xl px-6 py-24 text-center"><span className="eyebrow">404 · Halaman tidak ditemukan</span><h1 className="font-display text-5xl text-[#272023]">Jalur yang Anda cari belum tersedia.</h1><p className="mx-auto max-w-xl text-[#595155]">Kembali ke beranda atau jelajahi data wilayah Semarang.</p><div className="mt-8 flex justify-center gap-3"><Link className="btn primary" href="/">Ke beranda</Link><Link className="btn" href="/wilayah">Lihat wilayah</Link></div></main><Footer /></>;
}
