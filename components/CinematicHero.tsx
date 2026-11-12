"use client";

import { useEffect, useRef, useState } from "react";
import Wordmark from "./Wordmark";
import { HeroFlipWord } from "./BrandMotion";

// Secuencia editorial auténtica. Los fotogramas y fotografías son originales
// del equipo; los diseños panorámicos solo combinan esas imágenes sin recrear rostros.
const scenes = [
  { id: "studio", src: "/media/hero-authentic-studio.webp", position: "center 48%" },
  { id: "outdoors", src: "/media/hero-authentic-location.webp", position: "right 50%" },
  { id: "food", src: "/media/hero-authentic-food.webp", position: "right 50%" },
] as const;

type IntroStage = "opening" | "exit" | "done";

export default function CinematicHero() {
  const [intro, setIntro] = useState<IntroStage>("opening");
  const [heroReady, setHeroReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(() => scenes.map(() => false));
  const [failed, setFailed] = useState<boolean[]>(() => scenes.map(() => false));
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

  // Load the next frames eagerly. Lazy background images previously kept the
  // sequence waiting forever on a slide that had never been requested.
  useEffect(() => {
    let live = true;
    const preloaders = scenes.map((scene, index) => {
      const image = new Image();
      image.onload = () => {
        if (!live) return;
        setLoaded((previous) => previous.map((ready, i) => i === index ? true : ready));
      };
      image.onerror = () => {
        if (!live) return;
        setFailed((previous) => previous.map((failedBefore, i) => i === index ? true : failedBefore));
      };
      image.src = scene.src;
      return image;
    });
    return () => {
      live = false;
      preloaders.forEach((image) => { image.onload = null; image.onerror = null; });
    };
  }, []);

  // Every visit starts at scene 01. A slide is shown for a full interval,
  // then the sequence loops 01 -> 02 -> 03 -> 01 without getting stuck.
  useEffect(() => {
    if (reduced || !heroReady || !inView) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setCurrent((previous) => {
        for (let step = 1; step <= scenes.length; step += 1) {
          const next = (previous + step) % scenes.length;
          if (loaded[next] && !failed[next]) return next;
        }
        return previous;
      });
    }, 6700);
    return () => window.clearInterval(timer);
  }, [reduced, heroReady, inView, loaded, failed]);

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
      <section className={`cinematic-hero${heroReady ? " is-ready" : ""}${inView ? " is-in-viewport" : ""}`} ref={heroRef} id="inicio">
        <div className="cinema-backdrops" aria-hidden="true">
          {scenes.map((scene, index) => (
            <img
              key={scene.id}
              src={scene.src}
              className={`cinema-photo${current === index && loaded[index] ? " is-current" : ""}`}
              style={{ objectPosition: scene.position }}
              alt=""
              loading="eager"
              fetchPriority={index === 0 ? "high" : "low"}
              decoding="async"
              draggable={false}
              onLoad={() => setLoaded((values) => values[index] ? values : values.map((value, i) => i === index ? true : value))}
              onError={() => setFailed((values) => values.map((value, i) => i === index ? true : value))}
            />
          ))}
        </div>
        <div className="cinema-shade" aria-hidden="true" />
        <div className="cinema-copy">
          <div className="cinema-eyebrow">AIVAN STUDIOS <span /> GALÁPAGOS, ECUADOR</div>
          <h1>
            <span className="cinema-line cinema-line--white">Tu negocio no necesita</span>
            <span className="cinema-line cinema-line--white">un cambio. Necesita</span>
            <span className="cinema-line cinema-line--color"><HeroFlipWord text="evolucionar." /></span>
          </h1>
          <p className="cinema-lead">Impulsamos negocios y marcas de Galápagos con estrategia, branding y producción audiovisual, creando soluciones que responden a lo que realmente necesitan.</p>
          <div className="cinema-actions">
            <a href="#brief" className="cinema-cta">
              <span>Analizar mi negocio</span>
              <span className="cinema-cta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </a>
            <a className="cinema-secondary-cta" href="#servicios">Explorar servicios <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="cinema-counter" aria-label={`Fotografía ${current + 1} de ${scenes.length}`}>
          <strong>{String(current + 1).padStart(2, "0")}</strong><span /><small>{String(scenes.length).padStart(2, "0")}</small>
          <div className="cinema-slide-select" aria-label="Elegir fotografía de portada">
            {scenes.map((scene, index) => (
              <button
                type="button"
                key={scene.id}
                className={index === current ? "is-active" : ""}
                aria-label={`Ver fotografía ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
                disabled={!loaded[index] || failed[index]}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>
        <span className="cinema-scroll-hint" aria-hidden="true">DESLIZA PARA EXPLORAR <span>↓</span></span>
      </section>
    </>
  );
}
