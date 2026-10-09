import AvatarShowcase from "@/components/AvatarShowcase";
import AivanOrbitalArtwork from "@/components/AivanOrbitalArtwork";
import BriefForm from "@/components/BriefForm";
import HomeMotion from "@/components/HomeMotion";
import SiteHeader from "@/components/SiteHeader";
import CinematicHero from "@/components/CinematicHero";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import ServiceExplorer from "@/components/ServiceExplorer";
import Wordmark from "@/components/Wordmark";
import { BridgeSequence, FinchSignature, FlipFadeWord, StatementMaskReveal, TypingSignal } from "@/components/BrandMotion";

// The original animated finch is intentionally archived, not deleted.
const ENABLE_FINCH_SIGNATURE = false;

const processSteps = [
  ["01", "Conocemos", "Entendemos el negocio, su contexto y el problema antes de hablar de soluciones."],
  ["02", "Analizamos", "Detectamos qué mover primero, qué está frenando la marca y qué todavía no necesita."],
  ["03", "Direccionamos", "Definimos la ruta que alinea estrategia, creatividad y producción."],
  ["04", "Creamos", "Convertimos la dirección en piezas, contenido y materiales listos para el mundo real."],
  ["05", "Evolucionamos contigo", "Leemos la respuesta, ajustamos y hacemos que el sistema madure con el negocio."],
];

