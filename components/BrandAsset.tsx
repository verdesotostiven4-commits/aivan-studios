"use client";

import { useState } from "react";
import Wordmark from "./Wordmark";

// Logos finales enviados por AIVAN (los PNG mantienen transparencia).
// No reconstruir tipografía ni deformarlos: respetar siempre su proporción.
export const BRAND_ASSETS = {
  studio: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhBp4D3e1FhI_4pT97oopnTHikQTX7PZ-pAAz9R84RnOYyxy7g4bJhItzNAQ4OvnVSLSlKCnA35Qof5CWpUgp-j_hKIUUcbLh-BWydfaGTVgf381jKYf2rTNFWtpsCY_1qgEfqX6-a7A5DkfAmTe_IOUua1jktDeRoq77Vk0M7Fr_KsCACUhb03-wMbjMk/s1600/image.png",
  solo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsp49R8nFKBC6Lg3HAQIa89oGFzalXtVDJtOyF7vwvbxgD44_d14_LBjXSGbfH1jarCtrwPEb19IYH_CMzE02E7tpSrgJvCHuoLg_f-UCfO7nD2tpTACvmF_mAWqsb2gOn7BvF4_jplxPwyYkR9IeNBHhMJt8SQYrmFuKDlnSfEj03MlUC8binQm3JG9g/s1600/image.png",
  kiubo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjMPzLxtwjw2WbsM5EvbM8oefC2bBQvnO-f72mtQKcRrlQD927iTvCGMDV44CV9WS-2OU5jbfZGXEvQ6ctopDe55Vj5RHQ1jTK98x3VFo1SvbGpNMUJYWhBswESoWi4fBuFR1Wj3w3jxMHgGD7LrBk0FTLsvJAFNaO-HajuCfMJULT4YF0E6mDvmZosNdM/s1600/image.png",
  bystiven: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsK3cjkgtaJPYV_ziNbra2moCDmuWqThsBMQgoIJY8gPwdDEYgpnB4d6SBxJ9npwiL7oaqUSHMZJw4RX-c_bxHSaNxaKTb2TDUkMWg5jmYmkerKY-GsJQRnGTtpWWiB1kz8nXd1r2GUecBCXYTi739u2BPonp1yO77n1wYigXpbZHe_YnHpsUF48rMtKc/s1600/image.png",
} as const;

type Brand = keyof typeof BRAND_ASSETS;

type Props = {
  brand: Brand;
  className?: string;
  loading?: "eager" | "lazy";
};

const labels: Record<Brand, string> = {
  studio: "AIVAN STUDIOS",
  solo: "AIVAN",
  kiubo: "KIUBO",
  bystiven: "byStiven",
};

export default function BrandAsset({ brand, className = "", loading = "lazy" }: Props) {
  const [errored, setErrored] = useState(false);

  return (
    <span className={`aivan-brand-asset aivan-brand-asset--${brand} ${className}`.trim()}>
      {errored ? (
        brand === "studio" ? <Wordmark /> :
        <span className={`aivan-brand-fallback aivan-brand-fallback--${brand}`} role="img" aria-label={labels[brand]}>
          {labels[brand]}
        </span>
      ) : (
        // Las imágenes están alojadas por el estudio en Blogger.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="aivan-brand-asset-image"
          src={BRAND_ASSETS[brand]}
          width={brand === "bystiven" ? 1600 : 1600}
          height={brand === "bystiven" ? 1600 : 533}
          alt={labels[brand]}
          loading={loading}
          decoding="async"
          draggable={false}
          onError={() => setErrored(true)}
        />
      )}
    </span>
  );
}
