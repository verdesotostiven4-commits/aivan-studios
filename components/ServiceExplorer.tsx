"use client";

import { useState } from "react";

const offerings = [
  {
    code: "01", id: "brand", name: "AIBRAND", label: "Identidad & diseño",
    headline: "La marca empieza por lo que eres.",
    copy: "Desarrollamos identidad y sistemas visuales que hacen que una marca se reconozca, se ordene y crezca con coherencia.",
    tags: ["Identidad de marca", "Diseños publicitarios", "Ilustraciones", "Afiches técnicos"],
    image: "/media/brand-studios.webp",
    previews: ["/media/brand-symbol.webp", "/media/brand-studios.webp"],
  },
  {
    code: "02", id: "mark", name: "AIMARK", label: "Marketing creativo",
    headline: "Ideas que saben a dónde van.",
    copy: "Conectamos estrategia, comunidad y contenido para que la comunicación tenga un propósito claro y una ruta de crecimiento.",
    tags: ["Asesoría estratégica", "Diagnóstico de marca", "Gestión de redes", "Estrategia de contenidos"],
    image: "/media/marketing-food-bts.webp",
    previews: ["/media/production-food-shot.webp", "/media/hero-location.webp"],
  },
  {
    code: "03", id: "prod", name: "AIPROD", label: "Producción audiovisual",
    headline: "Historias que merecen ser vistas.",
    copy: "Fotografía, vídeo, edición y motion con una intención detrás de cada encuadre, sonido y transición.",
    tags: ["Fotografía profesional", "Producción de contenido", "Edición audiovisual", "Motion graphics"],
    image: "/media/production-interview.webp",
    previews: ["/media/hero-studio.webp", "/media/hero-production.webp"],
  },
] as const;

export default function ServiceExplorer() {
  const [open, setOpen] = useState(0);
  const current = offerings[open];
  return (
    <div className="service-explorer">
      <div className="service-picker" aria-label="Explorar las tres especialidades de AIVAN">
        {offerings.map((service, index) => (
          <div className={`service-option service-option--${service.id} ${open === index ? "is-active" : ""}`} key={service.id}>
            <button type="button" onClick={() => setOpen(index)} aria-expanded={open === index} aria-controls="service-detail">
              <span className="service-option-num">{service.code}</span>
              <span className="service-option-main"><strong>{service.name}</strong><small>{service.label}</small></span>
              <span className="service-option-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        ))}
        <div className="service-picker-bottom">
          <p className="service-picker-note">Cada especialidad tiene su lenguaje. Todas trabajan hacia una misma dirección.</p>
          <a className="service-packs-link" href="#aipacks">¿Necesitas combinar servicios?<strong>Conoce AIPACKS <span aria-hidden="true">↗</span></strong></a>
        </div>
      </div>
      <div className={`service-detail service-detail-${current.id}`} id="service-detail" role="region" aria-label={`Detalles de ${current.name}`} key={current.id}>
        <div className="service-detail-visual">
          {current.id === "brand" ? (
            <div className="service-brand-composition" aria-label="Estudio gráfico de la identidad de AIVAN">
              <div className="service-brand-composition-head"><span>IDENTIDAD DE MARCA</span><span>ESTUDIO 01 / 03</span></div>
              <div className="service-brand-showcase">
                <div className="service-brand-symbol-card"><img src="/media/brand-symbol.webp" alt="Isotipo de AIVAN sobre degradado original" loading="lazy" /></div>
                <div className="service-brand-word-card">
                  <span className="service-brand-overline">ESTRATEGIA + DISEÑO</span>
                  <strong>Una marca<br /><em>con dirección.</em></strong>
                  <span className="service-brand-footline">SISTEMA VISUAL · COLOR · IDENTIDAD</span>
                </div>
              </div>
              <div className="service-brand-palette" aria-label="Paleta gráfica de AIVAN"><i/><i/><i/><i/></div>
            </div>
          ) : (
            <img className="service-detail-cover" src={current.image} alt={`Escena de producción del estudio asociada a ${current.name}`} loading="lazy" />
          )}
          <div className="service-detail-visual-top"><span>ESTUDIO AIVAN / {current.code}</span><span>{current.name}</span></div>
          {current.id !== "brand" && <div className="service-detail-miniatures">
            {current.previews.map((url, index) => <img key={url} src={url} alt={`Vista de material visual ${index + 1} para ${current.name}`} loading="lazy" />)}
          </div>}
        </div>
        <div className="service-detail-info">
          <div className="service-detail-heading"><span>{current.label}</span><strong>{current.code} / 03</strong></div>
          <h3>{current.headline}</h3>
          <p>{current.copy}</p>
          <div className="service-detail-tags">{current.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="service-detail-footer"><a href="#galeria">Explorar referencias visuales <span aria-hidden="true">↗</span></a><small>Referencias visuales del equipo</small></div>
        </div>
      </div>
    </div>
  );
}
