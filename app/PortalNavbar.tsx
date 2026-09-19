"use client";

import {useState} from "react";
import Image from "next/image";
import {LogOut, Menu, X} from "lucide-react";

type NavItem={page:string;label:string};
export default function PortalNavbar({items,page,role,showManage,onNavigate,onLogin,onLogout}:{items:NavItem[];page:string;role:string;showManage:boolean;onNavigate:(page:string)=>void;onLogin:()=>void;onLogout:()=>void}){
 const [open,setOpen]=useState(false);
 const navigate=(target:string)=>{setOpen(false);onNavigate(target)};
 const links=[...items,...(showManage?[{page:"Kelola KMS",label:role==="dlh"?"Dokumen DLH":role==="peneliti"?"Kajian Peneliti":"Kelola KMS"}]:[])];
 return <header className="site-header"><div className="shell site-header-inner"><button className="site-brand" onClick={()=>navigate("Beranda")} aria-label="ShadeMarang — Beranda"><span className="site-brand-mark" aria-hidden="true"><Image src="/logo.png" alt="" width={40} height={40} /></span><span className="site-brand-copy"><strong>ShadeMarang</strong><small>KMS UHI SEMARANG</small></span></button><nav className="site-nav" aria-label="Navigasi utama">{links.map(item=><button key={item.page} aria-current={page===item.page?"page":undefined} className={page===item.page?"active":""} onClick={()=>navigate(item.page)}>{item.label}</button>)}</nav><div className="site-account">{role==="publik"?<button className="btn primary" onClick={onLogin}>Masuk</button>:<><span className="site-role">{role.toUpperCase()}</span><button className="site-logout" onClick={onLogout} aria-label="Keluar dari akun"><LogOut size={17}/><span>Keluar</span></button></>}</div><button className="site-menu-button" aria-label={open?"Tutup menu":"Buka menu"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button></div>{open&&<div className="site-mobile-nav"><nav aria-label="Navigasi seluler">{links.map(item=><button key={item.page} aria-current={page===item.page?"page":undefined} className={page===item.page?"active":""} onClick={()=>navigate(item.page)}>{item.label}</button>)}</nav><div className="site-mobile-account">{role==="publik"?<button className="btn primary" onClick={()=>{setOpen(false);onLogin()}}>Masuk</button>:<button className="btn" onClick={()=>{setOpen(false);onLogout()}}>Keluar · {role.toUpperCase()}</button>}</div></div>}</header>;
}
