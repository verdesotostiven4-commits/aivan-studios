"use client";

import { useEffect } from "react";

/**
 * Reveal once and pause decorative motion in background tabs.
 * Intentionally do NOT capture wheel/touchmove/zoom/copy/contextmenu
 * at the document level: doing so blocked browser compositor scrolling
 * and prevented normal accessibility gestures on mobile and desktop.
 */
export default function HomeMotion() {
  useEffect(() => {
    const syncVisibility = () => {
      document.documentElement.classList.toggle("page-hidden", document.hidden);
    };
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let observer: IntersectionObserver | null = null;

    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
    } else {
      observer = new IntersectionObserver(
        (entries, activeObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLElement).classList.add("is-visible");
            activeObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
      );
      nodes.forEach((node) => observer?.observe(node));
    }

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
      document.documentElement.classList.remove("page-hidden");
    };
  }, []);

  return null;
}
