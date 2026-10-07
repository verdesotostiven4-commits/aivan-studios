"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function HeroFlipWord({ text }: { text: string }) {
  return (
    <span className="hero-flip-word" aria-label={text}>
      <span className="hero-flip-base" aria-hidden="true">
        {Array.from(text).map((char, index) => (
          <span
            className="hero-flip-char"
            key={`${char}-${index}`}
            style={{
              ["--flip-delay" as string]: `${0.18 + index * 0.07}s`,
            }}
          >
            {char === " " ? "\u00a0" : char}
          </span>
        ))}
      </span>
      <span className="hero-evolution-color" aria-hidden="true">{text}</span>
      <span className="hero-evolution-wipe" aria-hidden="true" />
    </span>
  );
}


const heroBeams = [
  { x: 8, delay: -0.6, duration: 5.8, drift: 28, tone: "orange" },
  { x: 22, delay: -3.2, duration: 6.7, drift: -18, tone: "pink" },
  { x: 42, delay: -1.4, duration: 5.4, drift: 22, tone: "violet" },
  { x: 60, delay: -4.1, duration: 7.1, drift: -24, tone: "blue" },
  { x: 76, delay: -2.5, duration: 6.1, drift: 16, tone: "pink" },
  { x: 91, delay: -5.0, duration: 7.4, drift: -14, tone: "blue" },
];

export function HeroBeams() {
  return (
    <div className="hero-beams" aria-hidden="true">
      <div className="hero-beams-field">
        {heroBeams.map((beam, index) => (
          <span
            className={`hero-beam hero-beam-${beam.tone}`}
            key={index}
            style={{
              ["--beam-x" as string]: `${beam.x}%`,
              ["--beam-delay" as string]: `${beam.delay}s`,
              ["--beam-duration" as string]: `${beam.duration}s`,
              ["--beam-drift" as string]: `${beam.drift}px`,
            }}
          >
            <i />
          </span>
        ))}
      </div>
      <div className="hero-collision-line" />
    </div>
  );
}

