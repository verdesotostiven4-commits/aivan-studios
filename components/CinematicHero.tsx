"use client";

import { useEffect, useRef, useState } from "react";
import Wordmark from "./Wordmark";
import { HeroFlipWord } from "./BrandMotion";

// Placeholder stock photos (not AIVAN portfolio). Replace with approved
// project photos when the studio supplies them.
const scenes = [
  { id: "production", photo: "8089662", position: "center 49%" },
  { id: "crew", photo: "36287813", position: "center 48%" },
  { id: "camera", photo: "32439173", position: "center 50%" },
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
  const [inView, setInView] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const heroRef = useRef<HTMLElement>(null);
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
      window.setTimeout(() => setReady(true), 1410),
      window.setTimeout(() => setIntro("exit"), 1690),
      window.setTimeout(() => setIntro("done"), 2890),
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
      if (document.hidden || !inView) return;
      setCurrent((index) => {
        const next = (index + 1) % scenes.length;
        return loaded[next] ? next : index;
      });
    }, 6800);
    return () => window.clearInterval(interval);
  }, [reduced, loaded, inView]);

  const onSceneLoad = (index: number) => {
    setLoaded((old) => old[index] ? old : old.map((value, i) => i === index ? true : value));
  };
  // Only animate/change the photo while the hero is on screen.
  useEffect(() => {
    const node = heroRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "10% 0px 10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    if (audioRef.current) void audioRef.current.close();
  }, []);

  // Browsers prevent audible autoplay. Audio is enabled only by a real click.
  const toggleSound = async () => {
    if (soundOn) {
      setSoundOn(false);
      return;
    }
    try {
      const AudioCtor = window.AudioContext;
      if (!AudioCtor) return;
      if (!audioRef.current) audioRef.current = new AudioCtor();
      await audioRef.current.resume();
      setSoundOn(true);
    } catch {
      setSoundOn(false);
    }
  };

  useEffect(() => {
    const context = audioRef.current;
    if (!soundOn || !context || !inView || intro !== "done" || context.state !== "running") return;
    // Subtle two-note AIVAN signature; no external audio file or dependency.
    const start = context.currentTime + 0.01;
    [392, 587.33].forEach((frequency, i) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(i ? 0.009 : 0.016, start + 0.06 + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.72);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.76);
    });
  }, [current, soundOn, intro, inView]);

  const onSceneError = (index: number) => {
    // Prevent a missing CDN photo from blocking the entire carousel.
    setLoaded((old) => old[index] ? old : old.map((ready, i) => i === index ? false : ready));
    setCurrent((old) => old === index ? (index + 1) % scenes.length : old);
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
        </div>
      )}
      <section ref={heroRef} className={`cinematic-hero${ready ? " is-ready" : ""}`} id="inicio">
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
              onError={() => onSceneError(index)}
            />
          ))}
        </div>
        <div className="cinema-shade" aria-hidden="true" />
        <div className={`cinema-copy hero-copy${ready ? " is-visible" : ""}`}>
          <h1>
            <span className="cinema-line hero-line cinema-line--white">Nacimos para</span>
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
        <div className="cinema-footer-controls">
          <button
            type="button"
            className="cinema-sound-toggle"
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Desactivar sonido ambiental" : "Activar sonido ambiental"}
          >
            <span aria-hidden="true">{soundOn ? "♪" : "♪̸"}</span>
            {soundOn ? "Sonido activado" : "Activar sonido"}
          </button>
          <span className="cinema-temp-label">IMÁGENES TEMPORALES DE REFERENCIA</span>
        </div>
      </section>
    </>
  );
}
