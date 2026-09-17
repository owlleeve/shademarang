"use client";

import {useState} from "react";
import {LogOut, Menu, X} from "lucide-react";

type NavItem={page:string;label:string};
export default function PortalNavbar({items,page,role,showManage,onNavigate,onLogin,onLogout}:{items:NavItem[];page:string;role:string;showManage:boolean;onNavigate:(page:string)=>void;onLogin:()=>void;onLogout:()=>void}){
 const [open,setOpen]=useState(false);
 const navigate=(target:string)=>{setOpen(false);onNavigate(target)};
 const links=[...items,...(showManage?[{page:"Kelola KMS",label:"Kelola KMS"}]:[])];
 return <header className="site-header"><div className="shell site-header-inner"><button className="site-brand" onClick={()=>navigate("Beranda")} aria-label="ShadeMarang — Beranda"><span className="site-brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 5.5 19 15h-3.6l-3.4-5.6L7.4 17H3l7.5-11.5 3 4.2z"/><circle cx="17.4" cy="6.6" r="1.9"/></svg></span><span className="site-brand-copy"><strong>ShadeMarang</strong><small>KMS UHI SEMARANG</small></span></button><nav className="site-nav" aria-label="Navigasi utama">{links.map(item=><button key={item.page} aria-current={page===item.page?"page":undefined} className={page===item.page?"active":""} onClick={()=>navigate(item.page)}>{item.label}</button>)}</nav><div className="site-account">{role==="publik"?<button className="btn primary" onClick={onLogin}>Masuk</button>:<><span className="site-role">{role.toUpperCase()}</span><button className="site-logout" onClick={onLogout} aria-label="Keluar dari akun"><LogOut size={17}/><span>Keluar</span></button></>}</div><button className="site-menu-button" aria-label={open?"Tutup menu":"Buka menu"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button></div>{open&&<div className="site-mobile-nav"><nav aria-label="Navigasi seluler">{links.map(item=><button key={item.page} aria-current={page===item.page?"page":undefined} className={page===item.page?"active":""} onClick={()=>navigate(item.page)}>{item.label}</button>)}</nav><div className="site-mobile-account">{role==="publik"?<button className="btn primary" onClick={()=>{setOpen(false);onLogin()}}>Masuk</button>:<button className="btn" onClick={()=>{setOpen(false);onLogout()}}>Keluar · {role.toUpperCase()}</button>}</div></div>}</header>;
}
