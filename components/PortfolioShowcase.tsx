"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CircularCarousel from "./CircularCarousel";

// Selección real del proceso creativo y la identidad del estudio; no se presenta como portafolio de clientes.
export const inspiration = [
  { src: "/media/gallery-idea-vertical.webp", alt: "Recreación editorial de un boceto de mascota en papel cuadriculado y lápiz", title: "Primero, una idea", subtitle: "AIBRAND · Del papel a la marca", description: "Visual editorial basado en referencias del proceso de bocetaje del equipo." },
  { src: "/media/gallery-mascot-vertical.webp", alt: "Representación visual de una ilustración digital de tortuga verde con sudadera morada", title: "Una identidad cobra vida", subtitle: "AIBRAND · Ilustración digital", description: "Representación editorial de una mascota ilustrada en una pantalla de diseño." },
  { src: "/media/gallery-levid-vertical.webp", alt: "Representación editorial de una pantalla de diseño con la identidad LeVid Galápagos y sus colores", title: "Color con intención", subtitle: "AIBRAND · Dirección visual", description: "Composición editorial de una identidad gráfica con referencias cromáticas." },
  { src: "/media/gallery-bmdance-vertical.webp", alt: "Composición editorial con variantes de la identidad BM Dance Academy", title: "Probar, diseñar, refinar", subtitle: "AIBRAND · Variantes gráficas", description: "Representación visual de distintas variantes de una identidad de marca." },
  { src: "/media/gallery-food-vertical.webp", alt: "Composición editorial de grabación gastronómica con teléfono y trípode", title: "La historia tras el contenido", subtitle: "AIMARK · Detrás de cámaras", description: "Composición editorial basada en referencias de producción gastronómica." },
  { src: "/media/gallery-production-vertical.webp", alt: "Recreación editorial de un set de grabación con cámara e iluminación", title: "El valor de cada toma", subtitle: "AIPROD · Rodaje", description: "Recreación editorial de una producción audiovisual con cámara e iluminación." },
];

export default function PortfolioShowcase() {
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const current = selected === null ? null : inspiration[selected];
  const isOpen = selected !== null;

  const openDetail = (index: number) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelected(index);
  };

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelected(null);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelected((n) => n === null ? 0 : (n + 1) % inspiration.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelected((n) => n === null ? 0 : (n - 1 + inspiration.length) % inspiration.length);
      } else if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (first && last) {
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      returnFocusRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <section className="portfolio-showcase" id="galeria" aria-labelledby="gallery-title">
      <div className="portfolio-heading" data-reveal>
        <div>
          <p className="micro-label">UNA MIRADA A LO QUE HACEMOS</p>
          <h2 id="gallery-title">Ideas para <em>explorar.</em></h2>
        </div>
        <div>
          <p>Una selección de referencias visuales que exploran diferentes posibilidades del branding, el diseño y la producción audiovisual.</p>
          <span>Seis visuales editoriales basados en referencias creativas. Desliza para explorar.</span>
        </div>
      </div>
      <div className="portfolio-carousel-wrap portfolio-arrival" data-reveal>
        <CircularCarousel
          items={inspiration}
          preset="cylinder"
          intro="rise"
          cardWidth={275}
          aspectRatio={0.8}
          gap={30}
          speed={11}
          autoplay="drift"
          pauseOnHover
          pauseOnlyOnActive
          fadeColor="#101114"
          depthFade={0.65}
          cornerRadius={20}
          captions
          onItemClick={(_item: unknown, index: number) => openDetail(index)}
        />
      </div>
      <p className="portfolio-disclaimer">Galería editorial basada en referencias compartidas por el equipo. Algunas piezas son recreaciones visuales, no fotografías documentales ni casos comerciales acreditados.</p>

      {current && typeof document !== "undefined" && createPortal(
        <div className="portfolio-modal-overlay portfolio-modal-overlay--polished" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <div ref={dialogRef} className="portfolio-modal portfolio-modal--polished" role="dialog" aria-modal="true" aria-labelledby="portfolio-modal-title" aria-describedby="portfolio-modal-description">
            <div className="portfolio-modal-image portfolio-modal-image--polished">
              <img className="portfolio-modal-image-ambient" src={current.src} alt="" aria-hidden="true" />
              <img className="portfolio-modal-image-main" src={current.src} alt={current.alt} />
              <span className="portfolio-modal-image-count">{String((selected ?? 0) + 1).padStart(2, "0")} / {String(inspiration.length).padStart(2, "0")}</span>
            </div>
            <div className="portfolio-modal-body portfolio-modal-body--polished">
              <div className="portfolio-modal-top">
                <span>ARCHIVO VISUAL AIVAN / {String((selected ?? 0) + 1).padStart(2, "0")}</span>
                <button ref={closeRef} type="button" aria-label="Cerrar ficha de imagen" onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className="portfolio-modal-text">
                <span className="portfolio-modal-kicker">{current.subtitle}</span>
                <h3 id="portfolio-modal-title">{current.title}</h3>
                <p id="portfolio-modal-description">{current.description}</p>
                <p className="portfolio-modal-note">Visual editorial basado en referencias del equipo AIVAN. No constituye una fotografía documental ni la atribución de un proyecto comercial.</p>
              </div>
              <div className="portfolio-modal-actions">
                <a href="#brief" onClick={() => setSelected(null)}>Crear algo juntos <span aria-hidden="true">↗</span></a>
                <div>
                  <button type="button" onClick={() => setSelected((n) => n === null ? 0 : (n - 1 + inspiration.length) % inspiration.length)} aria-label="Imagen anterior">←</button>
                  <button type="button" onClick={() => setSelected((n) => n === null ? 0 : (n + 1) % inspiration.length)} aria-label="Imagen siguiente">→</button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
}
