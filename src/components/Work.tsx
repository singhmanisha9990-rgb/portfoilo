import { site } from "../data/site";

export default function Work() {
  return (
    <section className="work" id="work">
      <p className="eyebrow">SELECTED WORK</p>
      <div className="work-list">
        {site.projects.map((project, i) => (
          <a className="work-item" href={project.href} key={project.title}>
            <span className="work-index">{String(i + 1).padStart(2, "0")}</span>
            <span className="work-body">
              <span className="work-title">{project.title}</span>
              <span className="work-note">{project.note}</span>
            </span>
            <span className="work-meta">
              {project.meta}
              <br />
              {project.year}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
