"use client";

import { useEffect } from "react";

export default function HomeMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add("is-visible");
        observer.unobserve(entry.target);
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let frame = 0;
    let nextX = 0;
    let nextY = 0;
    const paint = () => {
      document.documentElement.style.setProperty("--mx", nextX.toFixed(3));
      document.documentElement.style.setProperty("--my", nextY.toFixed(3));
      frame = 0;
    };
    const move = (event: PointerEvent) => {
      if (!finePointer || window.innerWidth < 980) return;
      nextX = (event.clientX / window.innerWidth - 0.5) * 2;
      nextY = (event.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const reset = () => {
      nextX = 0;
      nextY = 0;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", reset);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", reset);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
