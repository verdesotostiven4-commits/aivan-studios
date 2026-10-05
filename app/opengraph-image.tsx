import { ImageResponse } from "next/og";

export const alt = "AIVAN STUDIOS — Dirección creativa para marcas que quieren crecer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0a0a0d",
          color: "white",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", position: "absolute", width: 520, height: 520, borderRadius: 999, left: -180, bottom: -250, background: "rgba(216,140,0,.48)", filter: "blur(65px)" }} />
        <div style={{ display: "flex", position: "absolute", width: 500, height: 500, borderRadius: 999, right: 220, top: -260, background: "rgba(199,20,93,.36)", filter: "blur(65px)" }} />
        <div style={{ display: "flex", position: "absolute", width: 520, height: 520, borderRadius: 999, right: -210, top: -120, background: "rgba(91,136,255,.46)", filter: "blur(65px)" }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 76px", width: "100%", height: "100%", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
            <div style={{ display: "flex", fontSize: 50, fontWeight: 900, letterSpacing: -4 }}>AIVAN</div>
            <div style={{ display: "flex", fontSize: 14, letterSpacing: 7, color: "#b5b3bd" }}>STUDIOS</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
            <div style={{ display: "flex", fontSize: 18, letterSpacing: 4, color: "#aaa8b1", marginBottom: 22 }}>
              ESTUDIO CREATIVO · GALÁPAGOS
            </div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: .95, letterSpacing: -5, fontWeight: 800 }}>
              <div style={{ display: "flex" }}>Tu marca no necesita más ruido.</div>
              <div style={{ display: "flex" }}>Necesita dirección.</div>
            </div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 24, color: "#c9c7ce" }}>
              Branding · estrategia · producción audiovisual
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
