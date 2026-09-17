# ShadeMarang KMS

Aplikasi Next.js App Router untuk eksplorasi kondisi panas dan pengetahuan mitigasi Kota Semarang.

## Menjalankan

```bash
npm install
npm run dev
```

Build produksi: `npm run build`, lalu `npm run start`.

## Rute utama

- `/` beranda; `/dashboard` dashboard UHI; `/mitigation` mitigasi.
- Peta wilayah berada di `/dashboard`; `/wilayah` mengarah kembali ke dashboard. `/wilayah/[id]` tetap tersedia sebagai detail wilayah langsung.
- `/siklus-kms` tujuh tahap KMS; `/kelola` antarmuka admin demo.
- `/knowledge` repositori pengetahuan; `/chat` Tanya AI; `/evaluation` evaluasi untuk publik dan stakeholder.

## API

- `GET /api/districts` — 16 kecamatan dan dua stasiun BMKG contoh.
- `GET /api/districts/[id]` — detail kecamatan.
- `GET /api/articles` dan `POST /api/articles` — daftar dan tambah artikel demo. POST menerima `title`, `description`, `content`, `category` (`Hotspot`, `Mitigasi`, `RTH`, `Panduan`), serta `author` opsional.
- `POST /api/simulate` — input JSON `{ "districtId": "w-1", "ndviIncrease": 0.1, "canopyPct": 25, "coolRoofPct": 20 }`.

Data wilayah, artikel awal, dan stasiun adalah contoh. Artikel baru tersimpan di memori proses server dan hilang saat server dimulai ulang. Simulasi menggunakan Random Forest sembilan pohon yang dilatih pada label sintetis; hasilnya ilustratif dan belum divalidasi dengan pengukuran lapangan. Login admin dari antarmuka sumber adalah login demo di sisi klien, bukan pengamanan API produksi.
