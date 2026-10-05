type Project = {
  title: string;
  category: string;
  summary: string;
  image: string;
  href?: string;
};

export const featuredProjects: Project[] = [
  // Cuando AIVAN apruebe trabajos reales, se agregan aquí.
  // La sección permanece completamente oculta mientras no haya proyectos.
];

export default function ProjectsSection() {
  if (!featuredProjects.length) return null;

  return (
    <section className="projects-section" id="proyectos">
      <div className="section-intro" data-reveal>
        <div>
          <p className="micro-label">TRABAJO SELECCIONADO</p>
          <h2>Menos promesas.<br />Más evidencia.</h2>
        </div>
        <p>Una selección breve de proyectos reales donde estrategia, diseño y producción trabajaron en la misma dirección.</p>
      </div>

      <div className="projects-grid">
        {featuredProjects.map((project, index) => (
          <article className="project-card" data-reveal key={project.title}>
            <div className="project-media">
              <img src={project.image} alt="" loading="lazy" decoding="async" />
              <span>0{index + 1}</span>
            </div>
            <div className="project-copy">
              <p>{project.category}</p>
              <h3>{project.title}</h3>
              <span>{project.summary}</span>
              {project.href && <a href={project.href}>Ver proyecto <b>↗</b></a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
