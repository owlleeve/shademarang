# PRD — ShadeMarang

## 1. Ringkasan Produk

ShadeMarang adalah *Knowledge Management System* (KMS) untuk mengelola hasil kajian UHI Kota Semarang agar dapat digunakan oleh stakeholder internal—BAPPEDA, DLH, dan akademisi/peneliti—serta disebarkan secara terbatas melalui dashboard publik dan chatbot.

Produk bukan sekadar dashboard data. Nilai utamanya adalah menghubungkan **kondisi wilayah → pengetahuan/riwayat tindakan → hasil evaluasi**, sehingga pengguna dapat memahami alasan suatu tindakan disarankan.

## 2. Tujuan

1. Memusatkan informasi UHI yang sebelumnya tersebar pada peta, laporan, penelitian, dan catatan evaluasi.
2. Memudahkan pengguna menemukan pengetahuan berdasarkan pertanyaan atau wilayah, bukan istilah teknis.
3. Membantu BAPPEDA dan DLH menggunakan riwayat tindakan serta evaluasi sebagai pertimbangan mitigasi berikutnya.
4. Menyediakan versi informasi publik yang sederhana dan aman dipahami masyarakat.

## 3. Pengguna dan Hak Akses

| Peran | Hak utama |
|---|---|
| Publik/masyarakat (eksternal) | Melihat peta/ringkasan yang telah dipublikasikan dan menggunakan chatbot informasi UHI. Tidak melihat data internal, detail keputusan, atau evaluasi mentah. |
| BAPPEDA Kota Semarang (internal) | Menggunakan dashboard UHI, peta prioritas, tren, dan rekomendasi sebagai bahan perencanaan tata ruang/kebijakan. Tidak bertugas memasukkan hasil evaluasi operasional DLH. |
| DLH Kota Semarang (internal) | Menggunakan hasil kajian untuk pelaksanaan RTH/penghijauan, mencatat status tindakan, melakukan evaluasi pasca-mitigasi, dan mengirim evaluasi ke repositori. |
| Akademisi/peneliti (internal sesuai klasifikasi minggu 2) | Mengolah data BMKG/BPS dan citra, membuat kajian/analisis, melakukan validasi internal hasil AI, serta mengunggah pengetahuan untuk ditinjau. |
| Admin KMS | Mengelola pengguna, kategori, hak akses, status publikasi, metadata, dan audit perubahan. |

**Aturan akses:** data mentah, data berlisensi, dokumen internal, dan catatan keputusan internal hanya terlihat oleh pengguna yang berwenang. Konten publik harus melewati status “ditinjau” sebelum tayang.


## 5. Struktur Informasi dan Alur Inti

### 5.1 Alur publik

`Beranda publik → Peta/ringkasan yang dipublikasikan atau Pencarian → Detail wilayah publik → Pengetahuan umum/chatbot`

### 5.2 Alur internal

`Akademisi menghasilkan kajian → validasi internal → repositori → Dashboard menyalurkan hasil ke BAPPEDA/DLH → BAPPEDA memakai hasil untuk perencanaan → DLH melaksanakan mitigasi → DLH mengevaluasi → repositori diperbarui`

### 5.3 Objek data utama

| Objek | Field minimum |
|---|---|
| Wilayah | ID, nama, geometri, kecamatan/kelurahan, status publikasi |
| Observasi kondisi | wilayah, periode, LST, NDVI, NDBI, sumber, metode, kualitas data |
| Dokumen pengetahuan | judul, ringkasan, kategori, wilayah terkait, sumber/penulis, tanggal, status tinjau, akses |
| Tindakan mitigasi | judul, wilayah, jenis tindakan, tujuan, pelaksana, waktu, status, lampiran, catatan |
| Evaluasi | tindakan terkait, periode sebelum/sesudah, indikator yang dipantau, hasil, hambatan, pembelajaran, status tinjau |
| Rekomendasi | wilayah, kondisi pemicu, tindakan yang disarankan, alasan, pengetahuan/mitigasi rujukan, pembuat, status |
| Keputusan | wilayah, rekomendasi terkait, keputusan, alasan, pembuat, tanggal, akses |

## 6. Kebutuhan Fungsional per Modul

