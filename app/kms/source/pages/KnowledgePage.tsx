import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { FlashAlert } from '../components/FlashAlert';
import { KnowledgeArticle, ArticleCategory, ArticleStatus } from '../types';
import { INITIAL_ARTICLES } from '../data/mockData';
import { KnowledgeDetailModal } from '../components/KnowledgeDetailModal';
import { Search, Plus, BookOpen, Thermometer, Filter, Sparkles, X, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

export const KnowledgePage: React.FC = () => {
  const { user, navigateTo } = useAuth();
  const [articles, setArticles] = useState<KnowledgeArticle[]>(INITIAL_ARTICLES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeArticle, setActiveArticle] = useState<KnowledgeArticle | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Article Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState<ArticleCategory>('Mitigasi');
  const [newStatus, setNewStatus] = useState<ArticleStatus>('Hangat / valid');
  const [newLst, setNewLst] = useState('');
  const [newContent, setNewContent] = useState('');

  const categories = ['Semua', 'Hotspot', 'Mitigasi', 'RTH', 'Panduan'];

  const filteredArticles = useMemo(() => {
    return articles.filter((item) => {
      const matchCategory =
        selectedCategory === 'Semua' || item.category === selectedCategory || item.tag === selectedCategory;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newObj: KnowledgeArticle = {
      id: `art-${Date.now()}`,
      title: newTitle,
      description: newDesc || `${newCat} UHI Kota Semarang`,
      category: newCat,
      tag: newCat,
      status: newStatus,
      lst: newLst ? `${newLst}°C` : undefined,
      date: 'Hari ini',
      author: user ? user.name : 'Staf KMS',
      readTime: '3 mnt baca',
      content: newContent || 'Dokumen panduan teknis dan analisis mitigasi UHI Semarang.',
    };

    setArticles([newObj, ...articles]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewLst('');
    setNewContent('');
  };

  const getBadgeClass = (status: ArticleStatus) => {
    switch (status) {
      case 'Hotspot':
        return 'badge--hotspot';
      case 'Hangat / valid':
        return 'badge--hangat';
      case 'Neutral':
        return 'badge--neutral';
      case 'Menunggu':
        return 'badge--menunggu';
      default:
        return 'badge--neutral';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <FlashAlert />

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="eyebrow">Knowledge</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1C1917]">
              Pustaka pengetahuan UHI
            </h1>
            <p className="text-base text-[#78716C] mt-1.5 max-w-2xl">
              Repositori publik data spasial suhu permukaan (LST), analisis vegetasi, dan panduan mitigasi iklim mikro Kota Semarang.
            </p>
          </div>

          <button
            onClick={() => {
              if (!user) {
                navigateTo('login', {
                  redirectAfterLogin: 'knowledge',
                  flash: 'Silakan masuk untuk berkontribusi menambahkan dokumen pengetahuan baru.',
                });
              } else {
                setShowAddModal(true);
              }
            }}
            className="btn btn--primary self-start sm:self-auto cursor-pointer"
            id="btn-tambah-knowledge"
          >
            <Plus className="w-4 h-4" />
            {user ? 'Tambah Pengetahuan' : 'Masuk untuk Kontribusi'}
          </button>
        </div>
      </header>

      {/* Searchbar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#78716C]">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari pengetahuan UHI…"
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#ECE4E8] rounded-2xl text-sm text-[#272023] placeholder-[#A8A29E] focus:outline-none focus:border-[#6E3E53] focus:ring-2 focus:ring-[#6E3E53]/10 transition-all shadow-sm"
          id="knowledge-search-input"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#8A7E84] hover:text-[#272023]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="chips">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`chip ${selectedCategory === cat ? 'is-active' : ''}`}
          >
            {cat}
            {cat !== 'Semua' && (
              <span className="ml-1.5 text-xs opacity-80">
                ({articles.filter((a) => a.category === cat || a.tag === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="panel text-center py-12">
          <BookOpen className="w-10 h-10 text-[#A8A29E] mx-auto mb-3" />
          <h3 className="text-lg font-bold font-display text-[#272023]">Tidak ada artikel ditemukan</h3>
          <p className="text-sm text-[#8A7E84] mt-1">Coba gunakan kata kunci lain atau pilih filter "Semua".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
            className="btn btn--outline btn--small mt-4"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Featured Lead Research Article (Asymmetrical Showcase) */}
          {filteredArticles.length > 0 && (() => {
            const lead = filteredArticles[0];
            return (
              <article
                key={`lead-${lead.id}`}
                onClick={() => setActiveArticle(lead)}
                className="bg-[#FAF7F5] border-2 border-[#ECE4E8] rounded-3xl p-7 sm:p-9 shadow-sm hover:border-[#6E3E53] transition-all cursor-pointer group"
                id={`article-card-lead-${lead.id}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="badge badge--kunci text-xs px-3 py-1 font-bold">
                        KAJIAN UNGGULAN
                      </span>
                      <span className={`badge ${getBadgeClass(lead.status)} text-xs`}>
                        {lead.status}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#8A7E84] uppercase tracking-wider">
                        {lead.category} · {lead.date}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#272023] group-hover:text-[#6E3E53] transition-colors leading-tight">
                      {lead.title}
                    </h2>

                    <p className="text-sm sm:text-base text-[#595155] leading-relaxed">
                      {lead.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#8A7E84]">
                      <span className="flex items-center gap-1.5 font-semibold text-[#272023]">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                        Data Validasi Lapangan Bappeda
                      </span>
                      <span>·</span>
                      <span>Penulis: Tim Spasial ShadeMarang</span>
                    </div>
                  </div>

                  {/* Asymmetric Telemetry Sidebar on Lead Card */}
                  <div className="lg:col-span-4 bg-white/90 backdrop-blur rounded-2xl p-5 border border-[#ECE4E8] space-y-4">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6E3E53] block">
                        Indikator Kunci
                      </span>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-sm font-semibold text-[#272023]">Suhu Puncak LST</span>
                        <span className="text-2xl font-black font-display text-[#5A2C40]">
                          {lead.title.includes('Semarang Tengah') ? '38.4°C' : '37.9°C'}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-[#ECE4E8] pt-3">
                      <span className="text-xs text-[#8A7E84] block">Metode Mitigasi:</span>
                      <span className="text-xs font-bold text-[#272023] block mt-0.5">
                        Koridor Kanopi RTH &amp; Atap Dingin
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveArticle(lead);
                      }}
                      className="btn btn--primary text-xs sm:text-sm w-full py-2.5 cursor-pointer flex items-center justify-center gap-2"
                    >
                      Buka Dokumen Lengkap
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })()}

          {/* Subsequent Articles in Asymmetric Bento Layout */}
          {filteredArticles.length > 1 && (
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {filteredArticles.slice(1).map((article, idx) => {
                // Vary span and visual structure based on index
                const isWide = idx % 3 === 0;
                const colSpanClass = isWide ? 'lg:col-span-7' : 'lg:col-span-5';
                const isAccent = idx % 2 === 1;

                return (
                  <article
                    key={article.id}
                    onClick={() => setActiveArticle(article)}
                    className={`${colSpanClass} card flex flex-col justify-between cursor-pointer group hover:-translate-y-1 hover:border-[#6E3E53] transition-all ${
                      isAccent ? 'bg-[#FAF7F5]' : 'bg-white'
                    }`}
                    id={`article-card-${article.id}`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`badge ${getBadgeClass(article.status)}`}>
                          {article.status}
                        </span>
                        <span className="text-[11px] font-bold text-[#A8A29E] uppercase tracking-wider">
                          {article.category}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold font-display text-[#272023] group-hover:text-[#6E3E53] transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#8A7E84] line-clamp-3 leading-relaxed">
                        {article.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-5 border-t border-[#ECE4E8]/80 flex items-center justify-between text-xs text-[#8A7E84]">
                      <span>{article.date}</span>
                      <span className="font-semibold text-[#6E3E53] group-hover:underline flex items-center gap-1">
                        Buka dokumen →
                      </span>
                    </div>
                  </article>
                );
              })}
            </section>
          )}
        </div>
      )}

      {/* Knowledge Detail Modal */}
      <KnowledgeDetailModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />

      {/* Modal: Tambah Artikel Baru */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E7E5E4] relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-6 right-6 text-[#78716C] hover:text-[#1C1917]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold font-display text-[#1C1917] mb-1">
              Tambah Pengetahuan UHI
            </h3>
            <p className="text-xs text-[#78716C] mb-6">
              Simpan laporan, analisis spasial, atau SOP mitigasi ke repositori KMS.
            </p>

            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-1.5">
                  Judul Dokumen / Wilayah
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Semarang Barat - Analisis LST Koridor Arteri"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#ECE4E8] rounded-xl text-sm focus:outline-none focus:border-[#6E3E53]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8A7E84] mb-1.5">
                    Kategori
                  </label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as ArticleCategory)}
                    className="w-full px-3 py-2 bg-white border border-[#ECE4E8] rounded-xl text-sm focus:outline-none focus:border-[#6E3E53]"
                  >
                    <option value="Hotspot">Hotspot</option>
                    <option value="Mitigasi">Mitigasi</option>
                    <option value="RTH">RTH</option>
                    <option value="Panduan">Panduan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8A7E84] mb-1.5">
                    Status Dokumen
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ArticleStatus)}
                    className="w-full px-3 py-2 bg-white border border-[#ECE4E8] rounded-xl text-sm focus:outline-none focus:border-[#6E3E53]"
                  >
                    <option value="Hangat / valid">Hangat / valid</option>
                    <option value="Hotspot">Hotspot</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Menunggu">Menunggu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8A7E84] mb-1.5">
                  Ringkasan / Subjudul (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: LST 34.2°C · Evaluasi jalur hijau pedestrian"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#ECE4E8] rounded-xl text-sm focus:outline-none focus:border-[#6E3E53]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8A7E84] mb-1.5">
                  Isi Laporan / Rekomendasi
                </label>
                <textarea
                  rows={4}
                  placeholder="Tulis uraian data atau langkah mitigasi..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#ECE4E8] rounded-xl text-sm focus:outline-none focus:border-[#6E3E53]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn--ghost btn--small"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn btn--primary btn--small"
                >
                  Simpan ke Knowledge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
