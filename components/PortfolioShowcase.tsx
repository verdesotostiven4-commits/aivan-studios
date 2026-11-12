"use client";

import { useEffect, useRef, useState } from "react";
import CircularCarousel from "./CircularCarousel";

// Selección real del proceso creativo y la identidad del estudio; no se presenta como portafolio de clientes.
export const inspiration = [
  { src: "/media/hero-studio.webp", alt: "Cámara de producción en una grabación de entrevista", title: "Detrás de cámara", subtitle: "AIPROD · Rodaje", description: "Preparación de cámara, luz y composición durante una producción audiovisual." },
  { src: "/media/production-food-shot.webp", alt: "Grabación de contenido gastronómico con un teléfono en soporte", title: "Contenido con intención", subtitle: "AIMARK · Contenido", description: "Una mirada a la producción de contenido para comunicar productos y experiencias." },
  { src: "/media/brand-studios.webp", alt: "Identidad gráfica multicolor de AIVAN STUDIOS", title: "Identidad AIVAN", subtitle: "AIBRAND · Identidad propia", description: "Exploración de la identidad visual del estudio: tipografía y color como parte del sistema de marca." },
  { src: "/media/hero-location.webp", alt: "Equipo grabando contenido en exteriores", title: "Historias en el territorio", subtitle: "AIPROD · Exteriores", description: "Grabación en exteriores, adaptando el encuadre y la producción a cada espacio." },
  { src: "/media/production-interview.webp", alt: "Set de entrevista con cámara e iluminación", title: "Cada toma importa", subtitle: "AIPROD · Entrevistas", description: "Organización de una producción con iluminación, cámara y puesta en escena." },
  { src: "/media/marketing-food-bts.webp", alt: "Persona realizando la grabación de un plato de comida", title: "Comunicar desde lo real", subtitle: "AIMARK · Producción de contenido", description: "Trabajo detrás de cámaras para mostrar un producto con claridad y atractivo." },
  { src: "/media/hero-production.webp", alt: "Set de producción audiovisual y equipo en estudio", title: "Crear en equipo", subtitle: "AIPROD · Proceso", description: "Producción audiovisual realizada con preparación técnica y colaboración." },
  { src: "/media/brand-symbol.webp", alt: "Símbolo circular de la marca AIVAN sobre fondo multicolor", title: "Una marca, un símbolo", subtitle: "AIBRAND · Identidad propia", description: "El isotipo de AIVAN y su interpretación dentro del universo cromático de la marca." },
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
          <p>Fotografías y recursos compartidos por el equipo que muestran parte del proceso, la identidad y el trabajo creativo del estudio.</p>
          <span>Desliza, gira y toca una imagen para descubrir más.</span>
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
      <p className="portfolio-disclaimer">Imágenes y materiales del equipo AIVAN. Esta selección documenta procesos e identidad propia; no identifica proyectos de clientes.</p>

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