### 6.1 Beranda / Dashboard

**Tujuan:** menjadi titik masuk yang berbeda menurut stakeholder. Dashboard internal menyalurkan hasil kajian kepada BAPPEDA dan DLH; halaman publik hanya menampilkan informasi yang telah dipublikasikan.

**Pembagian fungsi dashboard UHI:**

| Pengguna | Informasi utama | Aksi yang boleh dilakukan |
|---|---|---|
| BAPPEDA | Wilayah prioritas, tren UHI, rekomendasi tata ruang/RTH, kajian tervalidasi, dan ringkasan evaluasi yang telah disetujui | Membandingkan wilayah dan memakai hasil sebagai bahan perencanaan/kebijakan; tidak mengubah status tindakan DLH atau mengisi evaluasi operasional |
| DLH | Wilayah yang perlu ditangani, daftar tindakan RTH/penghijauan, status pelaksanaan, serta evaluasi yang belum diisi/menunggu tinjau | Membuat dan memperbarui tindakan, mencatat pelaksanaan, mengisi evaluasi pasca-mitigasi, dan mengirimkannya untuk ditinjau |
| Akademisi/peneliti | Kajian, analisis, sumber data, dan status validasi | Membuat kajian/analisis, mengirim konten untuk tinjauan, dan memperbaiki konten sesuai catatan reviewer |
| Publik | Hanya peta, ringkasan, dan pengetahuan yang berstatus dipublikasikan | Membaca, mencari, dan menggunakan chatbot; tidak melihat data mentah, keputusan internal, atau evaluasi rinci |

| ID | Kebutuhan |
|---|---|
| DASH-01 | Sistem menampilkan sapaan singkat dan kolom pencarian dominan: “Apa yang ingin Anda ketahui?” |
| DASH-02 | Sistem menyediakan jalur eksplorasi: **Kondisi wilayah**, **Pilihan tindakan**, dan **Belajar dari kegiatan sebelumnya**. Isi tiap jalur difilter sesuai peran; publik hanya menerima konten yang telah dipublikasikan. |
| DASH-03 | Dashboard BAPPEDA menampilkan wilayah prioritas, tren UHI, rekomendasi tata ruang/RTH, dan kajian yang telah divalidasi. |
| DASH-04 | Dashboard DLH menampilkan wilayah yang membutuhkan mitigasi, daftar tindakan RTH/penghijauan, status pelaksanaan, evaluasi yang belum diisi, dan evaluasi yang menunggu peninjauan. |
| DASH-05 | Dashboard akademisi/peneliti menampilkan kajian/analisis yang dibuat, status validasi, dan konten yang menunggu tinjauan. |
| DASH-06 | Dashboard publik hanya menampilkan peta/ringkasan dan pengetahuan yang berstatus dipublikasikan. |
| DASH-07 | Sistem menampilkan maksimal tiga informasi terbaru/relevan sesuai peran, bukan mencampur tugas BAPPEDA dan DLH. |
| DASH-08 | Klik kartu informasi membuka detail konten, bukan sekadar menampilkan angka ringkas. |
| DASH-09 | Sistem tidak menampilkan tugas atau data internal kepada publik. |

**Kriteria penerimaan:** BAPPEDA dapat mencapai wilayah prioritas, kajian pendukung, dan ringkasan evaluasi yang telah disetujui dalam maksimal dua klik tanpa mengubah data operasional; DLH dapat mencapai tindakan yang belum dievaluasi dalam maksimal dua klik dan langsung mengisi evaluasinya; publik hanya mencapai konten berstatus dipublikasikan.

### 6.2 Peta Wilayah

**Tujuan:** menjawab “di wilayah mana kondisi perlu diperhatikan?” dan mengarahkan pengguna ke pengetahuan yang relevan.

