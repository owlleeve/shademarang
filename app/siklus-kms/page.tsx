import type { Metadata } from "next";
import KmsApp from "@/app/kms/KmsApp";
import "@/app/kms/source/source.css";

export const metadata: Metadata = { title: "Siklus KMS | ShadeMarang", description: "Tujuh tahap Capture, Create, AI, Store, Share, Apply, dan Evaluate dalam pengelolaan pengetahuan panas perkotaan." };
export default function Page() { return <KmsApp initialPage="modules" />; }
