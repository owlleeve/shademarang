import Link from "next/link";

export function LifecycleStageCard({ title, description, href = "/siklus-kms" }: { title: string; description: string; href?: string }) {
  return <Link href={href} className="block rounded-3xl border border-[#ECE4E8] bg-white p-6 hover:border-[#6E3E53]"><h3 className="font-display text-xl text-[#272023]">{title}</h3><p className="mt-2 text-sm text-[#595155]">{description}</p></Link>;
}
