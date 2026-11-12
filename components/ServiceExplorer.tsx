"use client";

import { useState } from "react";

const offerings = [
  {
    code: "01", id: "brand", name: "AIBRAND", label: "Identidad & diseño",
    headline: "La marca empieza por lo que eres.",
    copy: "Desarrollamos identidad y sistemas visuales que hacen que una marca se reconozca, se ordene y crezca con coherencia.",
    tags: ["Identidad de marca", "Diseños publicitarios", "Ilustraciones", "Afiches técnicos"],
    image: "/media/brand-sketch-process.webp",
  },
  {
    code: "02", id: "mark", name: "AIMARK", label: "Marketing creativo",
    headline: "Ideas que saben a dónde van.",
    copy: "Conectamos estrategia, comunidad y contenido para que la comunicación tenga un propósito claro y una ruta de crecimiento.",
    tags: ["Asesoría estratégica", "Diagnóstico de marca", "Gestión de redes", "Estrategia de contenidos"],
    image: "/media/marketing-food-bts.webp",
  },
  {
    code: "03", id: "prod", name: "AIPROD", label: "Producción audiovisual",
    headline: "Historias que merecen ser vistas.",
    copy: "Fotografía, vídeo, edición y motion con una intención detrás de cada encuadre, sonido y transición.",
    tags: ["Fotografía profesional", "Producción de contenido", "Edición audiovisual", "Motion graphics"],
    image: "/media/hero-production.webp",
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
        <div className={`service-detail-visual service-detail-visual--${current.id}`}>
          {current.id === "brand" ? (
            <div className="service-real-composition service-real-composition--brand">
              <figure className="service-real-frame service-real-frame--process">
                <img src="/media/brand-sketch-process.webp" alt="Boceto de ilustración en desarrollo, extraído de un vídeo original del equipo" loading="lazy" />
                <figcaption>PROCESO CREATIVO / BOCETO REAL</figcaption>
              </figure>
              <figure className="service-real-frame service-real-frame--identity">
                <img src="/media/brand-studios.webp" alt="Aplicación de la identidad visual original de AIVAN STUDIOS" loading="lazy" />
                <figcaption>IDENTIDAD DEL ESTUDIO</figcaption>
              </figure>
            </div>
          ) : current.id === "mark" ? (
            <div className="service-real-composition service-real-composition--mark">
              <div className="service-real-story">
                <span>ESTRATEGIA + CONTENIDO</span>
                <strong>Ideas que se convierten en imágenes.</strong>
                <small>Proceso real · producción gastronómica</small>
              </div>
              <figure className="service-real-frame service-real-frame--portrait">
                <img src="/media/marketing-food-bts.webp" alt="Preparación y grabación real de contenido gastronómico" loading="lazy" />
                <figcaption>PREPARACIÓN</figcaption>
              </figure>
              <figure className="service-real-frame service-real-frame--portrait">
                <img src="/media/production-food-shot.webp" alt="Teléfono grabando un plato de comida durante una producción" loading="lazy" />
                <figcaption>CAPTURA</figcaption>
              </figure>
            </div>
          ) : (
            <img className="service-detail-cover service-detail-cover--authentic" src={current.image} alt="Rodaje del equipo con cámara, luces y una persona frente a cámara" loading="lazy" />
          )}
          <div className="service-detail-visual-top"><span>ARCHIVO AIVAN / {current.code}</span><span>{current.name}</span></div>
        </div>
        <div className="service-detail-info">
          <div className="service-detail-heading"><span>{current.label}</span><strong>{current.code} / 03</strong></div>
          <h3>{current.headline}</h3>
          <p>{current.copy}</p>
          <div className="service-detail-tags">{current.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="service-detail-footer"><a href="#galeria">Explorar referencias visuales <span aria-hidden="true">↗</span></a><small>Material original · sin imágenes generadas</small></div>
        </div>
      </div>
    </div>
  );
}
