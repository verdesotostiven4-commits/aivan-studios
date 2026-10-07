"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function HeroFlipWord({ text }: { text: string }) {
  return (
    <span className="hero-flip-word" aria-label={text}>
      {Array.from(text).map((char, index) => (
        <span
          aria-hidden="true"
          className="hero-flip-char"
          data-char={char}
          key={`${char}-${index}`}
          style={{
            ["--flip-delay" as string]: `${0.18 + index * 0.07}s`,
          }}
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
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
