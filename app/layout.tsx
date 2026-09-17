import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./portal.css";
import "leaflet/dist/leaflet.css";
import "./design-system.css";
import "./home-assistant.css";
import "./map-indicators.css";
import "./private-knowledge.css";
import "./private-knowledge-modal.css";
import "./public-knowledge.css";
import "./spacing-tune.css";
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
export function generateMetadata(): Metadata { return { title: { default: "ShadeMarang", template: "%s" }, description: "Pengetahuan dan tindakan untuk kondisi panas Kota Semarang", applicationName: "ShadeMarang KMS", openGraph: { title: "ShadeMarang", description: "Jelajahi kondisi panas dan pengetahuan mitigasi Kota Semarang", locale: "id_ID", type: "website" } }; }
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="id" className={`${fraunces.variable} ${jakarta.variable}`}><body>{children}</body></html>; }
