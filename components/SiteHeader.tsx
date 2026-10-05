"use client";

import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";

const links = [
  ["Enfoque", "#enfoque"],
  ["Servicios", "#servicios"],
  ["Proceso", "#proceso"],
  ["Brief", "#brief"],
  ["Contacto", "#contacto"],
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${compact ? " compact" : ""}`}>
      <a href="#inicio" className="brand-link" onClick={() => setOpen(false)}><Wordmark /></a>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <a className="header-cta" href="#brief">Empezar proyecto <span>↗</span></a>
      <button type="button" className="menu-button" aria-expanded={open} aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen((v) => !v)}>
        <span /><span />
      </button>
      {open && (
        <div className="mobile-menu">
          {links.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}<span>↗</span></a>)}
          <a href="#brief" className="mobile-primary" onClick={() => setOpen(false)}>Empezar proyecto <span>↗</span></a>
        </div>
      )}
    </header>
  );
}
