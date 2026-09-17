import Link from "next/link";

const links = [
  ["/", "Beranda"], ["/dashboard", "Dashboard UHI"],
  ["/knowledge", "Pengetahuan"], ["/mitigation", "Mitigasi"],
  ["/analysis", "Analisis"],
] as const;

export function Navbar() {
  return <header className="border-b border-[#ECE4E8] bg-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4"><Link href="/" className="font-display text-2xl font-semibold text-[#6E3E53]">ShadeMarang</Link><nav aria-label="Navigasi utama" className="flex flex-wrap gap-2 text-sm">{links.map(([href, label]) => <Link key={href} href={href} className="rounded-full px-3 py-2 text-[#595155] hover:bg-[#EEDDE4] hover:text-[#5A2C40]">{label}</Link>)}</nav></div></header>;
}
