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
  ["01", "Conocemos", "Escuchamos tu historia, conocemos tu negocio y entendemos sus objetivos y desafíos."],
  ["02", "Analizamos", "Evaluamos tu marca, la experiencia de tus clientes y las oportunidades de mejora."],
  ["03", "Direccionamos", "Definimos las prioridades y las soluciones que tu negocio necesita antes de crear."],
  ["04", "Creamos", "Desarrollamos identidad, estrategia y contenido según la dirección establecida."],
  ["05", "Evolucionamos contigo", "Acompañamos la implementación, evaluamos los avances y ajustamos lo necesario."],
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
            <p>Somos un estudio creativo y estratégico nacido en Galápagos. Vimos cómo emprendedores, profesionales y negocios locales necesitaban algo más que contenido: una identidad clara y una mejor forma de comunicar el valor de lo que ofrecen.</p>
            <p className="human-belief">Rechazamos la creación sin un fin claro.</p>
            <a className="human-cta" href="#servicios">Conoce cómo trabaja AIVAN <span aria-hidden="true">→</span></a>
            <div className="human-values" aria-label="Pilares de AIVAN">
              <span>ESTRATEGIA</span><i /> <span>CREATIVIDAD</span><i /> <span>PRODUCCIÓN</span><i /> <span>RESULTADOS</span>
            </div>
          </div>
          <div className="aivan-team-spotlight" aria-label="Equipo de AIVAN STUDIOS">
            <figure className="aivan-team-person">
              <img src="/media/alexander-portrait-selected.png" alt="Alexander Castillo, del equipo AIVAN STUDIOS" width="1122" height="1402" loading="lazy" />
              <figcaption><span>PRODUCCIÓN · CREATIVIDAD</span><strong>Alexander Castillo</strong></figcaption>
            </figure>
            <figure className="aivan-team-person">
              <img src="/media/andrea-portrait-selected.png" alt="Andrea Segura, del equipo AIVAN STUDIOS" width="1122" height="1402" loading="lazy" />
              <figcaption><span>ESTRATEGIA · MARCA</span><strong>Andrea Segura</strong></figcaption>
            </figure>
            <span className="aivan-team-caption">PERSONAS REALES · ESTUDIO CREATIVO EN GALÁPAGOS</span>
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
              <h3>Nuestro origen inspira<br /><em>una forma diferente de crear.</em></h3>
              <p>Nuestro entorno nos inspira a mirar desde nuevas perspectivas, adaptarnos a la era digital y explorar nuevas formas de comunicar. Una visión que llevamos a cada proyecto.</p>
              <div className="aivan-insight-pills"><span>01 — ENTENDEMOS EL ENTORNO</span><span>02 — ADAPTAMOS TU COMUNICACIÓN</span><span>03 — HACEMOS EVOLUCIONAR TU MARCA</span></div>
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
      </section>

      <section className="aivan-packs-section" aria-label="AIPACKS, acompañamiento integral">
        <AipackPlans />
      </section>

      <section className="bridge-section">
        <div className="bridge-copy diagnostic-intro" data-reveal>
          <p className="micro-label">NO SE TRATA DE CONTRATAR MÁS SERVICIOS</p>
          <div className="diagnostic-intro-main">
            <h2>Se trata de saber <em>qué necesita</em> tu negocio.</h2>
            <p className="diagnostic-lead">Cada negocio tiene prioridades diferentes. Por eso, antes de recomendar una solución, analizamos su situación y definimos dónde es necesario actuar.</p>
          </div>
        </div>
        <div className="diagnostic-grid" aria-label="Cuatro puntos de diagnóstico" data-reveal>
          <article><span>01 / IDENTIDAD</span><h3>¿Tu marca se diferencia?</h3></article>
          <article><span>02 / EXPERIENCIA</span><h3>¿Es fácil comprarte?</h3></article>
          <article><span>03 / ESTRATEGIA</span><h3>¿Sabes a quién llegar?</h3></article>
          <article><span>04 / COMUNICACIÓN</span><h3>¿Se entiende tu valor?</h3></article>
        </div>
        <BridgeSequence />
      </section>

      <section className="process-section" id="proceso">
        <div className="section-intro" data-reveal>
          <div><p className="micro-label">NUESTRO MÉTODO</p><h2>De entender tu negocio<br />a crear con propósito.</h2></div>
          <div className="process-intro-copy"><p>Cada proyecto sigue un proceso claro. Conocemos tu negocio, identificamos qué necesita mejorar y desarrollamos soluciones que tienen una razón de ser.</p><TypingSignal text="conocer → analizar → direccionar → crear → evolucionar" /></div>
        </div>
        <div className="process-rail" data-reveal>
          {processSteps.map(([n, title, copy]) => <article key={n}><span className="process-number">{n}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        </div>
        <div className="method-creative-stage" data-reveal>
          <div className="method-creative-copy">
            <p className="micro-label">UN EQUIPO QUE CREA CONTIGO</p>
            <h3>Las ideas toman forma <em>en movimiento.</em></h3>
            <p>La estrategia, el diseño y la producción se conectan en cada proyecto. Explora las ilustraciones interactivas del universo creativo de AIVAN.</p>
            <span>TOCA LA ILUSTRACIÓN PARA DESCUBRIR OTRA ESCENA ↗</span>
          </div>
          <AvatarShowcase />
        </div>
        <div className="method-duality" data-reveal>
          <article className="method-duality-surface">
            <span>LO QUE SE VE</span>
            <h3>No empezamos publicando.</h3>
            <p>Publicar más no significa tener un negocio con dirección clara.</p>
          </article>
          <article className="method-duality-depth">
            <span>LO QUE HAY DETRÁS</span>
            <h3>Empezamos entendiendo.</h3>
            <strong>ESTRATEGIA · CONTEXTO · DIRECCIÓN · PROPÓSITO</strong>
            <p>Antes de crear, identificamos qué mejorar y cómo integrar branding, marketing y producción audiovisual con un objetivo común.</p>
          </article>
        </div>
        <div className="method-takeaways" data-reveal>
          <p>Más publicaciones no corrigen una marca poco clara, una mala experiencia de compra o una oferta que no comunica su valor.</p>
          <p>Por eso, antes de crear, identificamos qué mejorar y cómo integrar branding, marketing y producción audiovisual con un objetivo común.</p>
        </div>
      </section>


      <PortfolioShowcase />

      <ContactSection whatsappHref={whatsappHref} emailHref={emailHref} email={contactEmail} phone="+593 99 060 1620" />

      <section className="closing-section">
        <div className="closing-orbit orbit-one" /><div className="closing-orbit orbit-two" />
        <div className="closing-content" data-reveal><p className="micro-label light-label">AIVAN STUDIOS</p><p className="closing-cycle">Para marcas que quieren <FlipFadeWord words={["crecer.", "conectar.", "evolucionar."]} /></p><h2>La siguiente versión<br />de tu marca puede empezar hoy.</h2><div><a href="#brief" className="button button-light">Analizar mi negocio <span>↗</span></a><a href={whatsappHref} target={whatsapp ? "_blank" : undefined} rel={whatsapp ? "noreferrer" : undefined} className="button button-outline">Hablar directamente</a></div></div>
      </section>

      <FooterVideo />
      <footer className="site-footer aivan-signature-footer aivan-final-footer">
        <p>© {new Date().getFullYear()} AIVAN STUDIOS · Galápagos, Ecuador.</p>
        <nav aria-label="Enlaces del pie">
          <a href="#servicios">Servicios</a><a href="#proceso">Proceso</a>
          <a href="#contacto">Contacto</a><a href="/privacidad">Privacidad</a><a href="/terminos">Términos</a>
        </nav>
        <a className="aivan-footer-top" href="#inicio">Volver arriba ↑</a>
      </footer>
    </main>
  );
}
