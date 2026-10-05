"use client";

import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";

const links = [
  ["Qué es AIVAN", "#aivan"],
  ["Servicios", "#servicios"],
  ["Nuestro método", "#proceso"],
  ["Acompañamientos", "#aipacks"],
  ["Brief", "#brief"],
  ["Contacto", "#contacto"],
] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("#inicio");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;
    let lastCompact = lastY > 24;
    let lastHidden = false;
    setCompact(lastCompact);

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const nextCompact = y > 24;
        if (nextCompact !== lastCompact) {
          lastCompact = nextCompact;
          setCompact(nextCompact);
        }

        let nextHidden = lastHidden;
        if (y < 120) nextHidden = false;
        else if (y > lastY + 10) nextHidden = true;
        else if (y < lastY - 8) nextHidden = false;

        if (nextHidden !== lastHidden) {
          lastHidden = nextHidden;
          setHidden(nextHidden);
        }

        lastY = y;
        frame = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const sections = ["#inicio", ...links.map(([, href]) => href)]
      .map((href) => document.querySelector<HTMLElement>(href))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-26% 0px -58% 0px", threshold: [0.01, 0.25, 0.55] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={`site-header${compact ? " compact" : ""}${hidden && !open ? " header-hidden" : ""}`}>
      <a href="#inicio" className="brand-link" aria-label="AIVAN STUDIOS — Inicio" onClick={() => setOpen(false)}>
        <Wordmark />
      </a>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {links.map(([label, href]) => (
          <a href={href} key={href} aria-current={active === href ? "location" : undefined}>{label}</a>
        ))}
      </nav>
      <a className="header-cta" href="#brief">Empezar proyecto <span aria-hidden="true">↗</span></a>
      <button
        type="button"
        className={`menu-button${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((value) => !value)}
      >
        <span /><span />
      </button>
      {open && (
        <nav className="mobile-menu" id="mobile-menu" aria-label="Navegación móvil">
          {links.map(([label, href]) => (
            <a href={href} key={href} aria-current={active === href ? "location" : undefined} onClick={() => setOpen(false)}>
              {label}<span aria-hidden="true">↗</span>
            </a>
          ))}
          <a href="#brief" className="mobile-primary" onClick={() => setOpen(false)}>Empezar proyecto <span aria-hidden="true">↗</span></a>
        </nav>
      )}
    </header>
  );
}