export function StatementMaskReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const pointerActiveRef = useRef(false);
  const currentRef = useRef({ x: 50, y: 50 });
  const targetRef = useRef({ x: 50, y: 50 });
  const [finePointer, setFinePointer] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    if (reduced) {
      node.style.setProperty("--mask-x", "50%");
      node.style.setProperty("--mask-y", "50%");
      node.style.setProperty("--mask-radius", "140vmax");
      node.classList.add("is-scroll-active", "is-scroll-complete");
      return;
    }

    let observing = false;

    const paintFromScroll = () => {
      scrollFrameRef.current = null;
      if (!observing || pointerActiveRef.current) return;

      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const raw = (viewport * 0.92 - rect.top) / (viewport * 0.78);
      const progress = Math.max(0, Math.min(1, raw));

      const ease = progress * progress * (3 - 2 * progress);
      const x = 18 + ease * 64;
      const y = 64 - ease * 26;

      let radius: number;
      if (finePointer) {
        radius = 38 + ease * 188;
      } else {
        const travel = Math.min(1, progress / 0.68);
        const travelEase = travel * travel * (3 - 2 * travel);
        const smallRadius = 28 + travelEase * 132;

        if (progress <= 0.68) {
          radius = smallRadius;
        } else {
          const expand = Math.min(1, (progress - 0.68) / 0.32);
          const expandEase = expand * expand * (3 - 2 * expand);
          const coverRadius = Math.hypot(rect.width, rect.height) * 0.72;
          radius = smallRadius + (coverRadius - smallRadius) * expandEase;
        }
      }

      node.style.setProperty("--mask-x", `${x}%`);
      node.style.setProperty("--mask-y", `${y}%`);
      node.style.setProperty("--mask-radius", `${radius}px`);
      node.style.setProperty("--mask-progress", progress.toFixed(3));
      node.classList.toggle("is-scroll-active", progress > 0.025);
      node.classList.toggle("is-scroll-complete", progress > 0.9);
    };

    const requestScrollPaint = () => {
      if (scrollFrameRef.current) return;
      scrollFrameRef.current = requestAnimationFrame(paintFromScroll);
    };

    const observer = new IntersectionObserver(([entry]) => {
      observing = entry.isIntersecting;
      if (observing) {
        window.addEventListener("scroll", requestScrollPaint, { passive: true });
        window.addEventListener("resize", requestScrollPaint);
        requestScrollPaint();
      } else {
        window.removeEventListener("scroll", requestScrollPaint);
        window.removeEventListener("resize", requestScrollPaint);
      }
    }, { rootMargin: "28% 0px 28% 0px", threshold: 0 });

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestScrollPaint);
      window.removeEventListener("resize", requestScrollPaint);
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
    };
  }, [finePointer, reduced]);

  useEffect(() => () => {
    if (pointerFrameRef.current) cancelAnimationFrame(pointerFrameRef.current);
    if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
  }, []);

  const writePointerPosition = () => {
    const node = rootRef.current;
    if (!node) return;

    const current = currentRef.current;
    const target = targetRef.current;
    current.x += (target.x - current.x) * 0.16;
    current.y += (target.y - current.y) * 0.16;

    node.style.setProperty("--mask-x", `${current.x}%`);
    node.style.setProperty("--mask-y", `${current.y}%`);
    node.style.setProperty("--mask-radius", "220px");

    if (Math.abs(target.x - current.x) > 0.08 || Math.abs(target.y - current.y) > 0.08) {
      pointerFrameRef.current = requestAnimationFrame(writePointerPosition);
    } else {
      pointerFrameRef.current = null;
    }
  };

  const schedulePointerPosition = () => {
    if (pointerFrameRef.current) return;
    pointerFrameRef.current = requestAnimationFrame(writePointerPosition);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!finePointer || reduced) return;

    const rect = event.currentTarget.getBoundingClientRect();
    pointerActiveRef.current = true;
    targetRef.current = {
      x: Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100)),
    };

    event.currentTarget.classList.add("is-mask-active", "is-pointer-active");
    schedulePointerPosition();
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!finePointer || reduced) return;

    pointerActiveRef.current = false;
    event.currentTarget.classList.remove("is-mask-active", "is-pointer-active");

    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    const raw = (viewport * 0.92 - rect.top) / (viewport * 0.78);
    const progress = Math.max(0, Math.min(1, raw));
    const ease = progress * progress * (3 - 2 * progress);

    currentRef.current = { x: 18 + ease * 64, y: 64 - ease * 26 };
    targetRef.current = currentRef.current;
    node.style.setProperty("--mask-x", `${currentRef.current.x}%`);
    node.style.setProperty("--mask-y", `${currentRef.current.y}%`);
    node.style.setProperty("--mask-radius", `${38 + ease * 188}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`statement-mask${finePointer ? " is-fine-pointer" : " is-touch-mode"}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="No empezamos publicando. Empezamos entendiendo: estrategia, contexto, dirección y propósito."
    >
      <div className="statement-mask-base" aria-hidden="true">
        <span className="statement-mask-kicker">LO QUE SE VE</span>
        <h2>No empezamos<br />publicando.</h2>
        <p>Una marca puede estar activa y aun así no tener una dirección clara.</p>
      </div>

      <div className="statement-mask-reveal" aria-hidden="true">
        <span className="statement-mask-kicker">LO QUE HAY DETRÁS</span>
        <h2>Empezamos<br /><strong>entendiendo.</strong></h2>
        <div className="statement-mask-tags">
          <span>ESTRATEGIA</span><span>CONTEXTO</span><span>DIRECCIÓN</span><span>PROPÓSITO</span>
        </div>
      </div>

      <div className="statement-mask-hint" aria-hidden="true">
        <span className="hint-desktop">SCROLL O MUEVE PARA MIRAR MÁS PROFUNDO</span>
        <span className="hint-touch">DESLIZA PARA REVELAR LO QUE HAY DETRÁS</span>
      </div>
    </div>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return reduced;
}

export function MorphWord({ words }: { words: string[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const width = useMemo(() => Math.max(...words.map((word) => word.length)), [words]);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % words.length), 3200);
    return () => window.clearInterval(timer);
  }, [reduced, words.length]);

  return (
    <span className="morph-word" style={{ ["--morph-width" as string]: `${width + 1}ch` }}>
      <span key={words[index]}>{words[index]}</span>
    </span>
  );
}

export function FlipFadeWord({ words }: { words: string[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const width = useMemo(() => Math.max(...words.map((word) => word.length)), [words]);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % words.length), 3600);
    return () => window.clearInterval(timer);
  }, [reduced, words.length]);

  return (
    <span className="flip-fade-word" style={{ ["--flipfade-width" as string]: `${width + 1}ch` }}>
      <span key={words[index]}>{words[index]}</span>
    </span>
  );
}

export function TypingSignal({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState("");

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setStarted(true);
      observer.disconnect();
    }, { threshold: 0.45 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!started) return;
    if (reduced) {
      setVisible(text);
      return;
    }
    let index = 0;
    setVisible("");
    const tick = () => {
      index += 1;
      setVisible(text.slice(0, index));
      if (index < text.length) {
        const char = text[index - 1];
        const wait = char === " " ? 24 : char === "→" ? 125 : 38 + (index % 4) * 14;
        window.setTimeout(tick, wait);
      }
    };
    const timer = window.setTimeout(tick, 260);
    return () => window.clearTimeout(timer);
  }, [started, reduced, text]);

  return (
    <span ref={ref} className="typing-signal" aria-label={text}>
      <span aria-hidden="true">&gt;&nbsp;{visible}</span><i aria-hidden="true" />
    </span>
  );
}
