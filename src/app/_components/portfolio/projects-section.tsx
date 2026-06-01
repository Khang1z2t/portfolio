"use client";

import { ChevronLeftIcon, ChevronRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { FeaturedProject, LocalizedContent } from "@/data/portfolio";

type ProjectsSectionProps = { current: LocalizedContent };

export function ProjectsSection({ current }: ProjectsSectionProps) {
  const [previewProject, setPreviewProject] = useState<FeaturedProject | null>(
    null,
  );
  const [previewIndex, setPreviewIndex] = useState(0);
  const previewModalRef = useRef<HTMLDivElement | null>(null);
  const previewLastFocusedRef = useRef<HTMLElement | null>(null);

  const previewImages = previewProject
    ? previewProject.previewImages && previewProject.previewImages.length > 0
      ? previewProject.previewImages
      : previewProject.previewImage
        ? [previewProject.previewImage]
        : []
    : [];
  const hasMultiplePreviewImages = previewImages.length > 1;
  const currentPreviewImage =
    previewImages.length > 0
      ? previewImages[Math.min(previewIndex, previewImages.length - 1)]
      : null;

  useEffect(() => {
    if (!previewProject) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const modalNode = previewModalRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const focusable = modalNode
      ? Array.from(modalNode.querySelectorAll<HTMLElement>(focusableSelector))
      : [];
    const firstFocusable = focusable[0] ?? modalNode;
    const lastFocusable = focusable[focusable.length - 1] ?? modalNode;
    firstFocusable?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewProject(null);
        return;
      }
      if (hasMultiplePreviewImages && event.key === "ArrowLeft") {
        setPreviewIndex((prev) =>
          prev === 0 ? previewImages.length - 1 : prev - 1,
        );
        return;
      }
      if (hasMultiplePreviewImages && event.key === "ArrowRight") {
        setPreviewIndex((prev) =>
          prev === previewImages.length - 1 ? 0 : prev + 1,
        );
        return;
      }
      if (event.key !== "Tab" || !modalNode) return;
      if (!firstFocusable || !lastFocusable) return;

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
        return;
      }
      if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previewLastFocusedRef.current?.focus();
    };
  }, [hasMultiplePreviewImages, previewImages.length, previewProject]);

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
                    {project.previewImage ||
                    (project.previewImages &&
                      project.previewImages.length > 0 &&
                      project.visibility !== "confidential") ? (
                      <button
                        className="project-link"
                        onClick={(event) => {
                          previewLastFocusedRef.current = event.currentTarget;
                          setPreviewProject(project);
                          setPreviewIndex(0);
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

      {previewProject && currentPreviewImage ? (
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
            ref={previewModalRef}
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
              {hasMultiplePreviewImages ? (
                <button
                  aria-label="Previous preview image"
                  className="project-preview-nav project-preview-nav-prev"
                  onClick={() => {
                    setPreviewIndex((prev) =>
                      prev === 0 ? previewImages.length - 1 : prev - 1,
                    );
                  }}
                  type="button"
                >
                  <ChevronLeftIcon />
                </button>
              ) : null}

              <Image
                alt={previewProject.previewAlt ?? previewProject.title}
                className="project-preview-image"
                height={720}
                src={currentPreviewImage}
                unoptimized
                width={1200}
              />

              {hasMultiplePreviewImages ? (
                <button
                  aria-label="Next preview image"
                  className="project-preview-nav project-preview-nav-next"
                  onClick={() => {
                    setPreviewIndex((prev) =>
                      prev === previewImages.length - 1 ? 0 : prev + 1,
                    );
                  }}
                  type="button"
                >
                  <ChevronRightIcon />
                </button>
              ) : null}
            </div>

            <div className="project-preview-footer">
              {hasMultiplePreviewImages ? (
                <div className="project-preview-dots" role="tablist" aria-label="Preview images">
                  {previewImages.map((image, index) => (
                    <button
                      aria-label={`Go to image ${index + 1}`}
                      aria-selected={previewIndex === index}
                      className={`project-preview-dot ${previewIndex === index ? "is-active" : ""}`.trim()}
                      key={image}
                      onClick={() => {
                        setPreviewIndex(index);
                      }}
                      role="tab"
                      type="button"
                    />
                  ))}
                </div>
              ) : null}
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
