import { bmkgStations, districts } from "@/lib/mockData";

export function GET() {
  return Response.json({ districts, stations: bmkgStations, count: districts.length, source: "dataset contoh ShadeMarang" });
}
