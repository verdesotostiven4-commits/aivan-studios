"use client";

import { useEffect, useState } from "react";

const offerings = [
  {
    code: "01", id: "brand", name: "AIBRAND", label: "Identidad & diseño",
    headline: "La marca empieza por lo que eres.",
    copy: "Desarrollamos identidad y sistemas visuales que hacen que una marca se reconozca, se ordene y crezca con coherencia.",
    tags: ["Identidad de marca", "Diseños publicitarios", "Ilustración", "Afiches técnicos", "Modelado 3D"],
    image: "/media/brand-studios.webp",
    previews: ["/media/brand-symbol.webp", "/media/brand-studios.webp"],
  },
  {
    code: "02", id: "mark", name: "AIMARK", label: "Marketing creativo",
    headline: "Ideas que saben a dónde van.",
    copy: "Conectamos estrategia, comunidad y contenido para que la comunicación tenga un propósito claro y una ruta de crecimiento.",
    tags: ["Estrategia de contenido", "Redes sociales", "Diagnóstico", "Asesoría estratégica"],
    image: "/media/marketing-food-bts.webp",
    previews: ["/media/production-food-shot.webp", "/media/hero-location.webp"],
  },
  {
    code: "03", id: "prod", name: "AIPROD", label: "Producción audiovisual",
    headline: "Historias que merecen ser vistas.",
    copy: "Fotografía, vídeo, edición y motion con una intención detrás de cada encuadre, sonido y transición.",
    tags: ["Fotografía", "Producción audiovisual", "Edición", "Motion Graphics"],
    image: "/media/production-interview.webp",
    previews: ["/media/hero-studio.webp", "/media/hero-production.webp"],
  },
  {
    code: "04", id: "packs", name: "AIPACKS", label: "Acompañamiento creativo",
    headline: "Todo conectado. Todo con sentido.",
    copy: "Combinamos disciplinas para acompañar el crecimiento de tu negocio con una dirección compartida y continuidad.",
    tags: ["AIPACK Mini", "AIPACK Pro", "AIPACK Ultra", "Acompañamiento"],
    image: "/media/hero-production.webp",
    previews: ["/media/brand-studios.webp", "/media/production-food-shot.webp"],
  },
] as const;

export default function ServiceExplorer() {
  const [open, setOpen] = useState(0);
  useEffect(() => {
    const selectFromHash = () => { if (window.location.hash === "#aipacks") setOpen(3); };
    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    const openPacks = () => setOpen(3);
    window.addEventListener("aivan:navigate-packs", openPacks);
    return () => {
      window.removeEventListener("hashchange", selectFromHash);
      window.removeEventListener("aivan:navigate-packs", openPacks);
    };
  }, []);
  const current = offerings[open];
  return (
    <div className="service-explorer">
      <div className="service-picker" aria-label="Explorar las cuatro áreas de AIVAN">
        {offerings.map((service, index) => (
          <div className={`service-option service-option--${service.id} ${open === index ? "is-active" : ""}`} key={service.id}>
            <button type="button" onClick={() => setOpen(index)} aria-expanded={open === index} aria-controls="service-detail">
              <span className="service-option-num">{service.code}</span>
              <span className="service-option-main"><strong>{service.name}</strong><small>{service.label}</small></span>
              <span className="service-option-arrow" aria-hidden="true">{open === index ? "↗" : "↗"}</span>
            </button>
          </div>
        ))}
        <p className="service-picker-note">Cada área tiene su lenguaje. Todas trabajan hacia una misma dirección.</p>
      </div>
      <div className={`service-detail service-detail-${current.id}`} id="service-detail" role="region" aria-label={`Detalles de ${current.name}`} key={current.id}>
        <div className="service-detail-visual">
          <img className="service-detail-cover" src={current.image} alt={`Material visual del estudio para ${current.name}`} loading="lazy" />
          <div className="service-detail-visual-top"><span>ESTUDIO AIVAN / {current.code}</span><span>{current.name}</span></div>
          <div className="service-detail-miniatures">
            {current.previews.map((url, index) => <img key={url} src={url} alt={`Vista de material visual ${index + 1} para ${current.name}`} loading="lazy" />)}
          </div>
        </div>
        <div className="service-detail-info">
          <div className="service-detail-heading"><span>{current.label}</span><strong>{current.code} / 04</strong></div>
          <h3>{current.headline}</h3>
          <p>{current.copy}</p>
          <div className="service-detail-tags">{current.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="service-detail-footer"><a href="#galeria">Explorar referencias visuales <span aria-hidden="true">↗</span></a><small>Recursos facilitados por el estudio</small></div>
        </div>
      </div>
    </div>
  );
}
