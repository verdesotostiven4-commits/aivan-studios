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
  const ref = useRef<HTMLButtonElement>(null);
  const [focused, setFocused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function onMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (reduced || event.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--aivan-tilt-x", (((event.clientX - r.left) / r.width - .5) * 7).toFixed(2) + "px");
    el.style.setProperty("--aivan-tilt-y", (((event.clientY - r.top) / r.height - .5) * 5).toFixed(2) + "px");
  }

  function reset() {
    ref.current?.style.setProperty("--aivan-tilt-x", "0px");
    ref.current?.style.setProperty("--aivan-tilt-y", "0px");
  }

  return (
    <button
      type="button"
      ref={ref}
      className={`aivan-orbital-art aivan-orbital-original-layout${focused ? " is-focused" : ""}${visible && !reduced ? " is-visible" : ""}`}
      aria-label={focused ? "Volver a la vista completa de Galápagos" : "Explorar el paisaje orbital de Galápagos"}
      aria-pressed={focused}
      title={focused ? "Volver a la vista completa" : "Explorar Galápagos"}
      onClick={() => setFocused(value => !value)}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onKeyDown={event => { if (event.key === "Escape") setFocused(false); }}
    >
      <span className="aivan-original-artboard" aria-hidden="true">
        {/* The photograph is the ONLY original derived layer still in use.
            Other re-generated neon overlays are archived above, deliberately
            disabled: they distorted the original artwork. */}
        <span className="aivan-original-landscape">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={layers.portal} width="1600" height="900" alt="" loading="lazy" decoding="async" onLoad={() => setLoaded(true)} onError={() => setLoaded(false)} />
        </span>
        <svg className="aivan-original-orbits" viewBox="0 0 1672 941" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="aivan-orbit-warm" x1="0%" y1="0%" x2="100%" y2="85%">
              <stop offset="0%" stopColor="#b08c7b" />
              <stop offset="15%" stopColor="#f39a20" />
              <stop offset="44%" stopColor="#f8b459" />
              <stop offset="76%" stopColor="#d96ba9" />
              <stop offset="100%" stopColor="#6665e5" />
            </linearGradient>
            <linearGradient id="aivan-orbit-cool" x1="0%" y1="40%" x2="100%" y2="60%">
              <stop offset="0%" stopColor="#bf406f" />
              <stop offset="30%" stopColor="#fd5079" />
              <stop offset="55%" stopColor="#d791bd" />
              <stop offset="79%" stopColor="#73b7ff" />
              <stop offset="100%" stopColor="#4c5edb" />
            </linearGradient>
            <linearGradient id="aivan-orbit-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f29b2e" />
              <stop offset="45%" stopColor="#f1c37c" />
              <stop offset="100%" stopColor="#f09a1e" />
            </linearGradient>
            <radialGradient id="aivan-planet-sun" cx="32%" cy="25%" r="74%">
              <stop stopColor="#fff1b8"/>
              <stop offset=".38" stopColor="#f7bb65"/>
              <stop offset=".77" stopColor="#d28b22"/>
              <stop offset="1" stopColor="#b66e16"/>
            </radialGradient>
            <radialGradient id="aivan-planet-rose" cx="30%" cy="22%" r="82%">
              <stop stopColor="#ffd3e6"/>
              <stop offset=".4" stopColor="#f08ac5"/>
              <stop offset=".78" stopColor="#bf2f8c"/>
              <stop offset="1" stopColor="#9a236d"/>
            </radialGradient>
            <radialGradient id="aivan-planet-blue" cx="33%" cy="23%" r="81%">
              <stop stopColor="#c6ecff"/>
              <stop offset=".3" stopColor="#71b8ff"/>
              <stop offset=".7" stopColor="#3566e8"/>
              <stop offset="1" stopColor="#17339f"/>
            </radialGradient>
          </defs>

          {/* Hairline background construction rings: quiet and translucent. */}
          <g fill="none" stroke="#bcb5ad" strokeWidth="1" opacity=".36">
            <ellipse cx="830" cy="429" rx="428" ry="391" transform="rotate(-14 830 429)" />
            <path d="M1245 146 C1491 155 1544 347 1458 465" />
            <path d="M319 284 C155 255 85 316 122 438" />
          </g>
          <g fill="#baa795" opacity=".76">
            <circle cx="543" cy="155" r="4"/>
            <circle cx="1245" cy="146" r="4"/>
            <circle cx="783" cy="797" r="4"/>
          </g>
          {/* The original is composed of slender, precise paths.
              Replace the previous thick neon loops with subtle strokes. */}
          <g fill="none" strokeWidth="1.8" strokeLinecap="round" opacity=".96">
            <path d="M303 246 C287 171 445 165 599 174 C991 180 1397 278 1459 433 C1486 494 1350 625 1062 647" stroke="url(#aivan-orbit-warm)"/>
            <path d="M303 283 C191 278 102 286 136 376 C165 465 440 554 648 598 C866 654 1251 690 1378 636" stroke="url(#aivan-orbit-cool)"/>
            <path d="M307 245 C344 362 627 451 885 545 C1153 647 1368 708 1337 655 C1300 614 1171 576 1106 571" stroke="url(#aivan-orbit-gold)" />
            <path d="M1434 403 C1469 353 1558 402 1523 483 C1503 548 1331 595 1119 589 C961 585 795 560 650 598" stroke="url(#aivan-orbit-cool)"/>
          </g>
          <g className="aivan-original-planets">
            <circle cx="303" cy="277" r="32" fill="url(#aivan-planet-sun)"/>
            <circle cx="648" cy="599" r="28" fill="url(#aivan-planet-rose)"/>
            <circle cx="1467" cy="431" r="28" fill="url(#aivan-planet-blue)"/>
          </g>
        </svg>
        {!loaded && <span className="aivan-original-offline" />}
      </span>
      <span className="aivan-orbital-instruction" aria-hidden="true">{focused ? "VOLVER ↗" : "EXPLORAR ↗"}</span>
    </button>
  );
}
