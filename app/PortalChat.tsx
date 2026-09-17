"use client";

import { useState } from "react";
import { BookOpen, RotateCcw, Send, Sparkles } from "lucide-react";

type Knowledge = { id: string; title: string; summary: string; body: string; area: string; category: string };
type Message = { id: number; from: "user" | "assistant"; text: string; source?: Knowledge };

const suggestions = [
  "Wilayah mana yang paling panas?",
  "Apa pilihan mitigasi untuk Semarang Tengah?",
  "Apa hasil evaluasi penghijauan?",
  "Bagaimana membaca data suhu permukaan?",
];

export default function PortalChat({ knowledge, onKnowledge, onExplore }: { knowledge: Knowledge[]; onKnowledge: (id: string) => void; onExplore: () => void }) {
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "assistant", text: "Halo! Tanyakan kondisi panas, mitigasi, atau hasil evaluasi. Saya akan mencari jawaban dari pengetahuan yang tersedia di ShadeMarang." }]);
  const [input, setInput] = useState("");

  function ask(question: string) {
    const value = question.trim();
    if (!value) return;
    const terms = value.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 3 && !["yang", "untuk", "dengan", "bagaimana", "apakah", "wilayah", "semarang"].includes(word));
    const ranked = knowledge.map((item) => ({ item, score: terms.reduce((score, term) => score + (item.title.toLowerCase().includes(term) ? 3 : 0) + (`${item.summary} ${item.body} ${item.area} ${item.category}`.toLowerCase().includes(term) ? 1 : 0), 0) })).sort((a, b) => b.score - a.score);
    const match = ranked[0]?.score > 0 ? ranked[0].item : undefined;
    const answer = match ? `${match.summary} ${match.body.slice(0, 280)}${match.body.length > 280 ? "…" : ""}` : "Saya belum menemukan jawaban yang cukup dekat di pustaka pengetahuan. Coba sebutkan nama kecamatan, jenis mitigasi, atau hasil evaluasi yang ingin Anda baca.";
    setMessages((items) => [...items, { id: Date.now(), from: "user", text: value }, { id: Date.now() + 1, from: "assistant", text: answer, source: match }]);
    setInput("");
  }

  return <main className="shell section chat-page"><div className="spread"><div><span className="eyebrow">Asisten pengetahuan · data contoh</span><h1>Tanya AI UHI</h1><p className="lead">Jelajahi jawaban dari dokumen KMS yang dapat Anda akses. Jawaban ini adalah pencarian berbasis kata kunci, bukan analisis model AI.</p></div><button className="btn" onClick={onExplore}><BookOpen size={17} /> Buka pengetahuan</button></div><div className="chat-shell"><div className="chat-head"><span className="row"><Sparkles size={17} /> Asisten ShadeMarang</span><button className="text-link" onClick={() => setMessages((items) => items.slice(0, 1))}><RotateCcw size={15} /> Mulai ulang</button></div><div className="chat-messages" role="log" aria-live="polite">{messages.map((message) => <div key={message.id} className={`chat-bubble ${message.from}`}><p>{message.text}</p>{message.source && <button className="text-link" onClick={() => onKnowledge(message.source!.id)}>Sumber: {message.source.title} →</button>}</div>)}</div><div className="chat-suggestions">{suggestions.map((question) => <button key={question} className="btn" onClick={() => ask(question)}>{question}</button>)}</div><form className="chat-form" onSubmit={(event) => { event.preventDefault(); ask(input); }}><input className="field" aria-label="Pertanyaan untuk asisten" placeholder="Tanyakan kondisi wilayah atau hasil mitigasi…" value={input} onChange={(event) => setInput(event.target.value)} /><button className="btn primary" disabled={!input.trim()}><Send size={16} /> Kirim</button></form></div></main>;
}
