const plans = [
  {
    code: "01", name: "MINI", eyebrow: "AIPACK MINI", label: "Inicia o renueva tu presencia digital.",
    ideal: "Para emprendimientos que comienzan en redes sociales o necesitan ordenar su imagen y comunicación.",
    includes: ["Estrategia de contenido", "1 reel", "2 diseños publicitarios", "Branding básico predeterminado", "Optimización de perfil", "Asesoría y orientación continua"],
  },
  {
    code: "02", name: "PRO", eyebrow: "AIPACK PRO", label: "Dale estrategia al contenido de tu negocio.",
    ideal: "Para negocios que ya publican, pero necesitan comunicar mejor su valor y generar oportunidades comerciales.",
    includes: ["Estrategia de contenidos", "4 reels", "4 diseños de publicaciones", "Tarjeta digital tipo Link in Bio", "Branding predeterminado", "Optimización de perfil", "Asesoría y orientación continua"],
  },
  {
    code: "03", name: "ULTRA", eyebrow: "AIPACK ULTRA", label: "Contenido y gestión para tu presencia digital.",
    ideal: "Para negocios que buscan una presencia digital establecida, con mejor comunicación comercial y delegar la gestión de sus redes sociales.",
    includes: ["Estrategia básica de contenidos", "4 reels", "4 diseños de publicaciones", "Gestión mensual de redes sociales", "Recopilación y reutilización de clips existentes", "Optimización de perfil", "Asesoría y orientación continua"],
  },
] as const;

export default function AipackPlans() {
  return (
    <div className="aipack-plans" id="aipacks" aria-labelledby="aipack-plans-heading" data-reveal>
      <div className="aipack-plans-intro">
        <div><p className="micro-label">TRES DISCIPLINAS · UN ACOMPAÑAMIENTO</p><h3 id="aipack-plans-heading">AIPACKS<span>.</span></h3></div>
        <p>Integramos branding, marketing creativo y producción audiovisual para mantener tu marca activa, coherente y con dirección.</p>
      </div>
      <div className="aipack-plans-grid">
        {plans.map((plan, index) => (
          <article className={`aipack-plan${index === 1 ? " is-featured" : ""}`} key={plan.name}>
            <div className="aipack-plan-top"><span>{plan.eyebrow}</span><span>MENSUAL</span></div>
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
