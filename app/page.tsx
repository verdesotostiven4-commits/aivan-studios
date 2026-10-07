import AvatarShowcase from "@/components/AvatarShowcase";
import BriefForm from "@/components/BriefForm";
import HomeMotion from "@/components/HomeMotion";
import SiteHeader from "@/components/SiteHeader";
import ProjectsSection from "@/components/ProjectsSection";
import Wordmark from "@/components/Wordmark";
import { FlipFadeWord, HeroBeams, HeroFlipWord, StatementMaskReveal, TypingSignal } from "@/components/BrandMotion";

const services = [
  { code: "01", id: "brand", name: "AIBRAND", label: "Branding & diseño", copy: "Identidad y sistemas visuales para que una marca se reconozca, se ordene y crezca con coherencia.", items: ["Identidad de marca", "Diseños publicitarios", "Ilustraciones personalizadas", "Afiches técnicos", "Modelado 3D"] },
  { code: "02", id: "mark", name: "AIMARK", label: "Marketing creativo", copy: "Dirección estratégica para que el contenido tenga una razón de existir y una ruta para crecer.", items: ["Estrategia de contenidos", "Gestión de redes sociales", "Diagnóstico de marca", "Asesoría estratégica"] },
  { code: "03", id: "prod", name: "AIPROD", label: "Producción audiovisual", copy: "Fotografía, edición y motion pensados para comunicar valor y convertir ideas en contenido real.", items: ["Estrategia de contenidos", "Fotografía profesional", "Edición audiovisual", "Motion Graphics"] },
  { code: "04", id: "packs", name: "AIPACKS", label: "Paquetes AIVAN", copy: "Acompañamientos que combinan disciplinas cuando tu negocio necesita continuidad y evolución.", items: ["AIPACK Mini", "AIPACK Pro", "AIPACK Ultra"] },
];

const processSteps = [
  ["01", "Conocemos", "Entendemos el negocio, su contexto y el problema antes de hablar de soluciones."],
  ["02", "Analizamos", "Detectamos qué mover primero, qué está frenando la marca y qué todavía no necesita."],
  ["03", "Direccionamos", "Definimos la ruta que alinea estrategia, creatividad y producción."],
  ["04", "Creamos", "Convertimos la dirección en piezas, contenido y materiales listos para el mundo real."],
  ["05", "Evolucionamos contigo", "Leemos la respuesta, ajustamos y hacemos que el sistema madure con el negocio."],
];

function ServiceIcon({ id }: { id: string }) {
  if (id === "brand") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8"/><circle cx="12" cy="12" r="3.25"/></svg>;
  if (id === "mark") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M22 12h-3M12 22v-3M2 12h3"/></svg>;
  if (id === "prod") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="3"/><circle cx="12" cy="12.5" r="3.5"/><path d="M8 6l1.2-2h5.6L16 6"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5L12 3l8 4.5-8 4.5-8-4.5Z"/><path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5"/></svg>;
}

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  return (
    <article id={service.id === "packs" ? "aipacks" : undefined} className={`service-card service-${service.id} service-stagger-${index + 1}`} data-reveal>
      <div className="service-index"><span>{service.code}</span><span>↗</span></div>
      <div className="service-title"><span className="service-symbol"><ServiceIcon id={service.id} /></span><div><p>{service.label}</p><h3>{service.name}</h3></div></div>
      <p className="service-copy">{service.copy}</p>
      <div className="service-list">{service.items.map((item) => <span key={item}>{item}</span>)}</div>
    </article>
  );
}

