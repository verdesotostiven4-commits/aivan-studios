"use client";

import { useEffect, useRef, useState } from "react";
import Wordmark from "./Wordmark";
import { HeroFlipWord } from "./BrandMotion";

// Placeholder stock photos (not AIVAN portfolio). Replace with approved
// project photos when the studio supplies them.
const scenes = [
  { id: "production", photo: "32610376", position: "center 47%" },
  { id: "crew", photo: "36287813", position: "center 48%" },
  { id: "camera", photo: "8799983", position: "center 50%" },
] as const;
const imageUrl = (photo: string, width: number) =>
  `https://images.pexels.com/photos/${photo}/pexels-photo-${photo}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

type Intro = "opening" | "exit" | "done";

export default function CinematicHero() {
  const [intro, setIntro] = useState<Intro>("opening");
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>([false, false, false]);
  const [reduced, setReduced] = useState(false);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(motionOff);
    const navigation = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navigation?.type === "reload" && window.location.hash) {
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
      window.scrollTo(0, 0);
    }
    if (motionOff || (navigation?.type !== "reload" && window.location.hash)) {
      setIntro("done");
      setReady(true);
      return;
    }
    document.documentElement.classList.add("cinema-intro-active");
    timeouts.current = [
      window.setTimeout(() => setReady(true), 750),
      window.setTimeout(() => setIntro("exit"), 1020),
      window.setTimeout(() => setIntro("done"), 1820),
    ];
    return () => {
      timeouts.current.forEach((id) => window.clearTimeout(id));
      document.documentElement.classList.remove("cinema-intro-active");
    };
  }, []);

  useEffect(() => {
    if (intro === "done") document.documentElement.classList.remove("cinema-intro-active");
  }, [intro]);

  useEffect(() => {
    if (reduced) return;
    const interval = window.setInterval(() => {
      if (document.hidden) return;
      setCurrent((index) => {
        const next = (index + 1) % scenes.length;
        return loaded[next] ? next : index;
      });
    }, 6800);
    return () => window.clearInterval(interval);
  }, [reduced, loaded]);

  const onSceneLoad = (index: number) => {
    setLoaded((old) => old[index] ? old : old.map((value, i) => i === index ? true : value));
  };
  const skip = () => {
    timeouts.current.forEach((id) => window.clearTimeout(id));
    setReady(true);
    setIntro("done");
  };

  return (
    <>
      {intro !== "done" && (
        <div className={`brand-opening brand-opening-${intro}`} aria-label="Presentación AIVAN STUDIOS">
          <div className="brand-opening-content">
            <Wordmark light />
            <span className="brand-opening-rule" aria-hidden="true" />
            <p>ESTUDIO CREATIVO · GALÁPAGOS</p>
          </div>
          <button type="button" className="brand-opening-skip" onClick={skip}>
            Saltar intro <span aria-hidden="true">↗</span>
          </button>
        </div>
      )}
      <section className={`cinematic-hero${ready ? " is-ready" : ""}`} id="inicio">
        <div className="cinema-backdrops" aria-hidden="true">
          {scenes.map((scene, index) => (
            <img
              key={scene.id}
              src={imageUrl(scene.photo, 1800)}
              srcSet={`${imageUrl(scene.photo, 900)} 900w, ${imageUrl(scene.photo, 1500)} 1500w, ${imageUrl(scene.photo, 2200)} 2200w`}
              sizes="100vw"
              className={`cinema-photo${current === index && loaded[index] ? " is-current" : ""}`}
              style={{ objectPosition: scene.position }}
              alt=""
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              decoding="async"
              draggable={false}
              onLoad={() => onSceneLoad(index)}
            />
          ))}
        </div>
        <div className="cinema-shade" aria-hidden="true" />
        <div className={`cinema-copy hero-copy${ready ? " is-visible" : ""}`}>
          <h1>
            <span className="cinema-line hero-line">Nacimos para</span>
            <span className="cinema-line hero-line"><HeroFlipWord text="evolucionar." /></span>
          </h1>
          <p className="cinema-lead hero-lead">
            Desde Galápagos, creamos marcas, contenido y experiencias que se adaptan, conectan y dejan huella.
          </p>
          <div className="cinema-actions hero-actions">
            <a href="#aivan" className="cinema-cta">Conoce AIVAN <span aria-hidden="true">→</span></a>
            <span className="cinema-manifesto"><i aria-hidden="true" />Estudio<br />Creador × Rebelde</span>
          </div>
        </div>
        <div className="cinema-counter" aria-label={`Fotografía ${current+1} de ${scenes.length}`}>
          <span>{String(current + 1).padStart(2, "0")}</span><i /><small>0{scenes.length}</small>
        </div>
        <span className="cinema-temp-label">IMÁGENES TEMPORALES DE REFERENCIA</span>
      </section>
    </>
  );
}
