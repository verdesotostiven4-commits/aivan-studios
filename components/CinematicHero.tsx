"use client";

import { useEffect, useRef, useState } from "react";
import Wordmark from "./Wordmark";
import { HeroFlipWord } from "./BrandMotion";

// Fotografías editoriales de muestra: reemplazar por material aprobado de AIVAN.
const scenes = [
  { id: "set", photo: "8089662", position: "center 48%" },
  { id: "crew", photo: "36287813", position: "center 46%" },
  { id: "camera", photo: "32439173", position: "center 50%" },
] as const;
const photoUrl = (id: string, size: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${size}`;

type IntroStage = "opening" | "exit" | "done";

export default function CinematicHero() {
  const [intro, setIntro] = useState<IntroStage>("opening");
  const [heroReady, setHeroReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState([false, false, false]);
  const [inView, setInView] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const reload = navigation?.type === "reload";
    if (reload) {
      // A reload is always a fresh cinematic arrival, even after a hash link.
      if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      requestAnimationFrame(() => window.scrollTo(0, 0));
    }
    const motionOff = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(motionOff);
    if (motionOff || (!reload && location.hash)) {
      setIntro("done");
      setHeroReady(true);
      return;
    }

    document.documentElement.classList.add("cinema-intro-active");
    const timers = [
      window.setTimeout(() => setIntro("exit"), 1740),
      window.setTimeout(() => setHeroReady(true), 2220),
      window.setTimeout(() => setIntro("done"), 3070),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.documentElement.classList.remove("cinema-intro-active");
    };
  }, []);

  useEffect(() => {
    if (intro === "done") document.documentElement.classList.remove("cinema-intro-active");
  }, [intro]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (document.hidden || !inView) return;
      setCurrent((old) => {
        const next = (old + 1) % scenes.length;
        return loaded[next] ? next : old;
      });
    }, 7200);
    return () => clearInterval(id);
  }, [reduced, inView, loaded]);

  // No misleading sound toggle. A gentle one-shot brand cue is unlocked by
  // the first genuine gesture, since browsers prohibit audible autoplay.
  useEffect(() => {
    let played = false;
    const play = () => {
      if (played) return;
      try {
        const context = new AudioContext();
        void context.resume().then(() => {
          if (context.state !== "running") { void context.close(); return; }
          played = true;
          const start = context.currentTime + 0.02;
          [392, 523.25, 659.25].forEach((frequency, index) => {
            const tone = context.createOscillator();
            const volume = context.createGain();
            const t = start + index * 0.105;
            tone.type = "sine";
            tone.frequency.setValueAtTime(frequency, t);
            volume.gain.setValueAtTime(0.0001, t);
            volume.gain.exponentialRampToValueAtTime(0.012, t + 0.045);
            volume.gain.exponentialRampToValueAtTime(0.0001, t + 0.46);
            tone.connect(volume).connect(context.destination);
            tone.start(t);
            tone.stop(t + 0.49);
          });
          window.setTimeout(() => { void context.close(); }, 1100);
          window.removeEventListener("pointerdown", play);
          window.removeEventListener("keydown", play);
        }).catch(() => { void context.close(); });
      } catch { /* Web Audio is unavailable; visual experience remains intact. */ }
    };
    window.addEventListener("pointerdown", play, { passive: true });
    window.addEventListener("keydown", play);
    return () => {
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("keydown", play);
    };
  }, []);

  return (
    <>
      {intro !== "done" && (
        <div className={`brand-opening brand-opening-${intro}`} aria-label="Presentación de AIVAN STUDIOS">
          <div className="brand-opening-content">
            <Wordmark light />
            <span className="brand-opening-rule" aria-hidden="true" />
            <p>ESTUDIO CREATIVO · GALÁPAGOS</p>
          </div>
        </div>
      )}
      <section className={`cinematic-hero${heroReady ? " is-ready" : ""}`} ref={heroRef} id="inicio">
        <div className="cinema-backdrops" aria-hidden="true">
          {scenes.map((scene, index) => (
            <img
              key={scene.id}
              src={photoUrl(scene.photo, 1800)}
              srcSet={`${photoUrl(scene.photo, 900)} 900w, ${photoUrl(scene.photo, 1500)} 1500w, ${photoUrl(scene.photo, 2200)} 2200w`}
              sizes="100vw"
              className={`cinema-photo${current === index && loaded[index] ? " is-current" : ""}`}
              style={{ objectPosition: scene.position }}
              alt=""
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              decoding="async"
              draggable={false}
              onLoad={() => setLoaded((values) => values[index] ? values : values.map((value, i) => i === index ? true : value))}
              onError={() => setLoaded((values) => values.map((value, i) => i === index ? false : value))}
            />
          ))}
        </div>
        <div className="cinema-shade" aria-hidden="true" />
        <div className="cinema-copy">
          <div className="cinema-eyebrow">AIVAN STUDIOS <span /> GALÁPAGOS, ECUADOR</div>
          <h1>
            <span className="cinema-line cinema-line--white">Nacimos para</span>
            <span className="cinema-line cinema-line--color"><HeroFlipWord text="evolucionar." /></span>
          </h1>
          <p className="cinema-lead">Desde Galápagos, creamos marcas, contenido y experiencias que se adaptan, conectan y dejan huella.</p>
          <div className="cinema-actions">
            <a href="#aivan" className="cinema-cta">
              <span>Conoce AIVAN</span>
              <span className="cinema-cta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </a>
            <span className="cinema-manifesto"><i aria-hidden="true" /> Estudio<br /> Creador × Rebelde</span>
          </div>
        </div>
        <div className="cinema-counter" aria-label={`Fotografía ${current + 1} de ${scenes.length}`}>
          <strong>{String(current + 1).padStart(2, "0")}</strong><span /><small>{String(scenes.length).padStart(2, "0")}</small>
        </div>
        <span className="cinema-scroll-hint" aria-hidden="true">DESLIZA PARA EXPLORAR <span>↓</span></span>
      </section>
    </>
  );
}