export default function Home() {
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "593990601620").replace(/\D/g, "");
  const contactEmail = "aivanstudiosgps@gmail.com";
  const whatsappHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hola AIVAN, vi su web y quiero conversar sobre mi negocio.")}`;
  const emailHref = `mailto:${contactEmail}?subject=${encodeURIComponent("Consulta desde la web de AIVAN STUDIOS")}`;

  return (
    <main id="main-content">
      <HomeMotion />
      <SiteHeader />

      <section className="hero" id="inicio">
        <HeroBeams />
        <div className="hero-copy" data-reveal>
          <p className="micro-label">ESTUDIO CREATIVO · GALÁPAGOS</p>
          <h1>
            <span className="hero-line">Tu negocio no necesita un cambio.</span>
            <span className="hero-line hero-evolution-line">Necesita una <HeroFlipWord text="evolución." /></span>
          </h1>
          <p className="hero-lead">Estrategia, creatividad y producción digital trabajando como un solo sistema para que tu marca crezca, conecte y evolucione con intención.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#brief">Quiero que analicen mi negocio <span>↗</span></a>
            <a className="button button-quiet hero-secondary" href={whatsappHref} target={whatsapp ? "_blank" : undefined} rel={whatsapp ? "noreferrer" : undefined}>Hablar con AIVAN</a>
          </div>
          <div className="hero-proof">
            <div><strong>01</strong><span>Entendemos antes de crear</span></div>
            <div><strong>02</strong><span>Diseñamos un sistema</span></div>
            <div><strong>03</strong><span>Producimos con propósito</span></div>
          </div>
        </div>

        <div className="signal-lab" aria-label="Representación del método creativo AIVAN" data-reveal>
          <div className="signal-head"><span>SEÑAL / 001</span><span>SISTEMA CREATIVO</span></div>
          <div className="signal-word">AIVAN</div>
          <div className="signal-grid">
            <article><span className="dot brand-dot" /><small>IDENTIDAD</small><strong>La marca se reconoce.</strong></article>
            <article><span className="dot mark-dot" /><small>DIRECCIÓN</small><strong>La comunicación tiene foco.</strong></article>
            <article><span className="dot prod-dot" /><small>PRODUCCIÓN</small><strong>El contenido demuestra valor.</strong></article>
          </div>
          <div className="signal-line"><span /></div>
          <div className="signal-foot"><span>DESDE GALÁPAGOS</span><span>PARA MARCAS QUE QUIEREN MÁS</span></div>
        </div>
      </section>

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

      <section className="brand-marquee" aria-label="Lenguaje creativo de AIVAN">
        <div className="marquee-track">
          <span>AIBRAND</span><b>✦</b><em>IDENTIDAD</em><b>✦</b><span>AIMARK</span><b>✦</b><em>ESTRATEGIA</em><b>✦</b><span>AIPROD</span><b>✦</b><em>PRODUCCIÓN</em><b>✦</b><span>AIPACKS</span><b>✦</b><em>EVOLUCIÓN</em><b>✦</b>
          <span aria-hidden="true">AIBRAND</span><b aria-hidden="true">✦</b><em aria-hidden="true">IDENTIDAD</em><b aria-hidden="true">✦</b><span aria-hidden="true">AIMARK</span><b aria-hidden="true">✦</b><em aria-hidden="true">ESTRATEGIA</em><b aria-hidden="true">✦</b><span aria-hidden="true">AIPROD</span><b aria-hidden="true">✦</b><em aria-hidden="true">PRODUCCIÓN</em><b aria-hidden="true">✦</b><span aria-hidden="true">AIPACKS</span><b aria-hidden="true">✦</b><em aria-hidden="true">EVOLUCIÓN</em><b aria-hidden="true">✦</b>
        </div>
      </section>

      <section className="services-section" id="servicios">
        <div className="section-intro" data-reveal>
          <div><p className="micro-label">CÓMO TE PODEMOS AYUDAR</p><h2>Cuatro áreas.<br />Una sola dirección.</h2></div>
          <p>Entramos por el punto que tu negocio necesita hoy y dejamos espacio para que el sistema crezca mañana.</p>
        </div>
        <div className="services-grid">{services.map((service, index) => <ServiceCard key={service.name} service={service} index={index} />)}</div>
      </section>

      <section className="bridge-section">
        <div className="bridge-copy" data-reveal>
          <p className="micro-label">LO IMPORTANTE NO ES EL SERVICIO</p>
          <h2>Es saber <em>cuándo</em> usarlo.</h2>
        </div>
        <div className="bridge-visual" data-reveal>
          <div className="bridge-node node-a"><strong>MARCA</strong><small>Se reconoce</small></div><span>→</span><div className="bridge-node node-b"><strong>ESTRATEGIA</strong><small>Encuentra foco</small></div><span>→</span><div className="bridge-node node-c"><strong>CONTENIDO</strong><small>Demuestra valor</small></div><span>→</span><div className="bridge-node node-d"><strong>RESULTADO</strong><small>Hace avanzar</small></div>
        </div>
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

      <ProjectsSection />

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
