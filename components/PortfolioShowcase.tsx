"use client";

import { useEffect, useRef, useState } from "react";
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
  const current = selected === null ? null : inspiration[selected];

  useEffect(() => {
    if (selected === null) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((n) => n === null ? 0 : (n + 1) % inspiration.length);
      if (event.key === "ArrowLeft") setSelected((n) => n === null ? 0 : (n - 1 + inspiration.length) % inspiration.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

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
          onItemClick={(_item: unknown, index: number) => setSelected(index)}
        />
      </div>
      <p className="portfolio-disclaimer">Archivo de procesos y material original proporcionado por el equipo. Las imágenes de diseños no implican una atribución comercial ni sustituyen los casos de estudio autorizados.</p>

      {current && (
        <div className="portfolio-modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <div className="portfolio-modal" role="dialog" aria-modal="true" aria-label={current.title}>
            <div className="portfolio-modal-image"><img src={current.src} alt={current.alt} /></div>
            <div className="portfolio-modal-body">
              <div className="portfolio-modal-top"><span>ARCHIVO VISUAL AIVAN / {String((selected ?? 0) + 1).padStart(2, "0")}</span><button ref={closeRef} type="button" aria-label="Cerrar ficha de imagen" onClick={() => setSelected(null)}>✕</button></div>
              <span className="portfolio-modal-kicker">{current.subtitle}</span>
              <h3>{current.title}</h3>
              <p>{current.description}</p>
              <p className="portfolio-modal-note">Material compartido por el equipo. No se atribuye a un proyecto comercial específico sin sus créditos.</p>
              <div className="portfolio-modal-actions">
                <a href="#brief" onClick={() => setSelected(null)}>Crear algo juntos <span aria-hidden="true">↗</span></a>
                <div>
                  <button type="button" onClick={() => setSelected((n) => n === null ? 0 : (n - 1 + inspiration.length) % inspiration.length)} aria-label="Imagen anterior">←</button>
                  <button type="button" onClick={() => setSelected((n) => n === null ? 0 : (n + 1) % inspiration.length)} aria-label="Imagen siguiente">→</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