| ID | Kebutuhan |
|---|---|
| MAP-01 | Sistem menampilkan peta Kota Semarang dengan batas wilayah yang dapat dipilih. |
| MAP-02 | Pengguna dapat memilih periode pengamatan dan jenis tampilan: kondisi panas, vegetasi, kawasan terbangun, atau gabungan prioritas. |
| MAP-03 | Setiap wilayah pada peta memiliki label/tooltip berbahasa sederhana, misalnya “perlu perhatian lebih”, “perlu dipantau”, atau “kondisi relatif baik”. |
| MAP-04 | Saat wilayah dipilih, sistem memusatkan peta pada wilayah tersebut dan membuka panel detail. |
| MAP-05 | Panel detail BAPPEDA menampilkan nama wilayah, ringkasan kondisi, perubahan dari periode pembanding, rekomendasi tata ruang/RTH, kajian tervalidasi, dan ringkasan evaluasi yang telah disetujui. |
| MAP-06 | Panel detail DLH menampilkan tindakan terkait, status pelaksanaan, alasan tindakan, evaluasi yang belum diisi, dan tautan untuk memperbarui evaluasi. Pengguna internal berwenang dapat membuka indikator teknis dan sumber data; publik hanya melihat ringkasan yang telah dipublikasikan. |
| MAP-07 | Sistem menyediakan pencarian nama kecamatan/kelurahan dan tombol kembali ke tampilan seluruh kota. |
| MAP-08 | Sistem tidak boleh menyimpulkan sebab-akibat dari satu indikator. Jika tersedia, gunakan frasa “berdasarkan data periode ini” dan tampilkan sumber/metode pada mode detail. |

**Kriteria penerimaan:** memilih satu wilayah memperbarui panel detail tanpa memuat ulang halaman dan menampilkan minimal satu tautan ke pengetahuan atau tindakan terkait.

### 6.3 Pengetahuan

**Tujuan:** menyediakan pusat jawaban yang dapat dicari dan dipahami lintas pengguna.

| ID | Kebutuhan |
|---|---|
| KNOW-01 | Sistem menyediakan pencarian berdasarkan kata kunci, wilayah, kategori, periode, dan tipe konten. |
| KNOW-02 | Sistem menampilkan hasil sebagai kartu dengan judul, ringkasan singkat, wilayah terkait, tanggal pembaruan, dan status “ditinjau” bila berlaku. |
| KNOW-03 | Kategori minimum: kondisi wilayah, pilihan mitigasi, studi/kajian, riwayat tindakan, hasil evaluasi, dan panduan. |
| KNOW-04 | Halaman detail pengetahuan menampilkan ringkasan, konteks wilayah, sumber, dokumen/lampiran, konten terkait, dan riwayat pembaruan. |
| KNOW-05 | Konten tindakan harus dapat ditautkan ke satu atau lebih evaluasi. Konten evaluasi harus dapat ditautkan kembali ke tindakan asalnya. |
| KNOW-06 | Pengguna dapat menyimpan konten sebagai favorit. Pengguna internal dapat menambahkan komentar internal pada konten yang memiliki akses. |
| KNOW-07 | Konten yang belum ditinjau diberi label “draf” dan tidak muncul di hasil pencarian publik. |

**Kriteria penerimaan:** pencarian “penghijauan” menampilkan pengetahuan yang relevan beserta konteks wilayah atau tindakan terkait, bukan hanya daftar dokumen mentah.

### 6.4 Mitigasi

**Tujuan:** mengelola tindakan yang telah dan akan dilakukan, dengan konteks kondisi wilayah.

| ID | Kebutuhan |
|---|---|
| MIT-01 | Sistem menampilkan katalog tindakan mitigasi dalam bentuk kartu/timeline, bukan tabel sebagai tampilan utama. |
| MIT-02 | Setiap tindakan memuat wilayah, jenis tindakan, tujuan, pelaksana, rentang waktu, status, dan dokumen pendukung. |
| MIT-03 | DLH dan pengguna berizin dapat membuat tindakan baru; form wajib meminta wilayah, jenis tindakan, tujuan, tanggal, dan pelaksana. BAPPEDA berperan sebagai pengguna hasil untuk perencanaan, bukan pelaksana tindakan. |
| MIT-04 | Form tindakan DLH menampilkan pengetahuan dan evaluasi terdahulu yang relevan sebagai referensi, tetapi pengguna tetap harus memilih keputusan secara sadar. |
| MIT-05 | Status tindakan: rencana, berjalan, selesai, dibatalkan. Perubahan status dicatat pada riwayat. |
| MIT-06 | Saat tindakan ditandai selesai, sistem mengarahkan pengguna untuk membuat evaluasi atau menjadwalkan evaluasi. |
| MIT-07 | Detail tindakan menampilkan “mengapa tindakan ini dipilih”, mengacu pada rekomendasi atau pengetahuan yang ditautkan. |

