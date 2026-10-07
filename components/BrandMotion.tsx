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
  const rootRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(true);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setLive(entry.isIntersecting),
      { threshold: 0, rootMargin: "12% 0px 12% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={`hero-beams${live ? " is-live" : ""}`} aria-hidden="true">
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

export function HeroMediaFrame() {
  const rootRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const [live, setLive] = useState(true);
  const [posterReady, setPosterReady] = useState(false);
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroReady(true), 360);
    return () => window.clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    const image = posterRef.current;
    if (!image) return;

    if (image.complete) {
      setPosterReady(true);
      return;
    }

    const preload = new Image();
    const settle = () => setPosterReady(true);
    preload.onload = settle;
    preload.onerror = settle;
    preload.src = image.currentSrc || image.src;

    const fallback = window.setTimeout(settle, 2200);
    return () => {
      preload.onload = null;
      preload.onerror = null;
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setLive(entry.isIntersecting),
      { threshold: 0, rootMargin: "10% 0px 10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`hero-media-shell${live ? " is-live" : ""}${posterReady ? " is-poster-ready" : ""}${introReady ? " is-entered" : ""}`}
      aria-label="Espacio preparado para el próximo brand reel de AIVAN"
    >
      <div className="hero-media-glow" aria-hidden="true" />

      <div className="hero-media-card">
        <div className="hero-media-top">
          <span className="hero-media-brand">AIVAN <small>STUDIOS</small></span>
          <span className="hero-media-status">BRAND REEL / 01</span>
        </div>

        <div className="hero-media-art" aria-hidden="true">
          <img
            ref={posterRef}
            className="hero-media-poster"
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjXv6QFj4xInRqf_Sgvoo_PL-nXcRqTBiGVcoXiMvgcFeO3yzb_5nfNbvM2VKgsgT8mEyhOdTn949-qc4sv9KHhts4pv6C8nJGovQTUUHrhcmiTg-E32-swkm3PINLNQin_qP8xwef8xJb4ab5uI9RI-4JOhxWBcnlSq_Sn0REi_2n7Uba62Ovpi2fpDaA/s1600/image.png"
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="high"
            draggable={false}
            onLoad={() => setPosterReady(true)}
            onError={() => setPosterReady(true)}
          />
          <img
            className="hero-media-poster-echo"
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjXv6QFj4xInRqf_Sgvoo_PL-nXcRqTBiGVcoXiMvgcFeO3yzb_5nfNbvM2VKgsgT8mEyhOdTn949-qc4sv9KHhts4pv6C8nJGovQTUUHrhcmiTg-E32-swkm3PINLNQin_qP8xwef8xJb4ab5uI9RI-4JOhxWBcnlSq_Sn0REi_2n7Uba62Ovpi2fpDaA/s1600/image.png"
            alt=""
            loading="eager"
            decoding="async"
            draggable={false}
          />
          <span className="hero-media-poster-light" />
          <span className="hero-media-poster-sheen" />
        </div>

        <div className="hero-media-chip hero-media-chip-left">
          <i />
          <span>Estrategia<br />Creatividad<br />Producción</span>
        </div>

        <div className="hero-media-chip hero-media-chip-right">
          <span className="hero-chip-bars" aria-hidden="true"><i /><i /><i /></span>
          <span>Marcas que<br />conectan de verdad.</span>
        </div>

        <span className="hero-media-play" aria-hidden="true">
          <i />
        </span>

        <div className="hero-media-controls" aria-hidden="true">
          <span className="hero-control-play">▶</span>
          <span className="hero-control-label">VIDEO EN PREPARACIÓN</span>
          <span className="hero-control-track"><i /></span>
          <span className="hero-control-tag">AIVAN / REEL</span>
        </div>
      </div>
    </div>
  );
}

export function StatementMaskReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const returnTimerRef = useRef<number | null>(null);
  const engagedRef = useRef(false);
  const lensLiveRef = useRef(false);
  const currentRef = useRef({ x: 50, y: 50 });
  const targetRef = useRef({ x: 50, y: 50 });
  const [finePointer, setFinePointer] = useState(false);
  const [inView, setInView] = useState(false);
  const [touchExpanded, setTouchExpanded] = useState(false);
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
    if (!node || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (!entry.isIntersecting) {
        engagedRef.current = false;
        lensLiveRef.current = false;
        node.classList.remove("is-mask-active", "is-pointer-active", "is-lens-live", "is-returning");
      }
    }, { threshold: 0.18, rootMargin: "10% 0px 10% 0px" });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const clearReturnTimer = () => {
    if (returnTimerRef.current) {
      window.clearTimeout(returnTimerRef.current);
      returnTimerRef.current = null;
    }
  };

  const releaseLens = () => {
    if (!finePointer || reduced) return;
    const node = rootRef.current;
    if (!node) return;

    engagedRef.current = false;
    lensLiveRef.current = false;
    node.classList.remove("is-mask-active", "is-pointer-active", "is-lens-live");
    node.classList.add("is-returning");

    clearReturnTimer();
    returnTimerRef.current = window.setTimeout(() => {
      node.classList.remove("is-returning");
      returnTimerRef.current = null;
    }, 720);
  };

  useEffect(() => {
    if (!finePointer || reduced || !inView) return;

    const closeOnScroll = () => {
      if (engagedRef.current) releaseLens();
    };

    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, [finePointer, reduced, inView]);

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    clearReturnTimer();
  }, []);

  const writePosition = () => {
    const node = rootRef.current;
    if (!node) return;

    const current = currentRef.current;
    const target = targetRef.current;
    current.x += (target.x - current.x) * 0.115;
    current.y += (target.y - current.y) * 0.115;

    node.style.setProperty("--mask-x", `${current.x}%`);
    node.style.setProperty("--mask-y", `${current.y}%`);

    const distance = Math.hypot(target.x - current.x, target.y - current.y);
    if (engagedRef.current && !lensLiveRef.current && distance < 9) {
      lensLiveRef.current = true;
      node.classList.add("is-mask-active", "is-lens-live");
    }

    if (Math.abs(target.x - current.x) > 0.08 || Math.abs(target.y - current.y) > 0.08) {
      frameRef.current = requestAnimationFrame(writePosition);
    } else {
      frameRef.current = null;
    }
  };

  const schedulePosition = () => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(writePosition);
  };

  const setTargetFromPointer = (clientX: number, clientY: number) => {
    const node = rootRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    targetRef.current = {
      x: Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100)),
    };
    schedulePosition();
  };

  const engageFromAnywhere = (clientX: number, clientY: number) => {
    if (!finePointer || reduced) return;
    const node = rootRef.current;
    const orb = orbRef.current;
    if (!node || !orb) return;

    clearReturnTimer();

    if (!engagedRef.current) {
      const nodeRect = node.getBoundingClientRect();
      const orbRect = orb.getBoundingClientRect();
      currentRef.current = {
        x: Math.max(0, Math.min(100, (((orbRect.left + orbRect.width / 2) - nodeRect.left) / nodeRect.width) * 100)),
        y: Math.max(0, Math.min(100, (((orbRect.top + orbRect.height / 2) - nodeRect.top) / nodeRect.height) * 100)),
      };
      node.style.setProperty("--mask-x", `${currentRef.current.x}%`);
      node.style.setProperty("--mask-y", `${currentRef.current.y}%`);
    }

    engagedRef.current = true;
    node.classList.remove("is-returning");
    node.classList.add("is-pointer-active");
    setTargetFromPointer(clientX, clientY);
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    engageFromAnywhere(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!finePointer || reduced) return;
    if (!engagedRef.current) {
      engageFromAnywhere(event.clientX, event.clientY);
      return;
    }
    setTargetFromPointer(event.clientX, event.clientY);
  };

  const handlePointerLeave = () => {
    releaseLens();
  };

  const handleTouchToggle = () => {
    if (finePointer || reduced) return;
    setTouchExpanded((value) => !value);
  };

  return (
    <div
      ref={rootRef}
      className={`statement-mask${finePointer ? " is-fine-pointer" : " is-touch-mode"}${inView ? " is-orb-visible" : ""}${touchExpanded ? " is-touch-expanded" : ""}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleTouchToggle}
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

      <span ref={orbRef} className="statement-orb" aria-hidden="true">
        <i className="statement-orb-core" />
        <i className="statement-orb-ring" />
        <i className="statement-orb-spark spark-a" />
        <i className="statement-orb-spark spark-b" />
      </span>

      <div className="statement-mask-hint" aria-hidden="true">
        <span className="hint-desktop">MUEVE EL CURSOR PARA MIRAR MÁS PROFUNDO</span>
        <span className="hint-touch">{touchExpanded ? "TOCA PARA VOLVER" : "TOCA PARA DESCUBRIR"}</span>
      </div>
    </div>
  );
}

function BridgeMotionGlyph() {
  return (
    <span className="bridge-motion-glyph" aria-hidden="true">
      <svg viewBox="0 0 40 40" role="presentation">
        <circle className="bridge-glyph-ghost" cx="20" cy="20" r="14" />
        <circle className="bridge-glyph-dash" cx="20" cy="20" r="14" pathLength="360" />
        <circle className="bridge-glyph-spin" cx="20" cy="20" r="9" pathLength="360" />
      </svg>
    </span>
  );
}

export function BridgeSequence() {
  const rootRef = useRef<HTMLDivElement>(null);
  const hitTimerRef = useRef<number | null>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [hitIndex, setHitIndex] = useState<number | null>(null);
  const [bursts, setBursts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting && entry.intersectionRatio > 0.2);
    }, {
      threshold: [0, 0.2, 0.42],
      rootMargin: "-6% 0px -10% 0px",
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setStep(7);
      setExiting(false);
      return;
    }

    if (!inView) {
      setStep(0);
      setExiting(false);
      return;
    }

    setStep(0);
    setExiting(false);

    const beats: Array<[number, () => void]> = [
      [140, () => setStep(1)],
      [620, () => setStep(2)],
      [980, () => setStep(3)],
      [1460, () => setStep(4)],
      [1820, () => setStep(5)],
      [2300, () => setStep(6)],
      [2660, () => setStep(7)],
      [5000, () => setExiting(true)],
      [5650, () => {
        setStep(0);
        setExiting(false);
      }],
      [6250, () => setCycle((value) => value + 1)],
    ];

    const timers = beats.map(([delay, action]) => window.setTimeout(action, delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [inView, reduced, cycle]);

  useEffect(() => () => {
    if (hitTimerRef.current) window.clearTimeout(hitTimerRef.current);
  }, []);

  const cardActive = (index: number) => step >= index * 2 + 1;
  const arrowActive = (index: number) => step >= index * 2 + 2;
  const progress = step <= 1 ? 0 : Math.min(1, (step - 1) / 6);

  const triggerCard = (index: number) => {
    if (reduced || exiting || !cardActive(index)) return;

    setBursts((current) => current.map((value, itemIndex) => itemIndex === index ? value + 1 : value));
    setHitIndex(null);

    window.requestAnimationFrame(() => {
      setHitIndex(index);
      if (hitTimerRef.current) window.clearTimeout(hitTimerRef.current);
      hitTimerRef.current = window.setTimeout(() => {
        setHitIndex((current) => current === index ? null : current);
        hitTimerRef.current = null;
      }, 620);
    });
  };

  const renderCard = (
    index: number,
    nodeClass: string,
    title: string,
    subtitle: string,
  ) => (
    <button
      type="button"
      className={`bridge-node ${nodeClass} bridge-flow-card${cardActive(index) ? " is-active" : ""}${hitIndex === index ? " is-hit" : ""}`}
      style={{ ["--flow-i" as string]: index }}
      onClick={() => triggerCard(index)}
      aria-label={`${title}: ${subtitle}. Activar interacción visual.`}
    >
      <span className="bridge-node-index">0{index + 1}</span>
      <BridgeMotionGlyph />
      <strong>{title}</strong>
      <small>{subtitle}</small>
      {bursts[index] > 0 && <span key={bursts[index]} className="bridge-click-burst" aria-hidden="true" />}
    </button>
  );

  return (
    <div
      ref={rootRef}
      className={`bridge-visual bridge-sequence${inView ? " is-flowing" : ""}${exiting ? " is-exiting" : ""}${reduced ? " is-reduced" : ""}`}
      style={{ ["--flow-progress" as string]: progress }}
      aria-label="Marca conduce a estrategia, estrategia a contenido y contenido a resultado."
    >
      <div className="bridge-flow-track" aria-hidden="true"><i /></div>
      <div className="bridge-flow-content">
        {renderCard(0, "node-a", "MARCA", "Se reconoce")}
        <span className={`bridge-flow-arrow${arrowActive(0) ? " is-active" : ""}`} style={{ ["--flow-i" as string]: 0 }} aria-hidden="true">→</span>

        {renderCard(1, "node-b", "ESTRATEGIA", "Encuentra foco")}
        <span className={`bridge-flow-arrow${arrowActive(1) ? " is-active" : ""}`} style={{ ["--flow-i" as string]: 1 }} aria-hidden="true">→</span>

        {renderCard(2, "node-c", "CONTENIDO", "Demuestra valor")}
        <span className={`bridge-flow-arrow${arrowActive(2) ? " is-active" : ""}`} style={{ ["--flow-i" as string]: 2 }} aria-hidden="true">→</span>

        {renderCard(3, "node-d", "RESULTADO", "Hace avanzar")}
      </div>
    </div>
  );
}

export function FinchSignature() {
  const rootRef = useRef<HTMLElement>(null);
  const jumpTimerRef = useRef<number | null>(null);
  const [inView, setInView] = useState(false);
  const [stage, setStage] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [burst, setBurst] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08, rootMargin: "12% 0px 12% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setStage(3);
      return;
    }
    if (!inView || stage >= 3) return;

    const delays = [2300, 1050, 2600];
    const timer = window.setTimeout(() => {
      setBurst((value) => value + 1);
      setStage((value) => Math.min(3, value + 1));
    }, delays[stage]);

    return () => window.clearTimeout(timer);
  }, [inView, reduced, stage]);

  useEffect(() => () => {
    if (jumpTimerRef.current) window.clearTimeout(jumpTimerRef.current);
  }, []);

  const interact = () => {
    if (reduced) return;

    if (stage < 3) {
      setBurst((value) => value + 1);
      setStage((value) => Math.min(3, value + 1));
      return;
    }

    setBurst((value) => value + 1);
    setJumping(false);
    window.requestAnimationFrame(() => {
      setJumping(true);
      if (jumpTimerRef.current) window.clearTimeout(jumpTimerRef.current);
      jumpTimerRef.current = window.setTimeout(() => {
        setJumping(false);
        jumpTimerRef.current = null;
      }, 760);
    });
  };

  const stageLabel = stage === 0
    ? "Romper el cascarón"
    : stage === 1
      ? "Ayudar al pinzón a salir"
      : stage === 2
        ? "Acelerar su evolución"
        : "Hacer saltar al pinzón";

  return (
    <section
      ref={rootRef}
      className={`finch-signature finch-evolution${inView ? " is-finch-visible" : ""}`}
      data-finch-stage={stage}
      aria-label="Evolución visual del pinzón de AIVAN desde Galápagos"
    >
      <div className="finch-signature-copy">
        <span>DESDE GALÁPAGOS</span>
        <strong>Una mirada que observa, adapta y evoluciona.</strong>
      </div>

      <div className="finch-stage">
        <div className="finch-track" aria-hidden="true">
          <i /><i /><i />
          <span className="finch-progress-dot dot-one" />
          <span className="finch-progress-dot dot-two" />
          <span className="finch-progress-dot dot-three" />
        </div>

        <div className={`finch-roamer finch-evolution-roamer stage-${stage}`}>
          <button
            type="button"
            className="finch-evolution-button"
            onClick={interact}
            aria-label={stageLabel}
          >
            <span className="finch-egg-glow" aria-hidden="true" />

            <span className="finch-egg" aria-hidden="true">
              <i className="finch-shell finch-shell-left" />
              <i className="finch-shell finch-shell-right" />
              <i className="finch-crack finch-crack-a" />
              <i className="finch-crack finch-crack-b" />
            </span>

            <span className={`finch-bird${jumping ? " is-jumping" : ""}`} aria-hidden="true">
              <span className="finch-shadow" />
              <span className="finch-leg finch-leg-left"><i /></span>
              <span className="finch-leg finch-leg-right"><i /></span>

              <span className="finch-body">
                <i className="finch-wing" />
                <i className="finch-chest" />
              </span>

              <span className="finch-head">
                <i className="finch-crown" />
                <i className="finch-eye" />
                <i className="finch-beak" />
              </span>
            </span>

            {burst > 0 && (
              <span key={burst} className="finch-evolution-burst" aria-hidden="true">
                <i /><i /><i /><i />
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="finch-signature-note" aria-hidden="true">
        <span className="finch-note-desktop">
          {stage < 3 ? "HAZ CLICK PARA ADELANTAR LA EVOLUCIÓN" : "HAZ CLICK EN EL PINZÓN"}
        </span>
        <span className="finch-note-touch">
          {stage < 3 ? "TOCA PARA ADELANTAR" : "TOCA EL PINZÓN"}
        </span>
      </div>
    </section>
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
  const rootRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const width = useMemo(() => Math.max(...words.map((word) => word.length)), [words]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || reduced || words.length < 2) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % words.length), 3600);
    return () => window.clearInterval(timer);
  }, [active, reduced, words.length]);

  return (
    <span ref={rootRef} className="flip-fade-word" style={{ ["--flipfade-width" as string]: `${width + 1}ch` }}>
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
