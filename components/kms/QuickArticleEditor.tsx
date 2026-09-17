"use client";

import { useState } from "react";

export function QuickArticleEditor() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setMessage("");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/articles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Artikel gagal disimpan");
      form.reset(); setMessage("Artikel demo tersimpan untuk proses server saat ini.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Terjadi kesalahan"); }
    finally { setBusy(false); }
  }

  return <form onSubmit={submit} className="grid gap-4 rounded-3xl border border-[#ECE4E8] bg-white p-6">
    <h2 className="font-display text-2xl">Tambah artikel KMS</h2>
    <label>Judul<input name="title" required maxLength={160} className="field mt-1" /></label>
    <label>Ringkasan<input name="description" required className="field mt-1" /></label>
    <label>Kategori<select name="category" className="field mt-1"><option>Hotspot</option><option>Mitigasi</option><option>RTH</option><option>Panduan</option></select></label>
    <label>Isi<textarea name="content" required rows={6} className="field mt-1" /></label>
    <button disabled={busy} className="btn primary w-fit" type="submit">{busy ? "Menyimpan…" : "Simpan artikel demo"}</button>
    {message && <p role="status" className="text-sm text-[#6E3E53]">{message}</p>}
  </form>;
}