export default function Home() {
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "593990601620").replace(/\D/g, "");
  const contactEmail = "aivanstudiosgps@gmail.com";
  const whatsappHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hola AIVAN, vi su web y quiero conversar sobre mi negocio.")}`;
  const emailHref = `mailto:${contactEmail}?subject=${encodeURIComponent("Consulta desde la web de AIVAN STUDIOS")}`;

  return (
    <main id="main-content">
      <HomeMotion />
      <SiteHeader />

      <CinematicHero />

      <section className="human-section" id="aivan">
        <div className="human-panel" data-reveal>
          <div className="human-copy">
            <p className="micro-label">QUÉ ES AIVAN</p>
            <h2>Somos un estudio <span className="liquid-word">creativo</span><br />que transforma negocios.</h2>
            <p>Combinamos estrategia, diseño y producción digital para ayudar a marcas a crecer, conectar y evolucionar en un mundo visual.</p>
            <a className="human-cta" href="#servicios">Conoce cómo trabaja AIVAN <span aria-hidden="true">→</span></a>
            <div className="human-values" aria-label="Pilares de AIVAN">
              <span>ESTRATEGIA</span><i /> <span>CREATIVIDAD</span><i /> <span>PRODUCCIÓN</span><i /> <span>RESULTADOS</span>
            </div>
          </div>
          <AvatarShowcase />
        </div>
        {/* FEATURE ARCHIVE: FinchSignature / PINZÓN / HUEVO / CASCARÓN /
            FINCH EVOLUTION / CRECIMIENTO / ECLOSIÓN. Preserved in
            components/BrandMotion.tsx and app/globals.css.
            To restore: set ENABLE_FINCH_SIGNATURE to true. */}
        {ENABLE_FINCH_SIGNATURE ? <FinchSignature /> : (
          <div className="aivan-insight" data-reveal>
            <div className="aivan-insight-art">
              <AivanOrbitalArtwork />
            </div>
            <div className="aivan-insight-copy">
              <p className="micro-label">DESDE GALÁPAGOS</p>
              <h3>Una mirada que <em>observa,</em><br />adapta y evoluciona.</h3>
              <p>No se trata solo de crear. Se trata de entender el entorno, encontrar nuevas posibilidades y darles una dirección.</p>
              <div className="aivan-insight-pills"><span>01 — OBSERVA</span><span>02 — ADAPTA</span><span>03 — EVOLUCIONA</span></div>
            </div>
          </div>
        )}
      </section>

      <section className="statement" id="enfoque">
        <div className="statement-inner" data-reveal>
          <p className="micro-label">NUESTRA FORMA DE TRABAJAR</p>
          <StatementMaskReveal />
          <div className="statement-copy">
            <p>Una marca puede tener fotos bonitas y seguir sin decir nada. Puede publicar todos los días y seguir sin tener dirección. AIVAN existe para ordenar primero la idea y construir después la ejecución.</p>
            <p>Así branding, marketing y audiovisual dejan de competir entre sí y empiezan a empujar el mismo negocio.</p>
          </div>
        </div>
      </section>

      <PortfolioShowcase />

      <section className="services-section" id="servicios">
        <div className="section-intro" data-reveal>
          <div><p className="micro-label">CÓMO TE PODEMOS AYUDAR</p><h2>Cuatro áreas.<br />Una sola dirección.</h2></div>
          <p>Entramos por el punto que tu negocio necesita hoy y dejamos espacio para que el sistema crezca mañana.</p>
        </div>
        <ServiceExplorer />
      </section>

      <section className="bridge-section">
        <div className="bridge-copy" data-reveal>
          <p className="micro-label">LO IMPORTANTE NO ES EL SERVICIO</p>
          <h2>Es saber <em>cuándo</em> usarlo.</h2>
        </div>
        <BridgeSequence />
      </section>

      <section className="process-section" id="proceso">
        <div className="section-intro" data-reveal>
          <div><p className="micro-label">NUESTRO MÉTODO</p><h2>De la conversación<br />a algo que funciona.</h2></div>
          <div className="process-intro-copy"><p>Un proceso entendible también es parte de una buena experiencia. Sabes qué estamos haciendo, por qué y qué viene después.</p><TypingSignal text="entender → enfocar → construir → activar → evolucionar" /></div>
        </div>
        <div className="process-rail" data-reveal>
          {processSteps.map(([n, title, copy]) => <article key={n}><span className="process-number">{n}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        </div>
      </section>


      <section className="brief-section" id="brief">
        <div className="brief-shell">
          <div className="brief-intro" data-reveal><p className="micro-label">PRIMER CONTACTO</p><h2>Cuéntanos el problema.<br />No hace falta que sepas la solución.</h2><p>Tu brief llega directamente al equipo de AIVAN. No tendrás que copiarlo a WhatsApp ni enviarlo otra vez por correo.</p><div className="brief-note"><span>↳</span><p>Responderlo toma unos minutos y nos permite llegar a la primera conversación con contexto.</p></div></div>
          <BriefForm />
        </div>
      </section>

      <section className="contact-section" id="contacto">
        <div className="contact-shell" data-reveal>
          <div>
            <p className="micro-label">CONTACTO DIRECTO</p>
            <h2>¿Prefieres hablar<br />sin llenar el brief?</h2>
            <p>Escríbenos directamente por WhatsApp o correo. Si ya tienes claro lo que necesitas, este es el camino más rápido.</p>
          </div>
          <div className="contact-links">
            <a href={whatsappHref} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>+593 99 060 1620</strong><b>↗</b></a>
            <a href={emailHref}><span>Correo</span><strong>{contactEmail}</strong><b>↗</b></a>
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-orbit orbit-one" /><div className="closing-orbit orbit-two" />
        <div className="closing-content" data-reveal><p className="micro-label light-label">AIVAN STUDIOS</p><p className="closing-cycle">Para marcas que quieren <FlipFadeWord words={["crecer.", "conectar.", "evolucionar."]} /></p><h2>La siguiente versión<br />de tu marca puede empezar hoy.</h2><div><a href="#brief" className="button button-light">Analizar mi negocio <span>↗</span></a><a href={whatsappHref} target={whatsapp ? "_blank" : undefined} rel={whatsapp ? "noreferrer" : undefined} className="button button-outline">Hablar directamente</a></div></div>
      </section>

      <footer className="site-footer">
        <a href="#inicio" aria-label="Volver al inicio"><Wordmark /></a>
        <p>Creatividad, estrategia y producción desde Galápagos.</p>
        <nav aria-label="Enlaces del pie"><a href="#servicios">Servicios</a><a href="#proceso">Proceso</a><a href="#brief">Brief</a><a href="#contacto">Contacto</a><a href="/privacidad">Privacidad</a></nav>
      </footer>
    </main>
  );
}
