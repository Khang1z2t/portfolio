import type { LocalizedContent } from "@/data/portfolio";

type ProjectsSectionProps = { current: LocalizedContent };
export function ProjectsSection({ current }: ProjectsSectionProps) {
  return (
    <section className="content-section js-section" id="work">
      <div className="section-heading">
        <p className="eyebrow js-reveal">{current.labels.selectedWork}</p>
        <h2 className="js-reveal">{current.projectsHeading}</h2>
      </div>
      <div className="project-list">
        {current.featuredProjects.map((project, index) => (
          <article className="project-row js-project-row" key={project.title}>
            <p className="project-index">0{index + 1}</p>
            <div className="project-body">
              <div>
                <h3>{project.title}</h3>
                <p className="project-type project-type-under">
                  {project.type}
                </p>
              </div>
              <div className="project-copy">
                <p className="project-summary">{project.summary}</p>
                <p className="project-impact">{project.impact}</p>
                <div className="project-links">
                  {project.liveUrl ? (
                    <a
                      className="project-link"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {current.labels.viewProject}
                    </a>
                  ) : null}
                  {project.repoUrl ? (
                    <a
                      className="project-link ghost"
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {current.labels.viewRepository}
                    </a>
                  ) : null}
                  {!project.liveUrl &&
                  !project.repoUrl &&
                  project.visibility ? (
                    <span className="project-status-token">
                      {project.visibility === "confidential"
                        ? current.labels.confidentialProject
                        : current.labels.privateProject}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
