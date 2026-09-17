export const INITIAL_CHAT_MESSAGES = [
  {
    id: "msg-1",
    sender: "bot",
    text: "Halo! Saya asisten pintar ShadeMarang KMS. Anda dapat menanyakan seputar kondisi Urban Heat Island (UHI) di Kota Semarang, suhu wilayah, rekomendasi mitigasi, atau data hasil analisis AI.",
    timestamp: "Baru saja",
  },
  {
    id: "msg-2",
    sender: "user",
    text: "Berapa suhu tertinggi UHI di Semarang dan di mana lokasinya?",
    timestamp: "1 menit lalu",
  },
  {
    id: "msg-3",
    sender: "bot",
    text: "Berdasarkan data komposit Landsat 8/9 & Sentinel per Juni 2026, suhu permukaan (LST) tertinggi tercatat di Kecamatan **Semarang Tengah** sebesar **38.4°C** (NDVI 0.11), disusul **Semarang Utara** sebesar **37.9°C** dan **Genuk** sebesar **37.2°C**.",
    timestamp: "1 menit lalu",
    sources: ["Dataset LST sentinel 2026", "Profil Wilayah Semarang Tengah"],
  },
];
