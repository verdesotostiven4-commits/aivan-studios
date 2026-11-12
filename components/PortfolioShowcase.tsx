"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Imágenes reales y capturas de procesos autorizadas por el equipo.
// Los diseños se muestran íntegros: no recortamos las identidades gráficas.
export const inspiration = [
  { src: "/media/brand-sketch-process.webp", kind: "design", alt: "Boceto original hecho a lápiz, mostrado en el vídeo del proceso creativo del estudio", title: "Primero, una idea", subtitle: "AIBRAND · Del papel a la marca", description: "Un fotograma auténtico del proceso de ilustración compartido por el equipo." },
  { src: "/media/gallery-authentic-mascot.webp", kind: "design", alt: "Pantalla original con la ilustración de una tortuga verde vestida con sudadera morada", title: "Una identidad cobra vida", subtitle: "AIBRAND · Ilustración digital", description: "Captura original del proceso de desarrollo digital de una mascota ilustrada." },
  { src: "/media/gallery-authentic-levid.webp", kind: "design", alt: "Pantalla real con la investigación de color para una identidad gráfica de LeVid Galápagos", title: "Color con intención", subtitle: "AIBRAND · Dirección visual", description: "Material de diseño y exploración cromática procedente del vídeo original del estudio." },
  { src: "/media/gallery-authentic-bmdance.webp", kind: "design", alt: "Pantalla del equipo con distintas variantes del diseño de identidad BM Dance Academy", title: "Probar, diseñar, refinar", subtitle: "AIBRAND · Variantes gráficas", description: "Diferentes aproximaciones visuales registradas en un archivo del proceso creativo." },
  { src: "/media/marketing-food-bts.webp", kind: "photo", alt: "Persona grabando contenido gastronómico con teléfono montado en trípode", title: "La historia tras el contenido", subtitle: "AIMARK · Detrás de cámaras", description: "Fotografía del proceso de grabación de contenido gastronómico en una locación real." },
  { src: "/media/hero-production.webp", kind: "photo", alt: "Set real de producción audiovisual con cámara e iluminación", title: "El valor de cada toma", subtitle: "AIPROD · Rodaje", description: "Material original de una sesión de grabación con iluminación y cámara." },
] as const;

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export default function PortfolioShowcase() {
  const [selected, setSelected] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);
  const railRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const current = selected === null ? null : inspiration[selected];
  const isOpen = selected !== null;

  const openDetail = (index: number) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelected(index);
  };

  useEffect(() => {
    if (!isOpen) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelected(null);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelected((index) => index === null ? 0 : (index + 1) % inspiration.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelected((index) => index === null ? 0 : (index + inspiration.length - 1) % inspiration.length);
      } else if (event.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'));
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [isOpen]);

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const first = rail.querySelector<HTMLElement>(".portfolio-flat-card");
    if (!first) return;
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 18;
    const distance = first.getBoundingClientRect().width + gap;
    rail.scrollBy({ left: direction * distance, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  const onRailScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    const first = rail.querySelector<HTMLElement>(".portfolio-flat-card");
    if (!first) return;
    const distance = first.getBoundingClientRect().width + (Number.parseFloat(getComputedStyle(rail).columnGap) || 18);
    setActive(Math.max(0, Math.min(inspiration.length - 1, Math.round(rail.scrollLeft / distance))));
    setCanScrollBack(rail.scrollLeft > 4);
    setCanScrollForward(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4);
  };

  const modal = current && (
    <div className="portfolio-modal-overlay portfolio-modal-overlay--refined" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
      <div className="portfolio-modal portfolio-modal--refined" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="portfolio-detail-title" aria-describedby="portfolio-detail-description">
        <div className={"portfolio-modal-image portfolio-modal-image--" + current.kind}>
          <img className="portfolio-modal-ambient" src={current.src} alt="" aria-hidden="true" />
          <img className="portfolio-modal-artwork" src={current.src} alt={current.alt} />
        </div>
        <div className="portfolio-modal-body">
          <div className="portfolio-modal-top">
            <span>ARCHIVO VISUAL AIVAN · {formatIndex(selected ?? 0)} / {String(inspiration.length).padStart(2, "0")}</span>
            <button ref={closeRef} type="button" aria-label="Cerrar imagen" onClick={() => setSelected(null)}>×</button>
          </div>
          <div className="portfolio-modal-copy">
            <span className="portfolio-modal-kicker">{current.subtitle}</span>
            <h3 id="portfolio-detail-title">{current.title}</h3>
            <p id="portfolio-detail-description">{current.description}</p>
            <p className="portfolio-modal-note">Material auténtico compartido por el estudio. No se atribuye a un proyecto comercial sin autorización.</p>
          </div>
          <div className="portfolio-modal-actions">
            <a href="#brief" onClick={() => setSelected(null)}>Hablemos de tu proyecto <span aria-hidden="true">↗</span></a>
            <div className="portfolio-modal-nav">
              <button type="button" aria-label="Imagen anterior" onClick={() => setSelected((index) => index === null ? 0 : (index + inspiration.length - 1) % inspiration.length)}>←</button>
              <button type="button" aria-label="Imagen siguiente" onClick={() => setSelected((index) => index === null ? 0 : (index + 1) % inspiration.length)}>→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="portfolio-showcase portfolio-showcase--flat" id="galeria" aria-labelledby="gallery-title">
      <div className="portfolio-heading" data-reveal>
        <div>
          <p className="micro-label">UNA MIRADA A LO QUE HACEMOS</p>
          <h2 id="gallery-title">Ideas para <em>explorar.</em></h2>
        </div>
        <div>
          <p>Una selección de referencias visuales que exploran diferentes posibilidades del branding, el diseño y la producción audiovisual.</p>
          <span>Seis registros auténticos del proceso creativo. Explora sus detalles.</span>
        </div>
      </div>

      <div className="portfolio-flat-gallery">
        <ul className="portfolio-flat-track" ref={railRef} onScroll={onRailScroll} aria-label="Galería de imágenes del estudio">
          {inspiration.map((item, index) => (
            <li className="portfolio-flat-card" key={item.src}>
              <button className="portfolio-flat-card-button" type="button" onClick={() => openDetail(index)} aria-label={"Abrir " + item.title}>
                <span className={"portfolio-flat-image portfolio-flat-image--" + item.kind}>
                  <img src={item.src} alt={item.alt} loading={index < 3 ? "eager" : "lazy"} />
                </span>
                <span className="portfolio-flat-card-meta">
                  <span className="portfolio-flat-card-count">{formatIndex(index)} / {String(inspiration.length).padStart(2, "0")}</span>
                  <span className="portfolio-flat-card-label">{item.subtitle}</span>
                  <strong>{item.title}</strong>
                  <span className="portfolio-flat-card-more">Ver en detalle <span aria-hidden="true">↗</span></span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="portfolio-flat-controls">
          <p>DESLIZA PARA EXPLORAR <span aria-hidden="true">→</span></p>
          <div>
            <span className="portfolio-flat-pagination" aria-live="polite">{formatIndex(active)} / {String(inspiration.length).padStart(2, "0")}</span>
            <button type="button" aria-label="Desplazar galería a la izquierda" onClick={() => moveRail(-1)} disabled={!canScrollBack}>←</button>
            <button type="button" aria-label="Desplazar galería a la derecha" onClick={() => moveRail(1)} disabled={!canScrollForward}>→</button>
          </div>
        </div>
      </div>
      <p className="portfolio-disclaimer">Archivo visual original proporcionado por el equipo. Los diseños mostrados no constituyen necesariamente casos comerciales autorizados.</p>
      {isOpen && typeof document !== "undefined" && createPortal(modal, document.body)}
    </section>
  );
}
