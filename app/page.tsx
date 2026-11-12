import AvatarShowcase from "@/components/AvatarShowcase";
import AivanOrbitalArtwork from "@/components/AivanOrbitalArtwork";
import BriefForm from "@/components/BriefForm";
import HomeMotion from "@/components/HomeMotion";
import SiteHeader from "@/components/SiteHeader";
import CinematicHero from "@/components/CinematicHero";
import ContactSection from "@/components/ContactSection";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import ServiceExplorer from "@/components/ServiceExplorer";
import AipackPlans from "@/components/AipackPlans";
import BrandAsset from "@/components/BrandAsset";
import FooterVideo from "@/components/FooterVideo";
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
            <h2>No solo creamos.<br /><span className="liquid-word">Damos dirección</span> a tu marca.</h2>
            <p>Somos un estudio creativo y estratégico nacido en Galápagos. Vivimos como emprendedores, profesionales y negocios locales que saben algo más que contenido: una identidad clara y una mejor forma de comunicar el valor de lo que ofrecen.</p>
            <a className="human-cta" href="#servicios">Conoce cómo trabaja AIVAN <span aria-hidden="true">→</span></a>
            <div className="human-values" aria-label="Pilares de AIVAN">
              <span>ESTRATEGIA</span><i /> <span>CREATIVIDAD</span><i /> <span>PRODUCCIÓN</span><i /> <span>RESULTADOS</span>
            </div>
          </div>
          <AvatarShowcase />
        </div>
        <div className="aivan-team-editorial" aria-labelledby="aivan-team-title" data-reveal>
          <div className="aivan-team-heading">
            <p className="micro-label">PERSONAS DETRÁS DE AIVAN</p>
            <h3 id="aivan-team-title">Ideas con personas <em>reales.</em></h3>
            <p>El trabajo empieza por escuchar, observar y crear en equipo. Conoce a quienes forman parte de AIVAN STUDIOS.</p>
          </div>
          <div className="aivan-team-cards">
            <figure className="aivan-team-card">
              <img src="/media/alexander-portrait.webp" alt="Retrato de Alexander Castillo, del equipo AIVAN" loading="lazy" width="950" height="950" />
              <figcaption><span>01 / EQUIPO AIVAN</span><strong>Alexander Castillo</strong></figcaption>
            </figure>
            <figure className="aivan-team-card">
              <img src="/media/andrea-portrait.webp" alt="Retrato de Andrea Segura, del equipo AIVAN" loading="lazy" width="950" height="950" />
              <figcaption><span>02 / EQUIPO AIVAN</span><strong>Andrea Segura</strong></figcaption>
            </figure>
          </div>
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
              <h3>Nuestro origen inspira<br /><em>otra forma de crear.</em></h3>
              <p>Nuestro entorno nos inspira a mirar desde nuevas perspectivas, adaptarnos a la era digital y explorar nuevas formas de comunicar. Una visión que llevamos a cada proyecto.</p>
              <div className="aivan-insight-pills"><span>01 — ENTENDEMOS EL ENTORNO</span><span>02 — ADAPTAMOS TU COMUNICACIÓN</span><span>03 — EVOLUCIONAMOS TU MARCA</span></div>
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

      <section className="services-section" id="servicios">
        <div className="section-intro" data-reveal>
          <div><p className="micro-label">CÓMO TE PODEMOS AYUDAR</p><h2>Tres especialidades.<br />Una sola dirección.</h2></div>
          <p>AIVAN tiene tres áreas creativas y una solución que las integra: AIPACKS. Cada negocio necesita una combinación diferente.</p>
        </div>
        <ServiceExplorer />
        <AipackPlans />
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


      <PortfolioShowcase />

      <ContactSection whatsappHref={whatsappHref} emailHref={emailHref} email={contactEmail} phone="+593 99 060 1620" />

      <section className="closing-section">
        <div className="closing-orbit orbit-one" /><div className="closing-orbit orbit-two" />
        <div className="closing-content" data-reveal><p className="micro-label light-label">AIVAN STUDIOS</p><p className="closing-cycle">Para marcas que quieren <FlipFadeWord words={["crecer.", "conectar.", "evolucionar."]} /></p><h2>La siguiente versión<br />de tu marca puede empezar hoy.</h2><div><a href="#brief" className="button button-light">Analizar mi negocio <span>↗</span></a><a href={whatsappHref} target={whatsapp ? "_blank" : undefined} rel={whatsapp ? "noreferrer" : undefined} className="button button-outline">Hablar directamente</a></div></div>
      </section>

      <FooterVideo />
      <footer className="site-footer aivan-signature-footer">
        <a className="footer-brand-link" href="#inicio" aria-label="AIVAN — Volver al inicio">
          <BrandAsset brand="solo" />
        </a>
        <p>Creatividad, estrategia y producción desde Galápagos.</p>
        <nav aria-label="Enlaces del pie">
          <a href="#servicios">Servicios</a><a href="#proceso">Proceso</a>
          <a href="#contacto">Contacto</a>
          <a href="/privacidad">Privacidad</a><a href="/terminos">Términos</a>
        </nav>
        <div className="footer-signatures" aria-label="Créditos de creación">
          <div className="footer-signature footer-signature--kiubo">
            <span className="footer-signature-caption">Creado por</span>
            <BrandAsset brand="kiubo" />
          </div>
          <span className="footer-signature-divider" aria-hidden="true" />
          <div className="footer-signature footer-signature--stiven">
            <span className="footer-signature-caption">Identidad creativa</span>
            <BrandAsset brand="bystiven" />
            <span className="footer-signature-name">byStiven</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
