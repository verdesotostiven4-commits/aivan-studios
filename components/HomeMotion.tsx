"use client";

import { useEffect } from "react";

export default function HomeMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduce) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add("is-visible");
        observer.unobserve(el);
      }),
      { threshold: 0.14, rootMargin: "0px 0px -5% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));

    const move = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty("--mx", x.toFixed(3));
      document.documentElement.style.setProperty("--my", y.toFixed(3));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", move);
    };
  }, []);
  return null;
}
