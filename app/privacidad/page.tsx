import type { Metadata } from "next";
import BrandAsset from "@/components/BrandAsset";

export const metadata: Metadata = {
  title: "Privacidad y protección de datos",
  description: "Cómo AIVAN STUDIOS recoge y protege los datos del brief y de contacto.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page" id="main-content">
      <article className="legal-shell">
        <a href="/" aria-label="Volver al sitio de AIVAN STUDIOS"><BrandAsset brand="studio" loading="eager" /></a>
        <p className="micro-label">TRANSPARENCIA Y CONFIANZA · ACTUALIZADO: 9 DE OCTUBRE DE 2026</p>
        <h1>Tu información, con una dirección clara.</h1>
        <p>Este aviso explica qué hacemos con los datos que una persona comparte voluntariamente a través del brief de AIVAN STUDIOS o mediante contacto directo.</p>
        <div className="legal-grid">
          <section><h2>Quién recibe tus datos</h2><p>AIVAN STUDIOS, estudio creativo con actividad en Galápagos, Ecuador. Para consultas sobre datos personales: <a href="mailto:aivanstudiosgps@gmail.com">aivanstudiosgps@gmail.com</a>.</p></section>
          <section><h2>Información que nos envías</h2><p>Nombre y sector del negocio, proyecto, objetivos, desafíos, presupuesto orientativo, redes y página web, junto con el nombre, ciudad, correo y/o teléfono de contacto. También pueden recibirse datos técnicos básicos del envío, como su origen o campaña, cuando estén disponibles.</p></section>
          <section><h2>Finalidad y autorización</h2><p>Usamos esta información para entender tu solicitud, valorar cómo ayudarte, responderte, preparar una propuesta y dar seguimiento a esa conversación. El brief solicita una aceptación expresa de este aviso antes de enviarlo. No lo utilizamos para vender tus datos ni para enviar publicidad ajena a tu solicitud.</p></section>
          <section><h2>Servicios que intervienen</h2><p>El sitio se despliega mediante Vercel y utiliza Supabase para recibir, almacenar y consultar solicitudes a través de un panel restringido. Algunas imágenes y el video de cierre pueden servirse desde proveedores externos de alojamiento de medios; al cargarse estos archivos, dichos proveedores pueden recibir información técnica como la dirección IP. Los enlaces a WhatsApp y correo conducen a plataformas independientes. La infraestructura utilizada puede procesar datos fuera de Ecuador, de acuerdo con las obligaciones aplicables.</p></section>
          <section><h2>Acceso y seguridad</h2><p>El panel requiere identificación de integrantes autorizados. La base de datos aplica políticas de seguridad por filas para restringir los accesos. Ninguna medida técnica elimina todos los riesgos y revisamos las protecciones del servicio según sea necesario.</p></section>
          <section><h2>Conservación</h2><p>Conservamos la información durante el tiempo necesario para revisar la solicitud, mantener el contacto y atender obligaciones que correspondan. Cuando deje de ser necesaria, corresponde revisar su eliminación o anonimización.</p></section>
          <section><h2>Cookies y almacenamiento</h2><p>Actualmente no hemos integrado en el código del sitio píxeles publicitarios ni analítica de seguimiento de terceros. El panel privado puede guardar información de sesión necesaria para mantener el acceso del equipo. Los proveedores de infraestructura pueden procesar registros técnicos para seguridad y funcionamiento. Si se incorporan herramientas de seguimiento opcionales, revisaremos el aviso y el consentimiento correspondiente antes de activarlas.</p></section>
          <section><h2>Tus derechos</h2><p>Puedes solicitar información, acceso, rectificación, actualización, eliminación, oposición u otras medidas que correspondan, así como retirar tu autorización cuando aplique. Escríbenos a <a href="mailto:aivanstudiosgps@gmail.com">aivanstudiosgps@gmail.com</a> indicando tu solicitud; podremos verificar tu identidad para proteger tus datos.</p></section>
          <section><h2>Contacto directo</h2><p>AIVAN STUDIOS · Galápagos, Ecuador · <a href="mailto:aivanstudiosgps@gmail.com">aivanstudiosgps@gmail.com</a> · +593 99 060 1620.</p></section>
          <section><h2>Más información</h2><p>Lee también los <a href="/terminos">términos de uso del sitio</a>. Este aviso puede actualizarse cuando cambien las funcionalidades o el tratamiento de datos.</p></section>
        </div>
        <a className="button button-dark legal-back" href="/">← Volver al sitio</a>
      </article>
    </main>
  );
}
