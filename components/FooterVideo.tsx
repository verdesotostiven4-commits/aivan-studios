"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_URL = process.env.NEXT_PUBLIC_AIVAN_FOOTER_VIDEO_URL?.trim() || "";
const POSTER_URL = process.env.NEXT_PUBLIC_AIVAN_FOOTER_POSTER_URL?.trim() || "";

const footerLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#brief", label: "Brief" },
  { href: "#contacto", label: "Contacto" },
  { href: "/privacidad", label: "Privacidad" },
];

export default function FooterVideo() {
  const host = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!VIDEO_URL || reduceMotion || !host.current || !video.current) return;
    const element = video.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.play().catch(() => undefined);
      } else {
        element.pause();
      }
    }, { rootMargin: "300px 0px" });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, [reduceMotion]);

  // Never show the video shell when its asset is not published: the original
  // functional footer remains in place, with no broken blank or 404 frame.
  if (!VIDEO_URL) return null;

  return (
    <section ref={host} className="aivan-footer-video" aria-label="Paisaje animado de Galápagos y créditos de AIVAN">
      <div className="aivan-footer-video-frame">
        {POSTER_URL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="aivan-footer-video-poster" src={POSTER_URL} alt="" loading="lazy" decoding="async" />
        ) : null}
        {!reduceMotion && (
          <video
            ref={video}
            className={ready ? "aivan-footer-video-media is-ready" : "aivan-footer-video-media"}
            src={VIDEO_URL}
            muted
            playsInline
            loop
            preload="none"
            autoPlay={false}
            onLoadedData={() => setReady(true)}
            onError={() => setReady(false)}
            aria-hidden="true"
            disablePictureInPicture
          />
        )}
        <div className="aivan-footer-video-link-zones">
          <a href="#inicio" aria-label="AIVAN — Ir al inicio" className="aivan-footer-video-logo-link" />
          <nav aria-label="Navegación del paisaje de AIVAN" className="aivan-footer-video-nav">
            {footerLinks.map(link => <a href={link.href} key={link.href} aria-label={link.label}><span className="sr-only">{link.label}</span></a>)}
          </nav>
        </div>
      </div>
    </section>
  );
}
