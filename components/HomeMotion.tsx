"use client";

import { useEffect } from "react";

export default function HomeMotion() {
  useEffect(() => {
    const syncVisibility = () => {
      document.documentElement.classList.toggle("page-hidden", document.hidden);
    };
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return () => {
        document.removeEventListener("visibilitychange", syncVisibility);
        document.documentElement.classList.remove("page-hidden");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add("is-visible");
        observer.unobserve(entry.target);
      }),
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
      document.documentElement.classList.remove("page-hidden");
    };
  }, []);

  return null;
}
