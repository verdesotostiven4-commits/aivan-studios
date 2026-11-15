import BrandAsset from "./BrandAsset";

// Compact editorial sign-off: all three original identity assets remain
// independent, sharp and responsive. No video or flattened artwork.
export default function FooterVideo() {
  return (
    <section className="aivan-footer-video aivan-footer-video--redesigned aivan-footer-video--minimal" aria-label="AIVAN STUDIOS y créditos creativos">
      <div className="aivan-footer-minimal-inner">
        <div className="aivan-footer-minimal-primary">
          <a href="#inicio" aria-label="AIVAN STUDIOS, volver al inicio" className="aivan-footer-minimal-brand">
            <BrandAsset brand="studio" />
          </a>
          <p>Branding <span aria-hidden="true">·</span> Estrategia <span aria-hidden="true">·</span> Producción audiovisual</p>
          <span className="aivan-footer-minimal-location">GALÁPAGOS, ECUADOR</span>
        </div>
        <div className="aivan-footer-minimal-credits" aria-label="Créditos del estudio">
          <div className="aivan-footer-minimal-credit">
            <span className="aivan-footer-minimal-label">CREADO POR</span>
            <div className="aivan-footer-minimal-kiubo"><BrandAsset brand="kiubo" /></div>
          </div>
          <div className="aivan-footer-minimal-credit">
            <span className="aivan-footer-minimal-label">IDENTIDAD CREATIVA</span>
            <div className="aivan-footer-minimal-stiven">
              <BrandAsset brand="bystiven" />
              <span>byStiven</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
