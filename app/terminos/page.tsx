import type { Metadata } from "next";
import BrandAsset from "@/components/BrandAsset";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: "Condiciones de navegación, contacto y envío de briefs en AIVAN STUDIOS.",
};

export default function TermsPage() {
  return (
    <main className="legal-page" id="main-content">
      <article className="legal-shell">
        <a href="/" aria-label="Volver al sitio de AIVAN STUDIOS"><BrandAsset brand="studio" loading="eager" /></a>
        <p className="micro-label">CONDICIONES DE USO · 9 DE OCTUBRE DE 2026</p>
        <h1>Trabajemos con claridad.</h1>
        <p>Estas condiciones explican el uso informativo de la página web de AIVAN STUDIOS y el envío de consultas a través de nuestro brief.</p>
        <div className="legal-grid">
          <section><h2>Uso del sitio</h2><p>Puedes conocer los servicios de AIVAN, explorar sus referencias visuales y enviar consultas legítimas sobre un proyecto. Te pedimos proporcionar información veraz y no intentar interrumpir o vulnerar los servicios.</p></section>
          <section><h2>Solicitudes y propuestas</h2><p>Enviar un brief no representa una contratación ni implica la aceptación automática de un proyecto. Los alcances, plazos, precios, derechos de uso y condiciones de cada trabajo se definirán, cuando corresponda, en una propuesta o acuerdo separado.</p></section>
          <section><h2>Contenido e imágenes</h2><p>El diseño, textos, marcas y materiales visibles pueden incluir elementos propios, de colaboradores o de referencia. La galería conceptual no implica que las imágenes mostradas correspondan necesariamente a trabajos contratados por clientes. No reutilices el material del sitio sin contar con los derechos o autorizaciones pertinentes.</p></section>
          <section><h2>Información personal</h2><p>El envío de datos de contacto está regulado por nuestro <a href="/privacidad">aviso de privacidad</a>. En el brief se solicita una confirmación explícita de su lectura y aceptación para la finalidad de contacto.</p></section>
          <section><h2>Enlaces y disponibilidad</h2><p>Podemos enlazar a servicios externos como WhatsApp o correo. Sus condiciones son independientes de AIVAN. Procuramos mantener el sitio disponible, aunque puede haber interrupciones técnicas.</p></section>
          <section><h2>Consultas</h2><p>Si tienes preguntas sobre estas condiciones, escribe a <a href="mailto:aivanstudiosgps@gmail.com">aivanstudiosgps@gmail.com</a>. AIVAN STUDIOS opera desde Galápagos, Ecuador.</p></section>
        </div>
        <a className="button button-dark legal-back" href="/">← Volver al sitio</a>
      </article>
    </main>
  );
}
