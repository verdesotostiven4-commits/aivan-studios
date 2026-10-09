"use client";

import { useEffect, useRef, useState } from "react";
import CircularCarousel from "./CircularCarousel";

// Fotografías de inspiración, a color. Nunca presentarlas como proyectos reales
// hasta que el equipo de AIVAN entregue portafolio y créditos aprobados.
export const inspiration = [
  { src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1300&q=85&auto=format&fit=crop", alt: "Luces intensas en una producción", title: "Escenas que conectan", subtitle: "Producción audiovisual", description: "Dirección de fotografía, ritmo y atmósfera: una mirada a cómo el lenguaje audiovisual construye una historia." },
  { src: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1300&q=85&auto=format&fit=crop", alt: "Composición editorial con objetos y luz natural", title: "Identidad en detalle", subtitle: "AIBRAND · Identidad", description: "Sistemas gráficos, dirección de arte y composiciones pensadas para expresar una personalidad reconocible." },
  { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1300&q=85&auto=format&fit=crop", alt: "Espacio de trabajo de diseño contemporáneo", title: "Ideas con dirección", subtitle: "AIMARK · Estrategia", description: "La estrategia conecta la idea con su audiencia y da sentido a cada mensaje y cada canal." },
  { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1300&q=85&auto=format&fit=crop", alt: "Retrato editorial con iluminación suave", title: "Retratos con historia", subtitle: "AIPROD · Fotografía", description: "La luz, la composición y la autenticidad dan a las imágenes su capacidad para comunicar." },
  { src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1300&q=85&auto=format&fit=crop", alt: "Arte abstracto lleno de color", title: "Color en movimiento", subtitle: "AIBRAND · Exploración", description: "Exploraciones de color, forma y composición que inspiran identidades visuales singulares." },
  { src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1300&q=85&auto=format&fit=crop", alt: "Cámara de cine profesional en primer plano", title: "Detrás de cada toma", subtitle: "AIPROD · Cine", description: "Pensar antes de grabar permite crear piezas que no solo se ven bien: comunican con intención." },
  { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1300&q=85&auto=format&fit=crop", alt: "Paisaje cálido al atardecer", title: "Territorio e inspiración", subtitle: "Dirección creativa", description: "La observación del entorno es el punto de partida de historias y conceptos con arraigo." },
  { src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1300&q=85&auto=format&fit=crop", alt: "Mesa creativa con computadora y materiales", title: "Ideas que evolucionan", subtitle: "AIPACKS · Integración", description: "Cuando identidad, estrategia y contenido se integran, la marca gana consistencia y espacio para crecer." },
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
          <p>Una experiencia visual para descubrir cómo conviven la identidad, la estrategia y la producción.</p>
          <span>Desliza, gira y toca una imagen para descubrir más.</span>
        </div>
      </div>
      <div className="portfolio-carousel-wrap">
        <CircularCarousel
          items={inspiration}
          preset="cylinder"
          intro="rise"
          cardWidth={250}
          aspectRatio={0.86}
          gap={30}
          speed={11}
          autoplay="drift"
          pauseOnHover
          fadeColor="#101114"
          depthFade={0.65}
          cornerRadius={20}
          captions
          onItemClick={(_item: unknown, index: number) => setSelected(index)}
        />
      </div>
      <p className="portfolio-disclaimer">Galería conceptual con fotografías de inspiración. Los proyectos oficiales de AIVAN se incorporarán próximamente.</p>

      {current && (
        <div className="portfolio-modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <div className="portfolio-modal" role="dialog" aria-modal="true" aria-label={current.title}>
            <div className="portfolio-modal-image"><img src={current.src} alt={current.alt} /></div>
            <div className="portfolio-modal-body">
              <div className="portfolio-modal-top"><span>EXPLORACIÓN VISUAL / {String((selected ?? 0) + 1).padStart(2, "0")}</span><button ref={closeRef} type="button" aria-label="Cerrar ficha de imagen" onClick={() => setSelected(null)}>✕</button></div>
              <span className="portfolio-modal-kicker">{current.subtitle}</span>
              <h3>{current.title}</h3>
              <p>{current.description}</p>
              <p className="portfolio-modal-note">Imagen referencial: no corresponde a un trabajo publicado por AIVAN.</p>
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
