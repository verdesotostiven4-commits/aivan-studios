const plans = [
  {
    code: "01", name: "MINI", eyebrow: "AIPACK MINI", label: "Empieza con dirección.",
    ideal: "Para marcas que empiezan o quieren ordenar su imagen y sus redes.",
    includes: ["Estrategia de contenido", "1 reel", "2 diseños publicitarios", "Branding básico predeterminado", "Optimización de perfil", "Asesoría y orientación continua"],
  },
  {
    code: "02", name: "PRO", eyebrow: "AIPACK PRO", label: "Estrategia para crecer.",
    ideal: "Para negocios que ya publican y quieren comunicar mejor su valor.",
    includes: ["Estrategia de contenidos", "4 reels", "4 diseños de publicaciones", "Tarjeta digital tipo Link in Bio", "Branding predeterminado", "Optimización de perfil", "Asesoría y orientación continua"],
  },
  {
    code: "03", name: "ULTRA", eyebrow: "AIPACK ULTRA", label: "Una marca en movimiento.",
    ideal: "Para negocios que quieren delegar la gestión de redes y mantener una presencia constante.",
    includes: ["Estrategia básica de contenidos", "4 reels", "4 diseños de publicaciones", "Gestión mensual de redes sociales", "Recopilación y reutilización de clips existentes", "Optimización de perfil", "Asesoría y orientación continua"],
  },
] as const;

export default function AipackPlans() {
  return (
    <div className="aipack-plans" id="aipacks" aria-labelledby="aipack-plans-heading" data-reveal>
      <div className="aipack-plans-intro">
        <div className="aipack-intro-brand"><p className="aipack-brand-word" aria-hidden="true">AIPACKS<span>.</span></p><h3 id="aipack-plans-heading">Las tres especialidades.<br /><span>En un solo acompañamiento.</span></h3></div>
        <p>Integramos branding, marketing creativo y producción audiovisual en paquetes de acompañamiento que mantienen tu marca activa, coherente y con dirección.</p>
      </div>
      <div className="aipack-plans-grid">
        {plans.map((plan) => (
          <article className={`aipack-plan aipack-plan--${plan.name.toLowerCase()}${plan.name === "ULTRA" ? " is-featured" : ""}`} key={plan.name}>
            <div className="aipack-plan-top"><span>{plan.eyebrow}</span><span>{plan.name === "MINI" ? "14 DÍAS" : "MENSUAL"}</span></div>
            {plan.name === "ULTRA" && <p className="aipack-plan-difference"><span aria-hidden="true">✦</span> LA OPCIÓN MÁS COMPLETA · Gestión mensual de redes</p>}
            <div><h4>{plan.label}</h4><p>{plan.ideal}</p></div>
            <div className="aipack-plan-includes"><span>¿QUÉ INCLUYE?</span><ul>{plan.includes.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <a className="aipack-plan-cta" href="#brief">Consultar {plan.name} <span aria-hidden="true">↗</span></a>
          </article>
        ))}
      </div>
      <p className="aipack-plans-note">El alcance final, calendario y presupuesto se confirman en la conversación inicial según las necesidades de cada proyecto.</p>
    </div>
  );
}
