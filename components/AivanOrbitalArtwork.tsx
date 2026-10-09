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
export const archivedOrbitalLayers = {
  portal: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-QjXkg_NEejEx8eHdIbfnN2eHYKlx-gsYP7rTpaVDViCIf8xd5pJsV9weH2EFEMP9sUsfqe8HpAgfAxodg5dfNlTdgWZTq-gd2f1v2nzaIxPj38piuCouJKIXpRga9BLX5RHmb8ewizwnPZaL7ybgIny6oWpEQUSXFo7D0a1gigZOORQ26NhBPEpSHQc/s1600/image.png",
  orbit: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEidYggVH5TJ_rUeEhiGxhxyRnS4pcCS80QrPyG4bO_YfnhyAtZ5xDNF0_Bx94Htd0rX_LBqAiMFUQsQTKZ_J4iDg3nsSQCoxJDFugv_KQ4ReNBoA7iny25bVifMoUfBNUgyuoJRlVmFzi_M6aApLgtf442MZGwn5za3cs-zg8FNrfl_KY78QwYdtUdTmaE/s1600/image.png",
  amber: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRDTDOZp54nXSoBwr9DGHTFFpRBNdNtXlJMCPYHck0kyHNUI_i6TugEfWBfu5YkdZlns30L51fSto509LGdzvP6RoP9aRU9P84nWH2WNICpXMrIw4rqvWDX0Ycf-JQ9CKAZlYFWI8VCedrk4jNdljfiMkJXtNCJeWoJsZ17bvjprbnzwr1xqdhlA-t7WE/s1600/image.png",
  magenta: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3H38oTKq5SZJF70T77T7N8iPPCYrpQNqri2u3MJPusrgQ4pI9w0A0kUAfzamBW8-VkXDxCJ-CpkUoDas9qccxnVGSQRlVJuWormtWhmOodC9PzRlfDXcBtUOrcNhEEUThBsi8VrkpMQZQRGxliXk3YwHtBX4Um9en4rDAQKau2VS2Wpm1-Gk4oPakud0/s1600/image.png",
  blue: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrtr8hAxZQhi-LrMd0bEVEdgOhgSJgxy-nwg4nQKa52GqYqEjSccLH9CTzIQbToVOp1JZiPutQHUasCf90SrDzi0LSGvDPzXXMpcAzJG-_3yu_u6j8QEFXINs8bxV9UZPoGYqqZjlA_6Bg-TgmAKPvj7_8UGQXVLJHcN5vfYR7wj6iF5fXKrgpHmnbGYw/s1600/image.png",
  guides: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhza9PRY9tH_Oliqmcr5_DVXrnyD8AN3eqPthXZMySSsOe-jU46b0ZTGlc2Q_M1Fe9CwcPW3iYwKoj14uJSqUhbSeQUJFR5N4Ln52_SSavc8Vqv46DYnI16iTx5w433o-XNq2gL6pCrxhMbkZ_KLfll0kyOAsMCcJ4y22qEP58fn63IkXKsiZDB7UvftdY/s1600/image.png",
  clouds: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhe_ONkRLiVNbBWeS2vzxGdZcFVr_E81cxPH-hxr1rI3L8_DBCILDe11DDwmHuWihpLwqFAy-_1TbzUewLRkhHKFm22BSYwy5qLC0EFs5p2us9DZH5m0J9aR0cjlxMHqQtXyIDDVqdQm39IM86Mr4kV_9xh4zzfFlAOq7j9qsXgajlIqa5D8ZE37T0y63M/s1600/image.png",
} as const;

type LayerName = keyof typeof archivedOrbitalLayers;
const ORDER: LayerName[] = ["guides", "clouds", "portal", "orbit", "amber", "magenta", "blue"];

/**
 * Approved AIVAN composition reproduced as one locally hosted image.
 * Avoid reconstructing it from independently generated layers:
 * previous rebuild showed neon artifacts, misaligned planets and changed
 * photography. Seven experimental URLs are archived above for reference.
 * New transparent cutout supplied by the client is loaded directly; original
 * local artwork is displayed only if Blogger fails to deliver the PNG.
 */
const APPROVED_TRANSPARENT_ORBITAL_IMAGE = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgzuwnoOHoQXtyMZbBGBhj_780heltZ5olr4-vVD2A_XNKiol9cLuv-eLSdl3hFn_ekEJg5xnqwPR8q1onfJzolf-xgeKDzP1T55MpiBuLsca7ZtdpPFD9v-pSuEC9RcasQllYokUmKkMAkwO0JLrGKA433GxeyvmUj0loPFVM72HvTaWCy5s8FcCwB0-8/s1600/image.png";
const ORIGINAL_LOCAL_FALLBACK = "/images/aivan-galapagos-approved.avif";

export default function AivanOrbitalArtwork() {
  const ref = useRef<HTMLButtonElement>(null);
  const [focused, setFocused] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  function onMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (reduced || event.pointerType === "touch" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    ref.current.style.setProperty("--aivan-tilt-x", (x * 6).toFixed(2) + "px");
    ref.current.style.setProperty("--aivan-tilt-y", (y * 4).toFixed(2) + "px");
  }

  function reset() {
    ref.current?.style.setProperty("--aivan-tilt-x", "0px");
    ref.current?.style.setProperty("--aivan-tilt-y", "0px");
  }

  return (
    <button
      ref={ref}
      type="button"
      className={`aivan-orbital-art aivan-orbital-original-layout${focused ? " is-focused" : ""}`}
      aria-label={focused ? "Volver a la vista completa de Galápagos" : "Acercar la composición de Galápagos"}
      aria-pressed={focused}
      title={focused ? "Volver a la vista completa" : "Explorar el paisaje"}
      onClick={() => setFocused(value => !value)}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onKeyDown={event => { if (event.key === "Escape") setFocused(false); }}
    >
      <span className="aivan-original-artboard" aria-hidden="true">
        {/* Original approved composite: no neon overlays or duplicate planets. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="aivan-approved-composite"
          src={useFallback ? ORIGINAL_LOCAL_FALLBACK : APPROVED_TRANSPARENT_ORBITAL_IMAGE}
          width={1600}
          height={900}
          onError={() => setUseFallback(true)}
          alt=""
          draggable={false}
          decoding="async"
          loading="eager"
        />
      </span>
      <span className="aivan-orbital-instruction" aria-hidden="true">
        {focused ? "VOLVER ↗" : "EXPLORAR ↗"}
      </span>
    </button>
  );
}
