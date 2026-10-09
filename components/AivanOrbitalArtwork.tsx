"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AIVAN STUDIOS | Galápagos orbital editorial artwork
 *
 * Original seven isolated 16:9 PNG layers supplied by the client through
 * Blogger (2026-10-09). Every layer uses the SAME image canvas so all seven
 * are anchored to one shared artboard — never crop or position individually.
 *
 * Assets mapping (reorder sources here if the host upload order differs):
 * 0: landscape portal, 1: colored orbits, 2: amber orb, 3: magenta orb,
 * 4: blue orb, 5: background guide rings, 6: clouds and mist.
 *
 * Do not replace the archived FinchSignature animation: that remains in
 * BrandMotion.tsx and can be restored by ENABLE_FINCH_SIGNATURE.
 */
const layers = {
  portal: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-QjXkg_NEejEx8eHdIbfnN2eHYKlx-gsYP7rTpaVDViCIf8xd5pJsV9weH2EFEMP9sUsfqe8HpAgfAxodg5dfNlTdgWZTq-gd2f1v2nzaIxPj38piuCouJKIXpRga9BLX5RHmb8ewizwnPZaL7ybgIny6oWpEQUSXFo7D0a1gigZOORQ26NhBPEpSHQc/s1600/image.png",
  orbit: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEidYggVH5TJ_rUeEhiGxhxyRnS4pcCS80QrPyG4bO_YfnhyAtZ5xDNF0_Bx94Htd0rX_LBqAiMFUQsQTKZ_J4iDg3nsSQCoxJDFugv_KQ4ReNBoA7iny25bVifMoUfBNUgyuoJRlVmFzi_M6aApLgtf442MZGwn5za3cs-zg8FNrfl_KY78QwYdtUdTmaE/s1600/image.png",
  amber: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRDTDOZp54nXSoBwr9DGHTFFpRBNdNtXlJMCPYHck0kyHNUI_i6TugEfWBfu5YkdZlns30L51fSto509LGdzvP6RoP9aRU9P84nWH2WNICpXMrIw4rqvWDX0Ycf-JQ9CKAZlYFWI8VCedrk4jNdljfiMkJXtNCJeWoJsZ17bvjprbnzwr1xqdhlA-t7WE/s1600/image.png",
  magenta: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3H38oTKq5SZJF70T77T7N8iPPCYrpQNqri2u3MJPusrgQ4pI9w0A0kUAfzamBW8-VkXDxCJ-CpkUoDas9qccxnVGSQRlVJuWormtWhmOodC9PzRlfDXcBtUOrcNhEEUThBsi8VrkpMQZQRGxliXk3YwHtBX4Um9en4rDAQKau2VS2Wpm1-Gk4oPakud0/s1600/image.png",
  blue: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrtr8hAxZQhi-LrMd0bEVEdgOhgSJgxy-nwg4nQKa52GqYqEjSccLH9CTzIQbToVOp1JZiPutQHUasCf90SrDzi0LSGvDPzXXMpcAzJG-_3yu_u6j8QEFXINs8bxV9UZPoGYqqZjlA_6Bg-TgmAKPvj7_8UGQXVLJHcN5vfYR7wj6iF5fXKrgpHmnbGYw/s1600/image.png",
  guides: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhza9PRY9tH_Oliqmcr5_DVXrnyD8AN3eqPthXZMySSsOe-jU46b0ZTGlc2Q_M1Fe9CwcPW3iYwKoj14uJSqUhbSeQUJFR5N4Ln52_SSavc8Vqv46DYnI16iTx5w433o-XNq2gL6pCrxhMbkZ_KLfll0kyOAsMCcJ4y22qEP58fn63IkXKsiZDB7UvftdY/s1600/image.png",
  clouds: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhe_ONkRLiVNbBWeS2vzxGdZcFVr_E81cxPH-hxr1rI3L8_DBCILDe11DDwmHuWihpLwqFAy-_1TbzUewLRkhHKFm22BSYwy5qLC0EFs5p2us9DZH5m0J9aR0cjlxMHqQtXyIDDVqdQm39IM86Mr4kV_9xh4zzfFlAOq7j9qsXgajlIqa5D8ZE37T0y63M/s1600/image.png",
} as const;

type LayerName = keyof typeof layers;
const ORDER: LayerName[] = ["guides", "clouds", "portal", "orbit", "amber", "magenta", "blue"];

export default function AivanOrbitalArtwork() {
  const artRef = useRef<HTMLButtonElement>(null);
  const [focused, setFocused] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failed, setFailed] = useState<LayerName[]>([]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = artRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.12 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "touch" || reducedMotion || !artRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - .5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - .5) * 2));
    artRef.current.style.setProperty("--orbital-x", `${(x * 7).toFixed(2)}px`);
    artRef.current.style.setProperty("--orbital-y", `${(y * 6).toFixed(2)}px`);
    artRef.current.style.setProperty("--orbital-near-x", `${(x * 13).toFixed(2)}px`);
    artRef.current.style.setProperty("--orbital-near-y", `${(y * 9).toFixed(2)}px`);
  }

  function onPointerLeave() {
    const el = artRef.current;
    if (!el) return;
    el.style.setProperty("--orbital-x", "0px");
    el.style.setProperty("--orbital-y", "0px");
    el.style.setProperty("--orbital-near-x", "0px");
    el.style.setProperty("--orbital-near-y", "0px");
  }

  return (
    <button
      ref={artRef}
      type="button"
      className={`aivan-orbital-art${focused ? " is-focused" : ""}${inView ? " is-visible" : ""}${reducedMotion ? " is-reduced" : ""}`}
      aria-label={focused ? "Volver a la vista orbital completa" : "Acercar el paisaje de Galápagos"}
      aria-pressed={focused}
      title={focused ? "Volver a la composición" : "Explorar Galápagos"}
      onClick={() => setFocused((value) => !value)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onKeyDown={(event) => { if (event.key === "Escape") { setFocused(false); event.stopPropagation(); } }}
    >
      <span className="aivan-orbital-fallback" aria-hidden="true">
        <span className="aivan-orbital-fallback-path" />
        <span className="aivan-orbital-fallback-dot" />
        <span className="aivan-orbital-fallback-dot" />
        <span className="aivan-orbital-fallback-dot" />
      </span>
      <span className={`aivan-orbital-stack${portalReady ? " has-portal" : ""}`} aria-hidden="true">
        {ORDER.map((name) => (
          <span className={`aivan-orbital-layer aivan-orbital-${name}`} key={name}>
            {/* All user assets retain their original 16:9 canvas and relative positions. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={layers[name]}
              width={1600}
              height={900}
              draggable={false}
              loading="lazy"
              decoding="async"
              onLoad={() => { if (name === "portal") setPortalReady(true); }}
              onError={() => {
                setFailed((previous) => previous.includes(name) ? previous : [...previous, name]);
                if (name === "portal") setPortalReady(false);
              }}
              style={{ opacity: failed.includes(name) ? 0 : 1 }}
            />
          </span>
        ))}
      </span>
      <span className="aivan-orbital-instruction" aria-hidden="true">
        {focused ? "VOLVER A LA VISTA COMPLETA ↗" : "EXPLORAR ↗"}
      </span>
    </button>
  );
}