**Kriteria penerimaan:** tindakan selesai tanpa evaluasi memiliki penanda yang jelas dan muncul pada daftar tindak lanjut DLH.

### 6.5 Analisis

**Tujuan:** menyediakan ruang kerja analitis untuk pengguna internal tanpa membebani publik dengan jargon.

| ID | Kebutuhan |
|---|---|
| ANL-01 | Hanya pengguna internal berwenang yang dapat membuka modul ini. |
| ANL-02 | Sistem memungkinkan pemilihan wilayah, periode, dan indikator untuk dibandingkan. |
| ANL-03 | Sistem menampilkan peta analitis, grafik perubahan waktu, serta penjelasan data/methodology pada panel terpisah. |
| ANL-04 | Sistem mampu menyimpan hasil analisis sebagai draf pengetahuan atau rekomendasi. |
| ANL-05 | Setiap hasil analisis menyimpan metadata: sumber data, periode, metode, pembuat, waktu dibuat, serta catatan keterbatasan. |
| ANL-06 | Sistem membedakan “hasil data” dari “interpretasi/rekomendasi” secara visual dan data model. |
| ANL-07 | Bila model AI digunakan, sistem menampilkan versi model, tanggal pelatihan, cakupan data, dan peringatan bahwa hasil adalah dukungan keputusan, bukan keputusan otomatis. |

**Kriteria penerimaan:** hasil analisis dapat ditelusuri kembali ke sumber dan periode data yang dipakai.

### 6.6 Evaluasi

**Tujuan:** mengubah hasil pelaksanaan mitigasi menjadi pembelajaran yang dapat dipakai ulang.

| ID | Kebutuhan |
|---|---|
| EVA-01 | Evaluasi selalu terhubung dengan satu tindakan mitigasi. |
| EVA-02 | Form evaluasi memuat kondisi awal, kondisi setelah tindakan, indikator yang dipantau, hasil, hambatan, dan pembelajaran. |
| EVA-03 | Sistem mendukung lampiran foto, peta, laporan, dan dokumen pembuktian sesuai hak akses. |
| EVA-04 | Sistem menampilkan perbandingan sebelum/sesudah dengan periode yang jelas; tidak menyimpulkan keberhasilan apabila data pembanding tidak memadai. |
| EVA-05 | Evaluasi memiliki status internal: draf, menunggu tinjau, disetujui, dan perlu revisi. Status publikasi terpisah dan hanya dapat dilakukan oleh admin/reviewer. |
| EVA-06 | Evaluasi disetujui dapat dibuat menjadi konten pengetahuan internal secara otomatis, tetapi tetap dapat diedit sebelum diterbitkan. Ringkasan publik hanya dibuat jika admin memilih untuk mempublikasikannya. |
| EVA-07 | Sistem menampilkan tindakan yang belum dievaluasi dan evaluasi yang menunggu tinjau. |

**Kriteria penerimaan:** pembelajaran dari evaluasi dapat ditemukan melalui pencarian Pengetahuan dan muncul sebagai rujukan saat pengguna membuat tindakan serupa.

### 6.7 Kelola KMS

**Tujuan:** menjaga kualitas, keterlacakan, dan pembaruan pengetahuan.

| ID | Kebutuhan |
|---|---|
| KMS-01 | Sistem menyediakan unggah dokumen, input metadata, dan pemilihan akses internal. Status publik hanya dapat dipilih saat proses publikasi oleh admin/reviewer. |
| KMS-02 | Sistem menyediakan alur tinjau: draf → menunggu tinjau → disetujui/perlu revisi → dipublikasikan. |
| KMS-03 | Reviewer dapat memberi catatan revisi; akademisi/peneliti atau DLH sebagai pembuat menerima notifikasi dan dapat mengirim ulang. |
| KMS-04 | Sistem menyimpan riwayat versi dan audit perubahan untuk setiap dokumen, rekomendasi, tindakan, evaluasi, dan keputusan. |
| KMS-05 | Admin dapat mengelola kategori, tag, wilayah, dan pengguna tanpa menghapus riwayat yang sudah dipakai sebagai rujukan. |
| KMS-06 | Sistem mendeteksi konten yang belum diperbarui dalam periode yang ditentukan dan menandainya untuk ditinjau. |
| KMS-07 | Penghapusan bersifat *soft delete* untuk admin dan wajib meninggalkan jejak audit. |

