import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../types';
import { INITIAL_CHAT_MESSAGES, INITIAL_ARTICLES, INITIAL_WILAYAH } from '../data/mockData';
import { MessageSquare, Send, Sparkles, BookOpen, MapPin, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { navigateTo } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    'Berapa suhu tertinggi LST di Semarang dan lokasinya?',
    'Apa rekomendasi mitigasi untuk kawasan pesisir Semarang Utara?',
    'Bagaimana hasil evaluasi uji coba atap hijau di Balai Kota?',
    'Jelaskan korelasi antara NDVI (vegetasi) dengan suhu permukaan!'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: 'Baru saja'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate intelligent KMS retrieval based on FR-17:
    // "Sistem mencari pengetahuan yang relevan dari Knowledge Repository dan menghasilkan jawaban berdasarkan pengetahuan yang tersedia."
    setTimeout(() => {
      let botResponse = '';
      let sources: string[] = [];
      const lower = text.toLowerCase();

      if (lower.includes('tertinggi') || lower.includes('semarang tengah') || lower.includes('suhu tertinggi')) {
        const tengah = INITIAL_WILAYAH.find((w) => w.wilayah === 'Semarang Tengah');
        botResponse = `Berdasarkan data komposit Landsat 8/9 & Sentinel-3 terverifikasi Juni 2026, suhu tertinggi tercatat di **${tengah?.wilayah}** sebesar **${tengah?.lst}°C** (NDVI: ${tengah?.ndvi}). Tingginya LST dipicu oleh kepadatan kawasan komersial dan rasio permukaan kedap air yang mencapai 89%. Wilayah ini masuk **Klaster 0 (Hotspot Inti)** model DBSCAN.`;
        sources = ['Dataset LST sentinel 2026', 'Profil Wilayah Semarang Tengah'];
      } else if (lower.includes('semarang utara') || lower.includes('pesisir') || lower.includes('pelabuhan')) {
        botResponse = `Untuk kawasan pesisir **Semarang Utara** (LST 37.9°C), rekomendasi mitigasi utama adalah pembangunan **sabuk hijau pesisir (coastal green belt)** sepanjang 50 meter menggunakan vegetasi mangrove dan cemara udang, koridor ventilasi angin laut, serta penggunaan material atap reflektif (albedo > 0.65) pada pergudangan Tanjung Emas.`;
        sources = ['Knowledge: Semarang Utara', 'SOP penghijauan jalur koridor'];
      } else if (lower.includes('atap hijau') || lower.includes('balai kota') || lower.includes('green roof')) {
        botResponse = `Uji coba *extensive green roof* seluas 450 m² di Gedung Moch. Ihsan Balai Kota membuktikan penurunan suhu permukaan dari 51.2°C pada atap beton menjadi **33.2°C** pada atap hijau (penurunan 18°C). Suhu ruangan lantai 8 di bawahnya turun rata-rata 2.1°C, menghemat konsumsi energi AC hingga 14%.`;
        sources = ['Knowledge: Evaluasi atap hijau percontohan'];
      } else if (lower.includes('ndvi') || lower.includes('vegetasi') || lower.includes('korelasi') || lower.includes('faktor')) {
        botResponse = `Hasil analisis faktor lingkungan ShadeMarang KMS (FR-06) menunjukkan hubungan **korelasi negatif yang kuat** antara NDVI dan LST ($r = -0.84$). Setiap kenaikan 0.1 indeks NDVI di Kota Semarang terbukti menurunkan suhu permukaan rata-rata sebesar **1.2°C hingga 1.8°C**, terutama pada koridor jalan yang dinaungi kanopi pohon Trembesi.`;
        sources = ['Analisis Hubungan Faktor Lingkungan KMS', 'Strategi Kanopi Pohon Trembesi'];
      } else {
        botResponse = `Terima kasih atas pertanyaannya. Berdasarkan Knowledge Repository ShadeMarang KMS, pemantauan UHI Kota Semarang mencakup 12 kecamatan dengan fokus prioritas pada 5 hotspot aktif (Semarang Tengah, Semarang Utara, Semarang Timur, Genuk, Gayamsari). Dokumen teknis dan strategi mitigasi dapat ditelusuri di repositori KMS.`;
        sources = ['Knowledge Repository ShadeMarang KMS', 'Dokumen baseline UHI Kota Semarang'];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        timestamp: 'Baru saja',
        sources: sources
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF7F5] min-h-[calc(100vh-80px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE4E8] pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEDDE4] border border-[#ECE4E8] text-xs font-bold text-[#5A2C40] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              FR-17 · Chatbot Informasi UHI Kota Semarang
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#272023]">
              Tanya Pengetahuan UHI
            </h1>
            <p className="text-sm text-[#8A7E84] mt-1">
              Interaksi berbasis pertanyaan untuk mengeksplorasi kondisi suhu, hasil analisis AI, dan rekomendasi mitigasi terverifikasi.
            </p>
          </div>
          <button
            onClick={() => navigateTo('knowledge')}
            className="btn btn--outline btn--small self-start sm:self-auto flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-[#6E3E53]" />
            Buka Repositori
          </button>
        </div>

        {/* Chat Box */}
        <div className="bg-white rounded-2xl border border-[#ECE4E8] shadow-sm overflow-hidden flex flex-col h-[560px]">
          {/* Top Bar of Chat */}
          <div className="px-5 py-3.5 bg-[#FAF7F5] border-b border-[#ECE4E8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#6E3E53] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                AI
              </span>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#272023] flex items-center gap-1.5">
                  Asisten ShadeMarang KMS
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                </h4>
                <p className="text-[11px] text-[#8A7E84]">
                  Terhubung ke 96 knowledge assets & model AI tervalidasi (RF v2.1, DBSCAN v1.4)
                </p>
              </div>
            </div>
            <button
              onClick={() => setMessages(INITIAL_CHAT_MESSAGES)}
              className="text-xs text-[#8A7E84] hover:text-[#6E3E53] flex items-center gap-1 cursor-pointer"
              title="Reset Percakapan"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-[#EEDDE4] border border-[#ECE4E8] flex-shrink-0 flex items-center justify-center text-xs font-bold text-[#5A2C40]">
                    SM
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#6E3E53] text-white rounded-tr-none'
                      : 'bg-[#FAF7F5] border border-[#ECE4E8] text-[#272023] rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#ECE4E8] text-xs">
                      <span className="font-bold text-[#8A7E84] block mb-1">
                        Sumber Pengetahuan Terverifikasi (KMS):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.sources.map((src, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EEDDE4]/50 border border-[#ECE4E8] text-[11px] font-semibold text-[#5A2C40]"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#6E3E53]" />
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <span
                    className={`block text-[10px] mt-1.5 ${
                      msg.sender === 'user' ? 'text-white/80 text-right' : 'text-[#8A7E84]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-full bg-[#EEDDE4] border border-[#ECE4E8] flex items-center justify-center text-xs font-bold text-[#5A2C40]">
                  SM
                </div>
                <div className="bg-white border border-[#ECE4E8] rounded-2xl px-4 py-2.5 text-xs text-[#8A7E84] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6E3E53] animate-ping"></span>
                  Mencari di repositori pengetahuan ShadeMarang...
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          <div className="px-4 py-2.5 bg-[#FAF7F5] border-t border-[#ECE4E8] overflow-x-auto flex gap-2">
            <span className="text-[11px] font-bold text-[#8A7E84] whitespace-nowrap self-center">
              Pertanyaan Cepat:
            </span>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#ECE4E8] text-[#272023] hover:border-[#6E3E53] hover:text-[#6E3E53] whitespace-nowrap transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 bg-white border-t border-[#ECE4E8] flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tanyakan kondisi panas, rekomendasi mitigasi, atau data spasial..."
              className="flex-1 px-4 py-2.5 rounded-full border border-[#ECE4E8] text-sm focus:outline-none focus:border-[#6E3E53] focus:ring-1 focus:ring-[#6E3E53] bg-[#FAF7F5]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="btn btn--primary btn--small px-5 rounded-full flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Kirim</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
