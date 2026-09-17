# ShadeMarang KMS

ShadeMarang adalah prototipe Next.js App Router untuk membaca kondisi panas perkotaan Kota Semarang, menelusuri pengetahuan dan riwayat mitigasi, serta menghubungkan perencanaan, pelaksanaan, dan evaluasi. [PRD](PRD_ShadeMarang_KMS.md) memuat kebutuhan target dan status implementasi saat ini.

## Menjalankan

```bash
npm install
npm run dev
```

Untuk build produksi:

```bash
npm run build
npm run start
```

Pemeriksaan kode menggunakan `npm run lint`.

## Rute portal utama

| Rute | Fungsi | Akses |
|---|---|---|
| `/` | Beranda publik, pencarian, jalur kondisi, mitigasi, pembelajaran, dan Tanya AI | Publik |
| `/dashboard` | Dashboard UHI dan peta OpenStreetMap; panel kerja berbeda untuk BAPPEDA, DLH, peneliti, dan publik | Publik dan internal pada portal demo |
| `/knowledge` | Pustaka dokumen publik berstatus `dipublikasikan` atau pustaka internal sesuai peran; BAPPEDA dapat mencatat arah perencanaan dari kajian yang disetujui | Sesuai peran pada portal demo |
| `/chat` | “Tanya AI” berbasis pencocokan kata kunci pada dokumen publik | Publik |
| `/mitigation` | Riwayat tindakan; arahan perencanaan BAPPEDA; pekerjaan RTH dan formulir tindakan DLH/admin | Publik dan internal pada portal demo |
| `/evaluation` | Evaluasi tindakan, penanda selisih LST/proyeksi, dan alur tinjau | Internal pada portal demo; publik diarahkan ke pengetahuan |
| `/analysis` | Data capture contoh, prediksi/klaster referensi, catatan validasi peneliti, serta akses ke kajian/perencanaan | Internal pada portal demo |

Menu **Dokumen DLH**, **Kajian Peneliti**, dan **Kelola KMS** berada di dalam portal dan memakai state navigasi portal; ketiganya bukan rute URL terpisah. Pemilihan wilayah dilakukan di `/dashboard`. Rute legacy `/kelola`, `/kms/*`, `/siklus-kms`, dan `/wilayah` telah dihapus sehingga URL lama menampilkan halaman 404.

## Peran dan batas akses

- Publik hanya melihat peta, ringkasan, pengetahuan berstatus `dipublikasikan`, dan Tanya AI. Evaluasi internal tidak ditampilkan secara langsung.
- BAPPEDA memakai wilayah prioritas, prediksi/klaster contoh, kajian yang disetujui, dan ringkasan evaluasi untuk **mencatat arah perencanaan**. BAPPEDA tidak menambah dokumen, mengubah tindakan DLH, atau mengisi evaluasi operasional.
- DLH mengelola tindakan RTH/penghijauan, mengisi evaluasi, dan mengirim hasil pembelajaran melalui **Dokumen DLH**. DLH tidak mengelola seluruh repositori atau menyetujui publikasi.
- Peneliti dapat membuat draf kajian dan mencatat **penilaian validasi internal hasil AI** di Analisis dengan URL bukti, periode, metode/versi, metrik, dan temuan. Catatan berstatus `menunggu tinjau`; peneliti tidak menerbitkan atau mengesahkan model sendiri.
- Admin/reviewer meninjau dokumen dan evaluasi, meminta revisi, menyetujui, menerbitkan dokumen, serta melihat log perubahan prototipe. Pengelolaan akun/hak akses server dan pemulihan versi belum tersedia.

Login portal memakai kata sandi demo sesuai peran. Peran disimpan di `sessionStorage`; dokumen, tindakan, evaluasi, dan catatan perencanaan disimpan di `localStorage` browser. Pengguna yang berbeda pada browser/perangkat berbeda tidak berbagi data portal secara nyata.

## Alur yang tersedia

1. **Peneliti:** buka Analisis → periksa data capture dan keluaran AI contoh → catat penilaian internal dengan bukti → reviewer meninjau dokumen di Kelola KMS. Persetujuan dokumen tidak berarti model AI sudah tervalidasi secara teknis.
2. **BAPPEDA:** buka Dashboard UHI/Analisis → bandingkan wilayah dan kajian yang disetujui → pilih kajian di Pengetahuan → simpan catatan arah perencanaan. Mitigasi menampilkan prioritas dan riwayat tindakan sebagai rujukan.
3. **DLH:** buka Mitigasi → catat/perbarui tindakan RTH → isi evaluasi → kirim untuk tinjau → kirim dokumen pembelajaran melalui Dokumen DLH bila diperlukan.
4. **Reviewer/admin:** tinjau dokumen/evaluasi → minta revisi atau setujui → publikasikan dokumen yang sudah disetujui. Dokumen publik hanya terlihat setelah status `dipublikasikan`.

Pada evaluasi, pasangan **LST terukur** dan **proyeksi pembanding** boleh diisi bersama URL sumber. Selisih absolut di atas **1,0°C** diberi tanda *perlu verifikasi*. Penanda ini tidak membuktikan penyebab anomali dan tidak melatih ulang model.

## API demonstrasi

- `POST /api/simulate` menerima JSON seperti berikut:

```json
{
  "districtId": "w-1",
  "ndviIncrease": 0.1,
  "canopyPct": 25,
  "coolRoofPct": 20
}
```

## Batasan demonstrasi

LST, vegetasi, klaster, prediksi 2027/2030, tindakan awal, dan contoh anomali adalah data demonstrasi. Prediksi/klaster pada portal diambil dari data referensi di `lib/referenceData.ts`; pilihan skenario RTH memakai pengurangan angka ilustratif dan **tidak menjalankan inferensi model baru**. `POST /api/simulate` adalah API demo terpisah dengan label pelatihan sintetis. Tidak ada model AI operasional, validasi lapangan otomatis, atau pelatihan ulang model dalam portal saat ini.

Peta utama memakai OpenStreetMap sebagai peta dasar dan titik perwakilan kecamatan, bukan batas administratif presisi. Endpoint demo `/api/current-conditions` mengambil suhu udara model 2 m dari Open-Meteo; mode ini belum menjadi pilihan pada dashboard utama dan bukan LST atau hotspot UHI waktu nyata. “Tanya AI” portal adalah pencarian kata kunci, bukan LLM.

Dokumen portal dapat menyimpan URL sumber, tetapi belum mengunggah file fisik. Indeks SOP diekspor sebagai TSV dan dokumen ringkas sebagai TXT, bukan PDF.
