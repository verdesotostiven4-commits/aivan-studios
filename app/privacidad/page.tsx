import type { Metadata } from "next";
import BrandAsset from "@/components/BrandAsset";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: "Cómo AIVAN STUDIOS utiliza la información enviada desde su sitio web.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page" id="main-content">
      <article className="legal-shell">
        <a href="/" aria-label="Volver al sitio de AIVAN STUDIOS"><BrandAsset brand="studio" loading="eager" /></a>
        <p className="micro-label">INFORMACIÓN Y CONTACTO</p>
        <h1>Aviso de privacidad.</h1>
        <p>Este aviso explica, de forma sencilla, qué información recibe AIVAN STUDIOS cuando una persona envía el brief o se pone en contacto desde este sitio.</p>

        <div className="legal-grid">
          <section>
            <h2>Qué datos recibimos</h2>
            <p>Podemos recibir el nombre del negocio, sector, reto, objetivo, presupuesto orientativo, redes, nombre de contacto, correo, teléfono, ciudad y web o red principal que la persona decida proporcionar.</p>
          </section>
          <section>
            <h2>Para qué los usamos</h2>
            <p>Los datos se utilizan para entender la solicitud, evaluar qué servicio puede ser adecuado, responder al contacto, preparar una conversación o propuesta y dar seguimiento a esa oportunidad.</p>
          </section>
          <section>
            <h2>Dónde se procesan</h2>
            <p>El sitio utiliza servicios tecnológicos necesarios para operar la web y el panel interno. La información del brief se almacena en la infraestructura del proyecto y solo se muestra a usuarios autorizados del equipo AIVAN.</p>
          </section>
          <section>
            <h2>Cuánto tiempo se conserva</h2>
            <p>AIVAN puede conservar la información durante el tiempo razonablemente necesario para atender la solicitud y mantener el seguimiento de la relación comercial, salvo que la persona solicite su actualización o eliminación cuando corresponda.</p>
          </section>
          <section>
            <h2>Tus solicitudes</h2>
            <p>Para consultar, corregir o solicitar la eliminación de la información enviada, escribe a <a href="mailto:aivanstudiosgps@gmail.com">aivanstudiosgps@gmail.com</a>.</p>
          </section>
          <section>
            <h2>Contacto directo</h2>
            <p>AIVAN STUDIOS · Galápagos, Ecuador · <a href="mailto:aivanstudiosgps@gmail.com">aivanstudiosgps@gmail.com</a> · +593 99 060 1620.</p>
          </section>
        </div>

        <a className="button button-dark legal-back" href="/">← Volver al sitio</a>
      </article>
    </main>
  );
}
