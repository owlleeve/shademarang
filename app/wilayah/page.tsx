import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Wilayah Semarang | ShadeMarang", description: "Jelajahi data contoh suhu permukaan, vegetasi, dan kerentanan panas 16 kecamatan Semarang." };

export default function Page() { redirect("/dashboard"); }
