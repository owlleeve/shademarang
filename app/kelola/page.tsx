import type { Metadata } from "next";
import KmsApp from "@/app/kms/KmsApp";
import "@/app/kms/source/source.css";

export const metadata: Metadata = { title: "Kelola KMS | ShadeMarang", description: "Ruang demo pengelolaan basis pengetahuan dan data wilayah ShadeMarang." };
export default function Page() { return <KmsApp initialPage="admin" />; }
