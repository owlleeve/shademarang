"use client";

import {useEffect, useRef, useState} from "react";
import type {Map as LeafletMap, LayerGroup} from "leaflet";

export type AreaForMap = {name:string;heat:number;green:number;built:number;status:string};
export type CurrentReading = {name:string;temperature:number;time:string};

export const areaCoordinates:Record<string,[number,number]> = {
  "Semarang Tengah":[-6.9827,110.4203],
  "Semarang Utara":[-6.9602,110.4225],
  "Semarang Timur":[-6.9845,110.4412],
  "Genuk":[-6.9610,110.4780],
  "Semarang Selatan":[-7.0012,110.4241],
  "Gayamsari":[-6.9890,110.4550],
  "Candisari":[-7.0210,110.4280],
  "Semarang Barat":[-6.9870,110.3890],
  "Gajahmungkur":[-7.0150,110.4070],
  "Banyumanik":[-7.0720,110.4190],
  "Gunungpati":[-7.0850,110.3720],
  "Mijen":[-7.0650,110.3120],
};

function thematicValue(area:AreaForMap,mode:string,current:CurrentReading[]){
  if(mode==="Suhu udara terkini")return current.find(c=>c.name===area.name)?.temperature;
  if(mode==="Vegetasi")return area.green;
  if(mode==="Kawasan terbangun")return area.built;
  if(mode==="Gabungan prioritas")return Math.round((area.heat-25)*4+(100-area.green)*.35+area.built*.22);
  return area.heat;
}
function palette(value:number,mode:string){
  if(mode==="Vegetasi")return value<18?"#ef3476":value<40?"#b556bd":"#7666d2";
  if(mode==="Kawasan terbangun")return value>=75?"#ef3476":value>=50?"#b556bd":"#7666d2";
  if(mode==="Gabungan prioritas")return value>=85?"#ef3476":value>=60?"#b556bd":"#7666d2";
  if(mode==="Suhu udara terkini")return value>=32?"#ef3476":value>=29?"#b556bd":"#7666d2";
  return value>=36?"#ef3476":value>=33?"#b556bd":"#7666d2";
}
export default function ThematicMap({areas,selected,onSelect,mode,current,resetKey=0}:{areas:AreaForMap[];selected:string;onSelect:(name:string)=>void;mode:string;current:CurrentReading[];resetKey?:number}){
  const element=useRef<HTMLDivElement>(null);
  const map=useRef<LeafletMap|null>(null);
  const layer=useRef<LayerGroup|null>(null);
  const lastReset=useRef(resetKey);
  const [loaded,setLoaded]=useState(false);

  useEffect(()=>{
    let disposed=false;
    (async()=>{
      const L=await import("leaflet");
      if(disposed||!element.current||map.current)return;
      const m=L.map(element.current,{scrollWheelZoom:false,zoomControl:false,attributionControl:true}).setView([-7.01,110.415],11);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'}).addTo(m);
      L.control.zoom({position:"bottomright"}).addTo(m);
      map.current=m;
      layer.current=L.layerGroup().addTo(m);
      setLoaded(true);
      requestAnimationFrame(()=>m.invalidateSize());
    })();
    return()=>{disposed=true;map.current?.remove();map.current=null;layer.current=null};
  },[]);

  useEffect(()=>{
    if(!loaded||!map.current||!layer.current)return;
    const m=map.current;
    const group=layer.current;
    group.clearLayers();
    import("leaflet").then(L=>{
      if(map.current!==m)return;
      areas.forEach(area=>{
        const coordinate=areaCoordinates[area.name];
        const value=thematicValue(area,mode,current);
        if(!coordinate||value===undefined)return;
        const active=area.name===selected;
        const color=palette(value,mode);
        const circle=L.circleMarker(coordinate,{radius:active?21:15,weight:active?3:2,color:"#fff",fillColor:color,fillOpacity:active?.94:.82,className:active?"thematic-active":""});
        const unit=mode==="Vegetasi"||mode==="Kawasan terbangun"?"%":mode==="Gabungan prioritas"?"":"°C";
        circle.bindTooltip(`<strong>${area.name}</strong><br>${mode}: ${Number(value).toFixed(mode==="Gabungan prioritas"?0:1)}${unit}<br>${area.status}`,{direction:"top",opacity:1});
        circle.on("click",()=>onSelect(area.name));
        circle.addTo(group);
      });
    });
  },[areas,selected,onSelect,mode,current,loaded]);

  useEffect(()=>{
    const m=map.current;
    if(!m)return;
    if(resetKey!==lastReset.current){lastReset.current=resetKey;m.flyTo([-7.01,110.415],11,{duration:.65});return}
    const coordinate=areaCoordinates[selected];
    if(coordinate)m.flyTo(coordinate,12,{duration:.65});
  },[selected,resetKey,loaded]);

  return <div className="osm-map" ref={element} aria-label="Peta interaktif Semarang berbasis OpenStreetMap" role="application">{!loaded&&<span className="map-loading">Memuat peta Semarang…</span>}</div>;
}
