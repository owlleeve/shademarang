"use client";

import {ArrowRight, Sparkles} from "lucide-react";

type Knowledge={id:string;title:string;summary:string;area:string;category:string};

export default function HomeKnowledgeBento({knowledge,onKnowledge,onChat,showChat=true}:{knowledge:Knowledge[];onKnowledge:(id:string)=>void;onChat:()=>void;showChat?:boolean}){
 const focusTopics=["Koridor kanopi trembesi","Cool roof & albedo","Korelasi NDVI vs LST"];
 return <section className="shell home-knowledge-section" aria-labelledby="home-knowledge-title">
   <div className={`home-bento ${showChat?"":"home-bento-single"}`} style={showChat?undefined:{gridTemplateColumns:"minmax(0,1fr)"}}>
    <article className="home-library-panel">
      <div className="home-panel-top"><span className="pill">Pustaka terbuka · tanpa login</span><span className="small muted">{knowledge.length} dokumen tersedia</span></div>
      <div><span className="eyebrow">Repositori pengetahuan</span><h2 id="home-knowledge-title">Pustaka Pengetahuan UHI</h2><p>Repositori publik laporan, peta wilayah, kajian tutupan hijau, dan panduan pendinginan iklim mikro Kota Semarang.</p></div>
      <div className="home-topic-block"><span className="small topic-label">Topik kajian unggulan</span><div className="home-topic-list">{focusTopics.map((topic,index)=><button key={topic} onClick={()=>knowledge[index]&&onKnowledge(knowledge[index].id)}>{["🌿","▦","⌁"][index]} {topic}</button>)}</div></div>
      <div className="home-panel-footer"><span className="small muted">Ringkasan kebijakan · kajian · panduan</span><button className="btn primary" onClick={()=>knowledge[0]&&onKnowledge(knowledge[0].id)}>Jelajahi pustaka <ArrowRight size={15}/></button></div>
    </article>
    {showChat&&<article className="home-chat-panel">
      <div className="home-panel-top"><span className="home-sparkle"><Sparkles size={18}/></span><span className="home-engine">ShadeMarang knowledge assistant</span></div>
      <div><span className="eyebrow light">Asisten pengetahuan</span><h2>Tanya AI UHI</h2><p>Ajukan pertanyaan tentang titik panas, mitigasi, atau pembelajaran dari kegiatan sebelumnya.</p></div>
      <div className="home-prompts"><span className="small">Coba tanyakan langsung</span><button onClick={onChat}>“Wilayah mana yang paling panas?” <ArrowRight size={15}/></button><button onClick={onChat}>“Apa pilihan mitigasi Semarang Tengah?” <ArrowRight size={15}/></button></div>
      <div className="home-panel-footer"><span className="small">Jawaban ditelusuri dari pustaka</span><button className="btn home-chat-button" onClick={onChat}>Mulai chat <ArrowRight size={15}/></button></div>
    </article>}
   </div>
 </section>;
}
