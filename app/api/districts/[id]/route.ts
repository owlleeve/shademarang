import { getDistrict } from "@/lib/mockData";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const district = getDistrict(id);
  if (!district) return Response.json({ error: "Wilayah tidak ditemukan" }, { status: 404 });
  return Response.json({ district, source: "dataset contoh ShadeMarang" });
}
