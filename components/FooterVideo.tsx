import BrandAsset from "./BrandAsset";

// Legacy filename retained to avoid disturbing the route.
// This section is now entirely authored in HTML/CSS: no flattened footer video.
// Logos are unchanged original AIVAN, KIUBO and byStiven brand assets.
export default function FooterVideo() {
  return (
    <section className="aivan-footer-video aivan-footer-video--redesigned" aria-label="AIVAN STUDIOS y créditos de creación">
      <div className="aivan-footer-video-frame">
        <span className="aivan-footer-video-animated-wash" aria-hidden="true" />
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
