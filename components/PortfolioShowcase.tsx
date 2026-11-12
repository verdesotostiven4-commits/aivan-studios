"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CircularCarousel from "./CircularCarousel";

// Selección real del proceso creativo y la identidad del estudio; no se presenta como portafolio de clientes.
export const inspiration = [
  { src: "/media/brand-sketch-process.webp", alt: "Boceto original hecho a lápiz, mostrado en el video del proceso creativo del estudio", title: "Primero, una idea", subtitle: "AIBRAND · Del papel a la marca", description: "Un fotograma auténtico del proceso de ilustración compartido por el equipo." },
  { src: "/media/gallery-authentic-mascot.webp", alt: "Pantalla original con la ilustración de una tortuga verde vestida con sudadera morada", title: "Una identidad cobra vida", subtitle: "AIBRAND · Ilustración digital", description: "Captura original del proceso de desarrollo digital de una mascota ilustrada." },
  { src: "/media/gallery-authentic-levid.webp", alt: "Pantalla real con la investigación de color para una identidad gráfica de LeVid Galápagos", title: "Color con intención", subtitle: "AIBRAND · Dirección visual", description: "Material de diseño y exploración cromática procedente del vídeo original del estudio." },
  { src: "/media/gallery-authentic-bmdance.webp", alt: "Pantalla del equipo con distintas variantes del diseño de identidad BM Dance Academy", title: "Probar, diseñar, refinar", subtitle: "AIBRAND · Variantes gráficas", description: "Diferentes aproximaciones visuales registradas en un archivo de proceso creativo." },
  { src: "/media/marketing-food-bts.webp", alt: "Persona grabando contenido gastronómico con teléfono montado en trípode", title: "La historia tras el contenido", subtitle: "AIMARK · Detrás de cámaras", description: "Fotografía del proceso de grabación de contenido gastronómico en una locación real." },
  { src: "/media/hero-production.webp", alt: "Set real de producción audiovisual con cámara e iluminación", title: "El valor de cada toma", subtitle: "AIPROD · Rodaje", description: "Material original de una sesión de grabación con iluminación y cámara." },
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
          <span>Seis registros auténticos del proceso creativo. Desliza para explorar.</span>
        </div>
      </div>
      <div className="portfolio-carousel-wrap portfolio-arrival" data-reveal>
        <CircularCarousel
          items={inspiration}
          preset="cylinder"
          intro="rise"
          cardWidth={275}
          aspectRatio={0.86}
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
      <p className="portfolio-disclaimer">Archivo de procesos y material original proporcionado por el equipo. Las imágenes de diseños no implican una atribución comercial ni sustituyen los casos de estudio autorizados.</p>

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
                <p className="portfolio-modal-note">Material original compartido por el equipo AIVAN. No se atribuye a un proyecto comercial sin autorización.</p>
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
