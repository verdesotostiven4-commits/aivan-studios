"use client";

import { useEffect } from "react";

export default function HomeMotion() {
  useEffect(() => {
    const syncVisibility = () => {
      document.documentElement.classList.toggle("page-hidden", document.hidden);
    };
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);

    // Public-site interaction guards: keep the experience app-like without
    // breaking typing, selecting or pasting inside form controls.
    const isEditable = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      Boolean(target.closest("input, textarea, select, [contenteditable='true']"));

    const preventContext = (event: Event) => event.preventDefault();
    const preventDrag = (event: Event) => event.preventDefault();
    const preventSelection = (event: Event) => {
      if (!isEditable(event.target)) event.preventDefault();
    };
    const preventCopy = (event: ClipboardEvent) => {
      if (!isEditable(event.target)) event.preventDefault();
    };
    const preventZoomWheel = (event: WheelEvent) => {
      if (!event.ctrlKey) return;
      event.preventDefault();
    };
    const preventZoomKeys = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      if (["+", "=", "-", "0"].includes(event.key)) event.preventDefault();
    };
    const preventMultiTouch = (event: TouchEvent) => {
      if (event.touches.length > 1) event.preventDefault();
    };

    document.querySelectorAll<HTMLElement>("[title]").forEach((node) => node.removeAttribute("title"));
    document.addEventListener("contextmenu", preventContext);
    document.addEventListener("dragstart", preventDrag);
    document.addEventListener("selectstart", preventSelection);
    document.addEventListener("copy", preventCopy);
    window.addEventListener("wheel", preventZoomWheel, { passive: false });
    window.addEventListener("keydown", preventZoomKeys);
    document.addEventListener("touchmove", preventMultiTouch, { passive: false });
    document.addEventListener("gesturestart", preventContext, { passive: false });

    const removeInteractionGuards = () => {
      document.removeEventListener("contextmenu", preventContext);
      document.removeEventListener("dragstart", preventDrag);
      document.removeEventListener("selectstart", preventSelection);
      document.removeEventListener("copy", preventCopy);
      window.removeEventListener("wheel", preventZoomWheel);
      window.removeEventListener("keydown", preventZoomKeys);
      document.removeEventListener("touchmove", preventMultiTouch);
      document.removeEventListener("gesturestart", preventContext);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return () => {
        document.removeEventListener("visibilitychange", syncVisibility);
        removeInteractionGuards();
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
      removeInteractionGuards();
      document.documentElement.classList.remove("page-hidden");
    };
  }, []);

  return null;
}