**Kriteria penerimaan:** admin dapat menjawab siapa mengubah konten apa, kapan, dan versi mana yang berlaku saat ini.

## 7. Kebutuhan Lintas Modul

| ID | Kebutuhan |
|---|---|
| X-01 | Setiap tautan antarobjek harus dua arah: dari tindakan ke evaluasi, dan dari evaluasi ke tindakan; dari rekomendasi ke pengetahuan, dan sebaliknya. |
| X-02 | Sistem menampilkan status/keterbatasan data pada seluruh tampilan analisis dan rekomendasi. |
| X-03 | Sistem mendukung responsif desktop, tablet, dan seluler. Peta harus tetap dapat digunakan pada layar 360 px. |
| X-04 | Sistem memenuhi aksesibilitas dasar: kontras cukup, navigasi keyboard, fokus terlihat, teks alternatif, dan informasi tidak hanya dibedakan oleh warna. |
| X-05 | Pencarian menampilkan hasil dalam kurang dari 2 detik untuk data normal prototipe. |
| X-06 | Sistem mencatat log aksi penting: unggah, publikasi, perubahan status tindakan, persetujuan evaluasi, dan perubahan hak akses. |

## 8. Batasan dan Larangan Implementasi

1. Jangan menampilkan jargon KMS pada beranda publik.
2. Jangan membuat peta hanya sebagai dekorasi; setiap wilayah yang dapat dipilih harus membuka informasi konkret.
3. Jangan menampilkan rekomendasi tanpa alasan, konteks wilayah, dan tautan ke pengetahuan/riwayat terkait.
4. Jangan menjadikan model AI sebagai pengambil keputusan otomatis.
5. Jangan menggunakan warna hijau, biru, atau oranye sebagai palet utama.
6. Jangan menggunakan dashboard penuh kartu KPI tanpa hubungan langsung dengan aktivitas pengguna.
7. Jangan menampilkan data BMKG/BPS atau dokumen berlisensi kepada publik jika izin aksesnya belum ditetapkan.

## 9. Prioritas Rilis

### MVP

- Autentikasi dan peran pengguna.
- Beranda, peta wilayah interaktif, pencarian pengetahuan, detail pengetahuan.
- Katalog/detil mitigasi dan evaluasi.
- Unggah konten, alur tinjau dasar, metadata, dan riwayat versi.
- Tautan wilayah ↔ pengetahuan ↔ tindakan ↔ evaluasi.

### Rilis lanjutan

- Integrasi API SIPD/DLH.
- Model prediksi dan *clustering* AI beserta halaman metadata model.
- Notifikasi otomatis evaluasi jatuh tempo dan konten usang.
- Chatbot untuk pertanyaan publik yang hanya menjawab dari konten terverifikasi.
- Ekspor laporan PDF dan *share link* berizin.

## 10. Skenario Uji Utama

1. **BAPPEDA memilih wilayah pada peta** → melihat kondisi, kajian tervalidasi, dan ringkasan hasil evaluasi yang telah disetujui → memakai informasi tersebut sebagai bahan catatan keputusan/perencanaan.
2. **DLH menyelesaikan tindakan penghijauan** → membuat evaluasi → evaluasi ditinjau → pembelajaran muncul pada Pengetahuan dan rekomendasi wilayah serupa.
3. **Peneliti mengunggah kajian** → menambahkan metadata wilayah/periode → reviewer meminta revisi → kajian disetujui dan hanya kemudian dapat ditampilkan ke publik.
4. **Masyarakat mencari “wilayah panas”** → menerima ringkasan yang sederhana dan konten publik tanpa melihat data/keputusan internal.
5. **Admin meninjau perubahan konten** → melihat versi, pembuat, waktu perubahan, serta memulihkan versi sebelumnya tanpa menghilangkan jejak audit.
