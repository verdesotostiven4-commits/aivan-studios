"use client";

import { useEffect, useRef, useState } from "react";

// The source is a user-provided direct WebM link. A configured asset can
// override it later without requiring another code change.
const VIDEO_URL = process.env.NEXT_PUBLIC_AIVAN_FOOTER_VIDEO_URL?.trim() || "https://videotourl.com/videos/1791559511407-a260cc55-06d5-4965-ab46-0793886c5732.webm";

export default function FooterVideo() {
  const host = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion || failed || !host.current || !video.current) return;
    const element = video.current;
    // Fetch video only when the closing section is near the viewport.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.play().catch(() => {
          // Keep the original, usable footer if playback is blocked.
          setFailed(true);
        });
      } else {
        element.pause();
      }
    }, { rootMargin: "300px 0px" });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, [reduceMotion, failed]);

  // Accessibility and failure protection: original footer remains unchanged.
  if (reduceMotion || failed) return null;

  return (
    <section
      ref={host}
      className={playing ? "aivan-footer-video is-playing" : "aivan-footer-video"}
      aria-label="Paisaje animado de Galápagos, AIVAN y créditos creativos"
    >
      <div className="aivan-footer-video-frame">
        <video
          ref={video}
          className={playing ? "aivan-footer-video-media is-ready" : "aivan-footer-video-media"}
          src={VIDEO_URL}
          muted
          playsInline
          loop
          preload="none"
          onPlaying={() => setPlaying(true)}
          onError={() => setFailed(true)}
          disablePictureInPicture
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
