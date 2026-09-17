import React from 'react';
import { KnowledgeArticle } from '../types';
import { X, Calendar, User, Clock, Thermometer, Leaf, CheckCircle2, Download, Share2 } from 'lucide-react';

interface Props {
  article: KnowledgeArticle | null;
  onClose: () => void;
}

export const KnowledgeDetailModal: React.FC<Props> = ({ article, onClose }) => {
  if (!article) return null;

  const getBadgeClass = (status: string) => {
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E7E5E4] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#FAF7F5] border-b border-[#ECE4E8] relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white border border-[#ECE4E8] flex items-center justify-center text-[#595155] hover:text-[#272023] hover:border-[#272023] transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className={`badge ${getBadgeClass(article.status)}`}>
              {article.status}
            </span>
            <span className="badge badge--neutral">
              {article.category}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#272023] leading-tight mb-2">
            {article.title}
          </h2>
          <p className="text-sm sm:text-base text-[#595155] font-medium">
            {article.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-[#ECE4E8] text-xs text-[#8A7E84]">
            <span className="flex items-center gap-1.5 font-medium">
              <User className="w-3.5 h-3.5 text-[#6E3E53]" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#6E3E53]" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#6E3E53]" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Key Spasial Indicators if available */}
          {(article.lst || article.ndvi) && (
            <div className="grid grid-cols-2 gap-3 p-4 bg-[#FAF7F5] rounded-2xl border border-[#ECE4E8]">
              {article.lst && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#6E3E53] text-white flex items-center justify-center font-bold">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8A7E84] font-semibold block">Land Surface Temp</span>
                    <strong className="text-lg font-bold text-[#5A2C40] font-display">{article.lst}</strong>
                  </div>
                </div>
              )}
              {article.ndvi && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#15803D] text-white flex items-center justify-center font-bold">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8A7E84] font-semibold block">Vegetation Index (NDVI)</span>
                    <strong className="text-lg font-bold text-[#272023] font-display">{article.ndvi}</strong>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Article Text */}
          <div className="text-sm sm:text-base leading-relaxed text-[#272023] whitespace-pre-line space-y-4">
            {article.content}
          </div>

          {/* Strategic Recommendations */}
          {article.recommendations && article.recommendations.length > 0 && (
            <div className="pt-4 border-t border-[#ECE4E8]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A7E84] mb-3">
                Rencana Aksi Mitigasi
              </h4>
              <ul className="space-y-2.5">
                {article.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#272023]">
                    <CheckCircle2 className="w-4 h-4 text-[#6E3E53] flex-shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 bg-[#FAF7F5] border-t border-[#ECE4E8] flex items-center justify-between gap-3">
          <button
            onClick={() => alert(`Mengunduh dokumen teknis ${article.title} (PDF/GeoJSON)...`)}
            className="btn btn--outline btn--small"
          >
            <Download className="w-4 h-4" />
            Unduh Dokumen
          </button>
          <button
            onClick={onClose}
            className="btn btn--primary btn--small"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
