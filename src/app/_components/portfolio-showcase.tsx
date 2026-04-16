"use client";

import { useGSAP } from "@gsap/react";
import { ArrowUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { startTransition, useEffect, useRef, useState } from "react";
import {
  type Locale,
  type LocalizedContent,
  sharedSkillItems,
} from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type PortfolioShowcaseProps = {
  content: Record<Locale, LocalizedContent>;
};

const localeOptions: Array<{ label: string; value: Locale }> = [
  { label: "EN", value: "en" },
  { label: "VI", value: "vi" },
];
const localeStorageKey = "portfolio-locale";

export function PortfolioShowcase({ content }: PortfolioShowcaseProps) {
  const root = useRef<HTMLElement | null>(null);
  const [locale, setLocale] = useState<Locale>("en");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const current = content[locale];

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(localeStorageKey);
    if (storedLocale === "en" || storedLocale === "vi") {
      setLocale(storedLocale);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(localeStorageKey, locale);
  }, [locale]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 280);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const heroTimeline = gsap.timeline({
        defaults: {
          duration: 0.9,
          ease: "power3.out",
        },
      });

      heroTimeline
        .from(".js-topbar", {
          y: -24,
          autoAlpha: 0,
        })
        .from(
          ".js-hero-meta",
          {
            y: 28,
            autoAlpha: 0,
            stagger: 0.08,
          },
          "-=0.55",
        )
        .from(
          ".js-hero-word",
          {
            yPercent: 120,
            autoAlpha: 0,
            stagger: 0.045,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".js-hero-panel",
          {
            scale: 0.96,
            y: 36,
            autoAlpha: 0,
            duration: 1,
          },
          "-=0.7",
        )
        .from(
          ".js-capability",
          {
            y: 18,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.6,
          },
          "-=0.4",
        );

      gsap.to(".js-ring-slow", {
        rotation: 360,
        duration: 34,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".js-ring-fast", {
        rotation: -360,
        duration: 22,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".js-hero-panel", {
        yPercent: -10,
        rotateX: 4,
        ease: "none",
        scrollTrigger: {
          trigger: ".js-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".js-section").forEach((section) => {
        gsap.from(section.querySelectorAll(".js-reveal"), {
          y: 44,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        });
      });

      gsap.utils
        .toArray<HTMLElement>(".js-project-row")
        .forEach((row, index) => {
          gsap.from(row, {
            y: 64,
            autoAlpha: 0,
            duration: 0.95,
            ease: "power3.out",
            delay: index * 0.03,
            scrollTrigger: {
              trigger: row,
              start: "top 84%",
            },
          });
        });

      gsap.to(".js-progress-line", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".js-pipeline",
          start: "top 72%",
          end: "bottom 28%",
          scrub: 1,
        },
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        ScrollTrigger.refresh();
        return;
      }

      const words = gsap.utils.toArray<HTMLElement>(".js-rotating-word");
      gsap.set(words, {
        autoAlpha: 0,
        yPercent: 100,
      });

      const wordTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.3,
      });

      words.forEach((word) => {
        wordTimeline
          .to(word, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.55,
            ease: "power3.out",
          })
          .to(
            word,
            {
              autoAlpha: 0,
              yPercent: -100,
              duration: 0.45,
              ease: "power3.in",
            },
            "+=1.05",
          );
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    { dependencies: [locale], revertOnUpdate: true, scope: root },
  );

  return (
    <main className="portfolio-shell" ref={root}>
      <section className="hero-section js-hero" id="home">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <div className="hero-noise" />

        <header className="topbar js-topbar">
          <a className="brand-mark" href="#home">
            {current.brand}
          </a>

          <div className="topbar-actions">
            <nav aria-label="Primary" className="topnav">
              <a href="#work">{current.nav.work}</a>
              <a href="#skills">{current.nav.skills}</a>
              <a href="#pipeline">{current.nav.pipeline}</a>
              <a href="#engineering">{current.nav.engineering}</a>
              <a href="#contact">{current.nav.contact}</a>
            </nav>

            <div className="locale-picker">
              <Select.Root
                value={locale}
                onValueChange={(value) => {
                  startTransition(() => {
                    setLocale(value as Locale);
                  });
                }}
              >
                <Select.Trigger
                  className="locale-trigger"
                  aria-label={current.labels.language}
                >
                  <Select.Value />
                  <Select.Icon className="locale-trigger-icon">
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    className="locale-content"
                    position="popper"
                    sideOffset={10}
                  >
                    <Select.Viewport className="locale-viewport">
                      {localeOptions.map((option) => (
                        <Select.Item
                          className="locale-item"
                          key={option.value}
                          value={option.value}
                        >
                          <Select.ItemText>{option.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow js-hero-meta">{current.hero.eyebrow}</p>

            <div className="hero-heading" key={`${locale}-heading`}>
              {current.hero.headingWords.map((word) => (
                <span className="hero-word-wrap" key={word}>
                  <span className="hero-word js-hero-word">{word}</span>
                </span>
              ))}
            </div>

            <div className="hero-rotating js-hero-meta" aria-hidden="true">
              <span className="hero-rotating-label">
                {current.labels.nowItFeels}
              </span>
              <span
                className="hero-rotating-stage js-word-stage"
                key={`${locale}-words`}
              >
                {current.hero.animatedWords.map((word) => (
                  <span className="rotating-word js-rotating-word" key={word}>
                    {word}
                  </span>
                ))}
              </span>
            </div>

            <p className="hero-summary js-hero-meta">{current.hero.summary}</p>

            <div className="hero-actions js-hero-meta">
              <a className="button-primary" href="#work">
                {current.hero.primaryAction}
              </a>
              <a className="button-secondary" href="#skills">
                {current.hero.secondaryAction}
              </a>
            </div>

            <div className="hero-note js-hero-meta">
              {current.hero.notes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
          </div>

          <div className="hero-panel js-hero-panel">
            <div className="panel-caption">
              <span>{current.panel.captionLeft}</span>
              <span>{current.panel.captionRight}</span>
            </div>

            <div className="panel-orbit">
              <div className="orbit-core" />
              <div className="ring ring-large js-ring-slow" />
              <div className="ring ring-medium js-ring-fast" />
              <div className="ring ring-small js-ring-slow" />
              <div className="scan-line" />
            </div>

            <div className="panel-stack">
              <div className="panel-chip">
                <span>{current.panel.primaryLabel}</span>
                <strong>{current.panel.primaryValue}</strong>
              </div>
              <div className="panel-chip muted">
                <span>{current.panel.secondaryLabel}</span>
                <strong>{current.panel.secondaryValue}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="strip-section">
        {current.capabilities.map((item) => (
          <p className="js-capability" key={item}>
            {item}
          </p>
        ))}
      </section>

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
                    {project.repoUrl ? (
                      <a
                        className="project-link"
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {current.labels.viewRepository}
                      </a>
                    ) : null}
                    {project.liveUrl ? (
                      <a
                        className="project-link ghost"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {current.labels.livePreview}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section js-section" id="skills">
        <div className="section-heading">
          <p className="eyebrow js-reveal">{current.labels.skills}</p>
          <h2 className="js-reveal">{current.skillsHeading}</h2>
        </div>

        <div className="skills-grid">
          {current.skillGroups.map((group, index) => (
            <article className="skill-card js-reveal" key={group.title}>
              <p className="skill-title">{group.title}</p>
              <div className="skill-tags">
                {sharedSkillItems[index]?.map((item) => (
                  <span className="skill-tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section js-section js-pipeline" id="pipeline">
        <div className="section-heading">
          <p className="eyebrow js-reveal">{current.labels.pipeline}</p>
          <h2 className="js-reveal">{current.pipelineHeading}</h2>
          <p className="detail-copy js-reveal">{current.pipelineDescription}</p>
        </div>

        <div className="pipeline">
          <div className="pipeline-line">
            <span className="progress-line js-progress-line" />
          </div>

          <div className="pipeline-grid">
            {current.pipelineSteps.map((step) => (
              <article className="pipeline-card js-reveal" key={step.title}>
                <p className="pipeline-status">{step.status}</p>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section js-section" id="engineering">
        <div className="section-heading">
          <p className="eyebrow js-reveal">{current.labels.engineering}</p>
          <h2 className="js-reveal">{current.engineeringHeading}</h2>
        </div>

        <div className="split-layout">
          <p className="detail-copy js-reveal">
            {current.engineeringDescription}
          </p>

          <div className="upgrade-list">
            {current.engineeringPoints.map((point) => (
              <p className="js-reveal" key={point}>
                {point}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        className="content-section contact-section js-section"
        id="contact"
      >
        <div className="section-heading">
          <p className="eyebrow js-reveal">{current.labels.nextPass}</p>
          <h2 className="js-reveal">{current.contactHeading}</h2>
        </div>

        <div className="contact-panel js-reveal">
          <p>{current.contactDescription}</p>

          <div className="contact-links">
            <a href={`mailto:${current.contactEmail}`}>
              {current.contactEmail}
            </a>
            <a href={`tel:+84${current.contactPhone.replace(/^0/, "")}`}>
              {current.contactPhone}
            </a>
            <a href={current.githubUrl} target="_blank" rel="noreferrer">
              {current.labels.githubProfile}
            </a>
            <a href={current.linkedinUrl} target="_blank" rel="noreferrer">
              {current.labels.connectWithMe}
            </a>
          </div>
        </div>
      </section>

      <button
        aria-label="Scroll to top"
        className={`scroll-top-button ${showScrollTop ? "is-visible" : ""}`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        type="button"
      >
        <ArrowUpIcon />
      </button>
    </main>
  );
}
