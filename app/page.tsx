import BriefForm from "@/components/BriefForm";
import HomeMotion from "@/components/HomeMotion";
import SiteHeader from "@/components/SiteHeader";
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
    <main>
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
          <div className="signal-head"><span>SEÑAL / 001</span><span>EN CONSTRUCCIÓN</span></div>
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
            <img
              src="data:image/webp;base64,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[... ELLIPSIZATION ...]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"
              alt=""
              className="human-avatar"
              width={600}
              height={740}
              loading="lazy"
            />
            <div className="human-badge">
              <strong>AXEL + EMMA</strong>
              <span>La cara digital de AIVAN</span>
            </div>
          </div>
        </div>
      </section>

      <section className="brief-section" id="brief">
        <div className="brief-shell">
          <div className="brief-intro" data-reveal><p className="micro-label">PRIMER CONTACTO</p><h2>Cuéntanos el problema.<br />No hace falta que sepas la solución.</h2><p>El brief llega directamente al panel interno de AIVAN. No tendrás que copiarlo a WhatsApp ni enviarlo otra vez por correo.</p><div className="brief-note"><span>↳</span><p>Responderlo toma unos minutos y nos permite llegar a la primera conversación con contexto.</p></div></div>
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
        <Wordmark />
        <p>Creatividad, estrategia y producción desde Galápagos.</p>
        <nav><a href="#servicios">Servicios</a><a href="#proceso">Proceso</a><a href="#brief">Brief</a><a href="#contacto">Contacto</a><a href="/panel">Panel</a></nav>
      </footer>
    </main>
  );
}
