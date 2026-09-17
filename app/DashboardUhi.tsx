"use client";

import {useMemo, useState} from "react";
import ThematicMap,{type AreaForMap} from "./ThematicMap";
import DashboardBelowMap from "./DashboardBelowMap";

type Area=AreaForMap&{change:number};
type Knowledge={id:string;title:string;summary:string;area:string;category:string};
type Action={id:string;title:string;area:string;status:string};

export default function DashboardUhi({areas,knowledge,actions,selected,onArea,onKnowledge,onAction,onMap,onAnalysis,onEvaluation,onAI,internal}:{areas:Area[];knowledge:Knowledge[];actions:Action[];selected:string;onArea:(name:string)=>void;onKnowledge:(id:string)=>void;onAction:(id:string)=>void;onMap:()=>void;onAnalysis:()=>void;onEvaluation:()=>void;onAI:()=>void;internal:boolean}){
  const [layer,setLayer]=useState("Kondisi panas");
  const area=areas.find(a=>a.name===selected)??areas[0];
  const ranked=useMemo(()=>[...areas].sort((a,b)=>b.heat-a.heat),[areas]);
  const highest=ranked[0];
  const mean=areas.reduce((total,a)=>total+a.heat,0)/areas.length;
  const attention=areas.filter(a=>a.heat>=36).length;
  const relatedAction=actions.find(item=>item.area===selected);

  return <main className="shell section dashboard-uhi">
    <div className="dashboard-intro"><div><span className="eyebrow">Dashboard UHI · Kota Semarang</span><h1>Pantauan panas perkotaan</h1><p className="lead">Mulai dari gambaran kota, pilih wilayah yang perlu diperhatikan, lalu ikuti pengetahuan dan riwayat tindakannya.</p></div><div className="dashboard-period"><span className="eyebrow">Periode pengamatan</span><strong>2025</strong><span>Data contoh untuk eksplorasi KMS</span></div></div>

    <section className="dashboard-summary" aria-labelledby="dashboard-summary-title"><div className="dashboard-summary-main"><span className="eyebrow">Ringkasan kondisi UHI</span><h2 id="dashboard-summary-title">Pusat kota dan pesisir muncul sebagai prioritas pengamatan.</h2><p>Dalam data contoh, {attention} dari {areas.length} titik wilayah memiliki suhu permukaan setidaknya 36°C. Gunakan peta dan pengetahuan terkait untuk membaca konteksnya sebelum menentukan tindakan.</p><button className="btn primary" onClick={onMap}>Jelajahi seluruh peta <span aria-hidden="true">↗</span></button></div><div className="dashboard-summary-side"><span className="eyebrow">Titik paling panas</span><strong>{highest.heat.toFixed(1)}°C</strong><span>{highest.name}</span><button className="text-link" onClick={()=>{onArea(highest.name);onMap()}}>Baca kondisi wilayah →</button></div></section>

    <section className="dashboard-indicators" aria-label="Indikator utama"><div><span>Rerata titik pantau</span><strong>{mean.toFixed(1)}°C</strong><small>Contoh suhu permukaan</small></div><div><span>Perlu perhatian lebih</span><strong>{attention} wilayah</strong><small>Ambang contoh ≥ 36°C</small></div><div><span>Rentang antarwilayah</span><strong>{(highest.heat-ranked[ranked.length-1].heat).toFixed(1)}°C</strong><small>Tertinggi hingga terendah</small></div></section>

    <section className="section" aria-labelledby="dashboard-map-title"><div className="spread"><div><span className="eyebrow">Peta dan wilayah</span><h2 id="dashboard-map-title">Di mana perhatian dibutuhkan?</h2></div><label className="dashboard-layer">Lapisan peta<select className="field" value={layer} onChange={event=>setLayer(event.target.value)}><option>Kondisi panas</option><option>Vegetasi</option><option>Kawasan terbangun</option><option>Gabungan prioritas</option></select></label></div><div className="dashboard-map-layout"><div><ThematicMap areas={areas} selected={selected} onSelect={onArea} mode={layer} current={[]}/><p className="small muted dashboard-map-note">Peta dasar © OpenStreetMap. Lingkaran menunjukkan titik perwakilan kecamatan dari data contoh 2025, bukan batas wilayah presisi.</p></div><aside className="dashboard-area-detail" aria-live="polite"><span className="eyebrow">Wilayah terpilih</span><h3>{area.name}</h3><span className="pill">{area.status}</span><p>Suhu permukaan contoh <b>{area.heat.toFixed(1)}°C</b>. Tutupan vegetasi <b>{area.green.toFixed(1)}%</b> dan kawasan terbangun <b>{area.built}%</b> pada data demonstrasi.</p><div className="dashboard-area-links"><button onClick={onMap}>Lihat titik pada peta ↗</button>{relatedAction&&<button onClick={()=>onAction(relatedAction.id)}>{relatedAction.title} ↗</button>}</div><div className="dashboard-rank"><span className="eyebrow">Wilayah prioritas</span>{ranked.slice(0,4).map((item,index)=><button key={item.name} className={selected===item.name?"selected":""} onClick={()=>onArea(item.name)}><span>{String(index+1).padStart(2,"0")}</span><span>{item.name}</span><b>{item.heat.toFixed(1)}°</b></button>)}</div></aside></div></section>

    <DashboardBelowMap selected={selected} onSelect={onArea} knowledge={knowledge} actions={actions} internal={internal} onKnowledge={onKnowledge} onAction={onAction} onEvaluation={onEvaluation} onAI={onAI} onAnalysis={onAnalysis}/>
  </main>;
}
