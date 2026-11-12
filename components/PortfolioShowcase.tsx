"use client";

import { useEffect, useRef, useState } from "react";
import CircularCarousel from "./CircularCarousel";

// Selección real del proceso creativo y la identidad del estudio; no se presenta como portafolio de clientes.
export const inspiration = [
  { src: "/media/brand-sketch-process.webp", alt: "Mano dibujando una ilustración en una libreta, fotograma de un vídeo original", title: "Todo empieza con un boceto", subtitle: "AIBRAND · Proceso creativo", description: "Un momento real de dibujo y exploración visual del material compartido por el equipo." },
  { src: "/media/marketing-food-bts.webp", alt: "Persona grabando contenido gastronómico con teléfono y trípode", title: "Preparar la historia", subtitle: "AIMARK · Detrás de cámaras", description: "Preparación de una toma gastronómica con equipo y luz natural." },
  { src: "/media/hero-production.webp", alt: "Grabación de una entrevista con cámara, luces y un equipo de producción", title: "El rodaje", subtitle: "AIPROD · Producción", description: "Registro auténtico de una jornada de grabación con iluminación y cámara." },
  { src: "/media/production-food-shot.webp", alt: "Plano cercano de un teléfono capturando un plato de comida", title: "El detalle importa", subtitle: "AIMARK · Contenido", description: "Composición del encuadre para comunicar un producto gastronómico." },
  { src: "/media/brand-studios.webp", alt: "Versión de la identidad gráfica de AIVAN STUDIOS", title: "Nuestra identidad", subtitle: "AIBRAND · Marca propia", description: "Una muestra de los recursos gráficos que identifican al estudio." },
  { src: "/media/production-interview.webp", alt: "Set de producción con cámara, iluminación y persona frente a cámara", title: "Crear con intención", subtitle: "AIPROD · Detrás de cámara", description: "Montaje real del set durante una producción audiovisual." },
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
          <span>Seis registros originales de diseño y producción. Desliza para explorar.</span>
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
      <p className="portfolio-disclaimer">Galería conceptual con materiales de referencia y del equipo. Los proyectos oficiales de AIVAN se incorporarán próximamente.</p>

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
