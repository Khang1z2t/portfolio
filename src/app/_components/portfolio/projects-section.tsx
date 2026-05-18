"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useEffect, useState } from "react";

import type { FeaturedProject, LocalizedContent } from "@/data/portfolio";

type ProjectsSectionProps = { current: LocalizedContent };

export function ProjectsSection({ current }: ProjectsSectionProps) {
  const [previewProject, setPreviewProject] = useState<FeaturedProject | null>(
    null,
  );

  useEffect(() => {
    if (!previewProject) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewProject(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [previewProject]);

  return (
    <>
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
                  {project.techStack && project.techStack.length > 0 ? (
                    <div className="project-tech-stack">
                      {project.techStack.map((tech) => (
                        <span className="project-tech-tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="project-links">
                    {project.previewImage &&
                    project.visibility !== "confidential" ? (
                      <button
                        className="project-link"
                        onClick={() => {
                          setPreviewProject(project);
                        }}
                        type="button"
                      >
                        {current.labels.viewProject}
                      </button>
                    ) : project.liveUrl ? (
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

      {previewProject?.previewImage ? (
        <div className="project-preview-overlay">
          <button
            aria-label={current.labels.close}
            className="project-preview-backdrop"
            onClick={() => {
              setPreviewProject(null);
            }}
            type="button"
          />
          <div
            aria-label={previewProject.title}
            aria-modal="true"
            className="project-preview-modal"
            role="dialog"
            tabIndex={-1}
          >
            <button
              aria-label={current.labels.close}
              className="project-preview-close"
              onClick={() => {
                setPreviewProject(null);
              }}
              type="button"
            >
              <Cross2Icon />
            </button>

            <div className="project-preview-media-wrap">
              <Image
                alt={previewProject.previewAlt ?? previewProject.title}
                className="project-preview-image"
                height={720}
                src={previewProject.previewImage}
                unoptimized
                width={1200}
              />
            </div>

            <div className="project-preview-footer">
              <div className="project-preview-actions">
                {previewProject.liveUrl ? (
                  <a
                    className="project-link"
                    href={previewProject.liveUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {current.labels.livePreview}
                  </a>
                ) : null}
                {previewProject.repoUrl ? (
                  <a
                    className="project-link ghost"
                    href={previewProject.repoUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {current.labels.viewRepository}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
