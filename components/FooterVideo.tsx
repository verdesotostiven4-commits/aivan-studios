"use client";

import { useEffect, useRef, useState } from "react";
import BrandAsset from "./BrandAsset";

// El video original se conserva como atmósfera cinematográfica. Los logos
// no forman parte del video en la capa visible: son las imágenes originales
// proporcionadas por el estudio, con proporción natural y lectura accesible.
const VIDEO_URL =
  process.env.NEXT_PUBLIC_AIVAN_FOOTER_VIDEO_URL?.trim() ||
  "https://videotourl.com/videos/1791559511407-a260cc55-06d5-4965-ab46-0793886c5732.webm";

export default function FooterVideo() {
  const hostRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    const video = videoRef.current;
    if (reducedMotion || videoFailed || !host || !video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void video.play().catch(() => {
          // The static gradient remains legible if autoplay is blocked.
          setPlaying(false);
        });
      } else {
        video.pause();
        setPlaying(false);
      }
    }, { rootMargin: "280px 0px" });
    observer.observe(host);
    return () => observer.disconnect();
  }, [reducedMotion, videoFailed]);

  return (
    <section
      ref={hostRef}
      className={"aivan-footer-video aivan-footer-video--redesigned" + (playing ? " is-playing" : "")}
      aria-label="AIVAN STUDIOS y créditos de creación"
    >
      <div className="aivan-footer-video-frame">
        {!videoFailed && !reducedMotion && (
          <video
            ref={videoRef}
            className="aivan-footer-video-media"
            src={VIDEO_URL}
            muted
            playsInline
            loop
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
            onPlaying={() => setPlaying(true)}
            onError={() => setVideoFailed(true)}
          />
        )}
        <span className="aivan-footer-video-colorwash" aria-hidden="true" />
        <div className="aivan-footer-video-content">
          <div className="aivan-footer-video-primary">
            <span className="aivan-footer-video-kicker">
              ESTUDIO CREATIVO <span aria-hidden="true">·</span> GALÁPAGOS, ECUADOR
            </span>
            <a href="#inicio" className="aivan-footer-video-brand" aria-label="AIVAN STUDIOS, volver al inicio">
              <BrandAsset brand="studio" />
            </a>
            <p>Branding, estrategia y producción audiovisual, con una sola dirección.</p>
            <span className="aivan-footer-video-motto">CREAR CON PROPÓSITO. EVOLUCIONAR CON DIRECCIÓN.</span>
          </div>
          <div className="aivan-footer-video-credits" aria-label="Identidades y créditos creativos">
            <div className="aivan-footer-video-credit">
              <span className="aivan-footer-video-credit-label">CREADO POR</span>
              <div className="aivan-footer-video-credit-logo aivan-footer-video-credit-logo--kiubo">
                <BrandAsset brand="kiubo" />
              </div>
            </div>
            <span className="aivan-footer-video-credit-rule" aria-hidden="true" />
            <div className="aivan-footer-video-credit">
              <span className="aivan-footer-video-credit-label">IDENTIDAD CREATIVA</span>
              <div className="aivan-footer-video-credit-logo aivan-footer-video-credit-logo--stiven">
                <BrandAsset brand="bystiven" />
                <span>byStiven</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
