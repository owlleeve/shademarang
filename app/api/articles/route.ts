import { addArticle, listArticles } from "@/lib/articleStore";
import type { KmsArticle } from "@/lib/types";

export function GET() {
  return Response.json({ articles: listArticles(), count: listArticles().length, storage: "memory-demo" });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ error: "JSON tidak valid" }, { status: 400 }); }
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  if (!title || title.length > 160 || !content || !description) {
    return Response.json({ error: "Judul, ringkasan, dan isi artikel wajib diisi (judul maksimal 160 karakter)." }, { status: 400 });
  }
  const categories: KmsArticle["category"][] = ["Hotspot", "Mitigasi", "RTH", "Panduan"];
  const category = categories.find((item) => item === body.category);
  if (!category) return Response.json({ error: "Kategori tidak valid" }, { status: 400 });
  const article: KmsArticle = {
    id: crypto.randomUUID(), title, description, content, category,
    tag: category, status: "Menunggu", date: new Date().toISOString().slice(0, 10),
    author: typeof body.author === "string" ? body.author.trim().slice(0, 100) : "Kontributor KMS",
    readTime: `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} mnt baca`,
  };
  return Response.json({ article: addArticle(article), storage: "memory-demo" }, { status: 201 });
}
