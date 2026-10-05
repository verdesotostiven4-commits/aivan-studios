import BriefForm from "@/components/BriefForm";
import HomeMotion from "@/components/HomeMotion";
import SiteHeader from "@/components/SiteHeader";
import ProjectsSection from "@/components/ProjectsSection";
import Wordmark from "@/components/Wordmark";

const services = [
  { code: "01", id: "brand", name: "AIBRAND", label: "Branding & diseño", copy: "Identidad, sistemas visuales y piezas que hacen que una marca deje de parecer improvisada.", items: ["Identidad de marca", "Diseño publicitario", "Ilustración", "Modelado 3D"] },
  { code: "02", id: "mark", name: "AIMARK", label: "Marketing creativo", copy: "Dirección para que el contenido tenga una razón de existir y una ruta para crecer.", items: ["Estrategia de contenidos", "Gestión de redes", "Diagnóstico", "Asesoría"] },
  { code: "03", id: "prod", name: "AIPROD", label: "Producción audiovisual", copy: "Fotografía, video y motion pensados para comunicar valor, no solo para llenar el feed.", items: ["Fotografía", "Edición audiovisual", "Motion graphics", "Producción"] },
  { code: "04", id: "packs", name: "AIPACKS", label: "Acompañamiento integral", copy: "Combinamos disciplinas cuando tu negocio necesita continuidad en lugar de una pieza aislada.", items: ["Mini", "Pro", "Ultra", "Plan a medida"] },
];

const processSteps = [
  ["01", "Entender", "Negocio, contexto y problema antes de hablar de soluciones."],
  ["02", "Enfocar", "Elegimos qué mover primero y qué todavía no necesitas."],
  ["03", "Construir", "Estrategia, diseño y producción bajo una sola dirección."],
  ["04", "Activar", "Lanzamos materiales listos para vivir en el mundo real."],
  ["05", "Evolucionar", "Aprendemos de la respuesta y hacemos que el sistema madure."],
];

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <article className={`service-card service-${service.id}`} data-reveal>
      <div className="service-index"><span>{service.code}</span><span>↗</span></div>
      <div className="service-title"><p>{service.label}</p><h3>{service.name}</h3></div>
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
        <div className="hero-copy" data-reveal>
          <p className="micro-label">ESTUDIO CREATIVO · GALÁPAGOS</p>
          <h1>Tu marca no necesita más ruido.<br /><span>Necesita dirección.</span></h1>
          <p className="hero-lead">Branding, estrategia de marketing y producción audiovisual trabajando como un solo sistema para que tu negocio se vea claro, se entienda rápido y avance con intención.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#brief">Quiero una dirección clara <span>↗</span></a>
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

      <section className="statement" id="enfoque">
        <div className="statement-inner" data-reveal>
          <p className="micro-label">NUESTRA FORMA DE TRABAJAR</p>
          <h2>No empezamos publicando.<br /><span>Empezamos entendiendo.</span></h2>
          <div className="statement-copy">
            <p>Una marca puede tener fotos bonitas y seguir sin decir nada. Puede publicar todos los días y seguir sin tener dirección. AIVAN existe para ordenar primero la idea y construir después la ejecución.</p>
            <p>Así branding, marketing y audiovisual dejan de competir entre sí y empiezan a empujar el mismo negocio.</p>
          </div>
        </div>
      </section>

      <section className="services-section" id="servicios">
        <div className="section-intro" data-reveal>
          <div><p className="micro-label">ECOSISTEMA AIVAN</p><h2>Cuatro áreas.<br />Una sola dirección.</h2></div>
          <p>Entramos por el punto que tu negocio necesita hoy y dejamos espacio para que el sistema crezca mañana.</p>
        </div>
        <div className="services-grid">{services.map((service) => <ServiceCard key={service.name} service={service} />)}</div>
      </section>

      <section className="bridge-section">
        <div className="bridge-copy" data-reveal>
          <p className="micro-label">LO IMPORTANTE NO ES EL SERVICIO</p>
          <h2>Es saber <em>cuándo</em> usarlo.</h2>
        </div>
        <div className="bridge-visual" data-reveal>
          <div className="bridge-node node-a">MARCA</div><span>→</span><div className="bridge-node node-b">ESTRATEGIA</div><span>→</span><div className="bridge-node node-c">CONTENIDO</div><span>→</span><div className="bridge-node node-d">RESULTADO</div>
        </div>
      </section>

      <section className="process-section" id="proceso">
        <div className="section-intro" data-reveal>
          <div><p className="micro-label">PROCESO</p><h2>De la conversación<br />a algo que funciona.</h2></div>
          <p>Un proceso entendible también es parte de una buena experiencia. Sabes qué estamos haciendo, por qué y qué viene después.</p>
        </div>
        <div className="process-rail">
          {processSteps.map(([n, title, copy]) => <article key={n} data-reveal><span className="process-number">{n}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        </div>
      </section>

      <ProjectsSection />

      <section className="human-section">
        <div className="human-panel" data-reveal>
          <div className="human-copy">
            <p className="micro-label">UNA MARCA CON CARA HUMANA</p>
            <h2>El sistema puede ser preciso.<br />La relación no tiene que ser fría.</h2>
            <p>AIVAN se presenta a través de sus propios representantes, conversa con el cliente y explica decisiones sin esconderse detrás de una “agencia” distante.</p>
          </div>
          <div className="human-visual" aria-hidden="true">
            <div className="human-aurora" />
            <span className="human-chip human-chip-strategy">ESTRATEGIA</span>
            <span className="human-chip human-chip-creative">CREATIVIDAD</span>
            <span className="human-chip human-chip-production">PRODUCCIÓN</span>
            <div className="human-people">
              <img
                src="/brand/avatars/axel-emma-duo.webp"
                alt=""
                className="human-duo"
                width={520}
                height={520}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="human-badge">
              <strong>AXEL + EMMA</strong>
              <span>La cara digital de AIVAN</span>
            </div>
          </div>
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
        <div className="closing-content" data-reveal><p className="micro-label light-label">AIVAN STUDIOS</p><h2>La siguiente versión<br />de tu marca puede empezar hoy.</h2><div><a href="#brief" className="button button-light">Analizar mi negocio <span>↗</span></a><a href={whatsappHref} target={whatsapp ? "_blank" : undefined} rel={whatsapp ? "noreferrer" : undefined} className="button button-outline">Hablar directamente</a></div></div>
      </section>

      <footer className="site-footer">
        <a href="#inicio" aria-label="Volver al inicio"><Wordmark /></a>
        <p>Creatividad, estrategia y producción desde Galápagos.</p>
        <nav aria-label="Enlaces del pie"><a href="#servicios">Servicios</a><a href="#proceso">Proceso</a><a href="#brief">Brief</a><a href="#contacto">Contacto</a><a href="/privacidad">Privacidad</a></nav>
      </footer>
    </main>
  );
}
